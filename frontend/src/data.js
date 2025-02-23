export const patientData = [
  {
    name: "Mr. VASANTHA VENKAT",
    age: 58,
    ward: "Deluxe Bed",
    patientID: "nXP-IP250112",
    path: "/patients/nXP-IP250112",
  },
  {
    name: "Mr. Eedipi Suraiiahgoud",
    age: 64,
    ward: "Suite Bed",
    patientID: "nXP-IP250114",
    path: "/patients/nXP-IP250114",
  },
  {
    name: "Mr. Manneru Larence",
    age: 35,
    ward: "Suite Room",
    patientID: "nXP-IP250115",
    path: "/patients/nXP-IP250115",
  },
  {
    name: "Mr. Teegala Mallesh Goud",
    age: 49,
    ward: "Surgical",
    patientID: "nXP-IP250116",
    path: "/patients/nXP-IP250116",
  },
  {
    name: "Mr. Palaguri Raju",
    age: 42,
    ward: "Medical",
    patientID: "nXP-IP250117",
    path: "/patients/nXP-IP250117",
  },
  {
    name: "Dr. SHAIK ASIF HUSSAIN",
    age: 27,
    ward: "D & E",
    patientID: "nXP-IP250118",
    path: "/patients/nXP-IP250118",
  },
];




export const dischargeSummaryData = {
    "title": "Discharge Summary",
    "patientInfo": {
      "Patient Name": "John",
      "UHID": "PT0002296",
      "IPD No.": "PTIP2500979",
      "Gender": "Male",
      "Age": "40"
    },
    "admissionDetails": {
      "Date of Admission": "18/12/2000",
      "Date of Discharge": "20/12/2000"
    },
    "clinicalInfo": {
      "presentingComplaints": "Bleeding per rectum and pain for one month. Painful defecation and constipation.",
      "historyOfPresentIllness": "A 40-year-old male presented to the emergency room with a one-month history of bleeding per rectum, pain, painful defecation, and constipation.",
      "pastMedicalHistory": "No known comorbidities, past surgical history, or significant medical history. No relevant social history.",
      "familyHistory": "No significant family history of diabetes, hypertension, heart disease, stroke, cancers, tuberculosis, asthma, or other hereditary diseases.",
      "personalHistory": "Married, normal appetite, usually regular bowels and normal micturition. No known allergies. Denies alcohol, tobacco, drug, betel nut, gutkha, or betel leaf use.",
      "physicalExamination": [
        { "category": "General", "details": "Weight: 64 kg, Temperature: 96.5°F, Pulse: 125 bpm, Respirations: 21/min, Blood pressure (left arm): 110/90 mmHg, SpO2: 97% on room air. No icterus, clubbing, edema, pallor, cyanosis, lymphadenopathy, malnutrition, or dehydration." },
        { "category": "Cardiovascular", "details": "No thrills or murmurs. Heart sounds normal." },
        { "category": "Respiratory", "details": "No dyspnea or wheezing. Trachea midline. Breath sounds vesicular. No adventitious sounds." },
        { "category": "Abdomen", "details": "Soft, non-tender. No palpable masses, hernias, or free fluid. Bowel sounds present. Liver and spleen not palpable." },
        { "category": "Neurological", "details": "Conscious and alert. Speech normal. No meningeal signs." }
      ]
    },
    "provisionalDiagnosis": "Grade III-IV Hemorrhoids.",
    "investigations": [
      { "type": "Surgical Profile", "result": "Normal (details not provided)" },
      { "type": "2D Echocardiogram", "result": "Normal. No regional wall motion abnormality. Good biventricular function. Normal valves and chambers. No pericardial effusion, clot, or vegetation." }
    ],
    "hospitalCourse": "The patient was admitted and prepared for surgery. He underwent laser hemorrhoidoplasty under general anesthesia on 19/12/2024. Post-operatively, the patient was transferred to the ICU and then back to the general ward. He experienced mild post-operative pain, managed with analgesics. The anal pack was removed on the evening of surgery. A Foley catheter was placed post-operatively and removed on 20/12/2000. The patient tolerated a liquid diet and progressed to a high-fiber diet. Vitals remained stable throughout the hospital stay. He had a normal bowel movement on 20/12/2000.",
    "medications": [
      { "name": "Ofloxacin-TZ", "dosage": "One tablet twice daily" },
      { "name": "Metronidazole", "dosage": "400mg three times daily" },
      { "name": "Cremaffin Plus", "dosage": "20ml at bedtime" },
      { "name": "LOX 2% ointment", "dosage": "Apply to affected area" },
      { "name": "Pantoprazole", "dosage": "40mg once daily" },
      { "name": "Hifenac-P", "dosage": "One tablet twice daily" }
    ],
    "dischargeInstructions": [
      "High-fiber diet.",
      "Sitz bath with Betadine solution 2-3 times a day for 15-20 minutes.",
      "Follow-up appointment in one week."
    ],
    "dischargeCondition": "Stable.",
    "dischargingPhysician": "Dr. Adam (General Surgeon)"
  }



export const clinicalErrorData = [
  {
    "pageNumber": 1,
    "changes": [
      {
        "field": "fatherHusbandName",
        "oldValue": "Slo Ramos",
        "newValue": "S/o Randy",
        "rationale": "Standard medical abbreviation for 'son of'"
      },
    ]
  },
  {
    "pageNumber": 2,
    "changes": [
      {
        "field": "medicalEquipment[2].equipment",
        "oldValue": "Alpha Bed",
        "newValue": "Air Bed",
        "rationale": "Common pressure-relief medical device"
      }
    ]
  }
]

  

