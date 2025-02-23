import os
import json
import logging
import base64
from pdf2image import convert_from_path
from tenacity import retry, stop_after_attempt, wait_fixed, retry_if_exception_type
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_ibm import WatsonxLLM  # IBM Watsonx LLM
from ibm_watson_machine_learning.metanames import GenTextParamsMetaNames as GenParams

# Additional imports (if needed)
from langchain_community.vectorstores import Chroma
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.prompts import PromptTemplate
from langchain.tools import tool
from langchain.tools.render import render_text_description_and_args
from langchain.agents.output_parsers import JSONAgentOutputParser
from langchain.agents.format_scratchpad import format_log_to_str
from langchain.agents import AgentExecutor
from langchain.memory import ConversationBufferMemory
from langchain_core.runnables import RunnablePassthrough

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)

# Retrieve credentials and prompt templates from environment
API_KEY = os.getenv("API_KEY")
IBM_URL = os.getenv("IBM_URL")
IBM_APIKEY = os.getenv("IBM_APIKEY")
IBM_PROJECT_ID = os.getenv("IBM_PROJECT_ID")

EXTRACT_TEXT_PROMPT_TEMPLATE = os.getenv("EXTRACT_TEXT_PROMPT_TEMPLATE")
DISCHARGE_SUMMARY_PROMPT_TEMPLATE = os.getenv("DISCHARGE_SUMMARY_PROMPT_TEMPLATE")
CLINICAL_ERRORS_PROMPT_TEMPLATE = os.getenv("CLINICAL_ERRORS_PROMPT_TEMPLATE")
CASE_SUMMARY_PROMPT_TEMPLATE = os.getenv("CASE_SUMMARY_PROMPT_TEMPLATE") or (
    "Generate a comprehensive case summary based on the following data: {data}"
)

# Initialize the extraction LLM using ChatGoogleGenerativeAI
extract_llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash", api_key=API_KEY)

# Initialize IBM Watsonx LLM for report generation using credentials from .env
ibm_llm = WatsonxLLM(
    model_id="ibm/granite-3-8b-instruct",
    url=IBM_URL,
    apikey=IBM_APIKEY,
    project_id=IBM_PROJECT_ID,
    params={
        GenParams.DECODING_METHOD: "greedy",
        GenParams.TEMPERATURE: 1,
        GenParams.MIN_NEW_TOKENS: 5,
        GenParams.MAX_NEW_TOKENS: 8192,
        GenParams.STOP_SEQUENCES: ["Human:", "Observation"],
    },
)

# -------------------- Helper Functions --------------------
def create_output_folders(base_output, pdf_name):
    """Create structured folders for processing output."""
    output_path = os.path.join(base_output, pdf_name)
    folders = ["images", "text_json", "discharge_summary", "clinical_errors", "case_summary"]
    for folder in folders:
        os.makedirs(os.path.join(output_path, folder), exist_ok=True)
    return output_path

def image_to_data_url(image_path):
    """Convert image to base64 data URL."""
    with open(image_path, "rb") as img_file:
        base64_str = base64.b64encode(img_file.read()).decode("utf-8")
    return f"data:image/png;base64,{base64_str}"

def safe_json_parse(content):
    """Safely parse JSON from LLM response."""
    try:
        return json.loads(content)
    except json.JSONDecodeError:
        logging.error("Failed to parse JSON response.")
        return {}

@retry(stop=stop_after_attempt(3), wait=wait_fixed(30), retry=retry_if_exception_type(Exception))
def extract_text_from_image(image_path, page_number):
    """Extracts structured JSON from an image using LLM."""
    prompt_text = EXTRACT_TEXT_PROMPT_TEMPLATE.format(page_number=page_number)
    image_data_url = image_to_data_url(image_path)
    message = HumanMessage(
        content=[
            {"type": "text", "text": prompt_text},
            {"type": "image_url", "image_url": image_data_url},
        ]
    )
    response = extract_llm.invoke([message])
    # Clean up any markdown/code formatting
    response_text = response.content.strip("```json").strip("```").strip()
    return safe_json_parse(response_text)

@retry(stop=stop_after_attempt(3), wait=wait_fixed(30), retry=retry_if_exception_type(Exception))
def generate_report(llm, prompt_template, data):
    """Generate structured reports using an LLM."""
    prompt = prompt_template.format(data=json.dumps(data, indent=2))
    message = HumanMessage(content=[{"type": "text", "text": prompt}])
    response = llm.invoke([message])
    # IBM WatsonxLLM may return a plain string instead of an object with a .content attribute.
    if hasattr(response, "content"):
        return response.content
    else:
        return response

def save_report(content, output_path, folder, filename):
    """Save report content to a file."""
    folder_path = os.path.join(output_path, folder)
    os.makedirs(folder_path, exist_ok=True)
    file_path = os.path.join(folder_path, filename)
    with open(file_path, "w") as f:
        f.write(content)

def pdf_to_images(pdf_path, output_folder):
    """Convert PDF to images and save them."""
    images = convert_from_path(pdf_path)
    image_paths = []
    for i, image in enumerate(images):
        image_path = os.path.join(output_folder, f"page_{i+1}.png")
        image.save(image_path, "PNG")
        image_paths.append(image_path)
    return image_paths

def process_pdf(pdf_path, output_folder):
    """
    Main function to process the PDF:
    - If the text JSON already exists, load it.
    - Otherwise, convert PDF to images, extract text from each page, and save the JSON.
    Then, generate reports using the IBM Watsonx model.
    """
    pdf_name = os.path.splitext(os.path.basename(pdf_path))[0]
    output_path = create_output_folders(output_folder, pdf_name)
    text_json_path = os.path.join(output_path, "text_json", f"{pdf_name}_text.json")
    
    # Check if extraction was already done
    if os.path.exists(text_json_path):
        logging.info("Text JSON already exists. Loading existing data...")
        with open(text_json_path, "r") as f:
            all_pages = json.load(f)
    else:
        logging.info("Extracting text from PDF images...")
        # Convert PDF to images
        image_paths = pdf_to_images(pdf_path, os.path.join(output_path, "images"))
        all_pages = {}
        # Extract text from each page
        for idx, image_path in enumerate(image_paths, start=1):
            page_extraction = extract_text_from_image(image_path, idx)
            all_pages[f"page_{idx}"] = {"pageNumber": idx, "data": page_extraction}
        # Save extracted text JSON
        with open(text_json_path, "w") as f:
            json.dump(all_pages, f, indent=2)
    
    # Generate reports using the IBM Watsonx LLM
    discharge_summary = generate_report(ibm_llm, DISCHARGE_SUMMARY_PROMPT_TEMPLATE, all_pages)
    clinical_errors = generate_report(ibm_llm, CLINICAL_ERRORS_PROMPT_TEMPLATE, all_pages)
    case_summary = generate_report(ibm_llm, CASE_SUMMARY_PROMPT_TEMPLATE, all_pages)
    
    # Save outputs
    save_report(discharge_summary, output_path, "discharge_summary", "summary.txt")
    save_report(clinical_errors, output_path, "clinical_errors", "errors.json")
    save_report(case_summary, output_path, "case_summary", "summary.txt")
    
    return output_path

if __name__ == "__main__":
    # Use a hardcoded PDF path or prompt the user
    pdf_path = "/home/wellness/Arasalan 2024-11-30/codes/discharge_summaries/google_flash_image_summary/nXP-IP2500700.pdf"
    output_folder = "output"  # Change this if needed
    
    if os.path.exists(pdf_path):
        process_pdf(pdf_path, output_folder)
        print("PDF processed successfully! Check the output folder.")
    else:
        logging.error(f"The file '{pdf_path}' does not exist.")
