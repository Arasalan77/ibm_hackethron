// import React from 'react';
// import '../css/DischargeSummary.css';

// const DischargeSummary = ( {summary} ) => {

//   console.log("summary", summary);
//   // console.log("summary..summary.title", summary.summary.title);
//   console.log("summary.patientInfo", summary.patientInfo);

//   // Destructure the summary object with default values to avoid errors if a property is missing
//   const {
//     title = "Discharge Summary",
//     patientInfo = {},
//     admissionDetails = {},
//     clinicalInfo = {},
//     provisionalDiagnosis = "",
//     investigations = [],
//     hospitalCourse = "",
//     medications = [],
//     dischargeInstructions = [],
//     dischargeCondition = "",
//     dischargingPhysician = "",
//   } = summary;

//   return (
//     <div className="discharge-summary-card">
//       <header className="summary-header">
//         <h1>{title}</h1>
//         <div className="patient-info">
//           {Object.entries(patientInfo).map(([key, value]) => (
//             <div key={key}><strong>{key}:</strong> {value}</div>
//           ))}
//         </div>
//       </header>

//       <section className="admission-details">
//         {Object.entries(admissionDetails).map(([key, value]) => (
//           <div key={key}><strong>{key}:</strong> {value}</div>
//         ))}
//       </section>

//       <hr />

//       <section className="clinical-info">
//         {clinicalInfo.presentingComplaints && (
//           <>
//             <h2>Presenting Complaints</h2>
//             <p>{clinicalInfo.presentingComplaints}</p>
//           </>
//         )}
//         {clinicalInfo.historyOfPresentIllness && (
//           <>
//             <h2>History of Present Illness</h2>
//             <p>{clinicalInfo.historyOfPresentIllness}</p>
//           </>
//         )}
//         {clinicalInfo.pastMedicalHistory && (
//           <>
//             <h2>Past Medical History</h2>
//             <p>{clinicalInfo.pastMedicalHistory}</p>
//           </>
//         )}
//         {clinicalInfo.familyHistory && (
//           <>
//             <h2>Family History</h2>
//             <p>{clinicalInfo.familyHistory}</p>
//           </>
//         )}
//         {clinicalInfo.personalHistory && (
//           <>
//             <h2>Personal History</h2>
//             <p>{clinicalInfo.personalHistory}</p>
//           </>
//         )}
//       </section>

//       <hr />

//       <section className="physical-exam">
//         {clinicalInfo.physicalExamination && clinicalInfo.physicalExamination.length > 0 && (
//           <>
//             <h2>Physical Examination on Admission</h2>
//             <ul>
//               {clinicalInfo.physicalExamination.map((item, index) => (
//                 <li key={index}>
//                   <strong>{item.category}:</strong> {item.details}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </section>

//       <hr />

//       <section className="diagnosis-investigations">
//         {provisionalDiagnosis && (
//           <>
//             <h2>Provisional Diagnosis</h2>
//             <p>{provisionalDiagnosis}</p>
//           </>
//         )}
//         {investigations && investigations.length > 0 && (
//           <>
//             <h2>Investigations</h2>
//             <ul>
//               {investigations.map((investigation, index) => (
//                 <li key={index}>
//                   <strong>{investigation.type}:</strong> {investigation.result}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//       </section>

//       <hr />

//       <section className="hospital-course">
//         {hospitalCourse && (
//           <>
//             <h2>Hospital Course</h2>
//             <p>{hospitalCourse}</p>
//           </>
//         )}
//       </section>

//       <hr />

//       <section className="medications-instructions">
//         {medications && medications.length > 0 && (
//           <>
//             <h2>Medications on Discharge</h2>
//             <ul>
//               {medications.map((med, index) => (
//                 <li key={index}>
//                   <strong>{med.name}:</strong> {med.dosage}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )}
//         {dischargeInstructions && dischargeInstructions.length > 0 && (
//           <>
//             <h2>Discharge Instructions</h2>
//             <ul>
//               {dischargeInstructions.map((instruction, index) => (
//                 <li key={index}>{instruction}</li>
//               ))}
//             </ul>
//           </>
//         )}
//       </section>

//       <footer className="summary-footer">
//         {dischargeCondition && (
//           <div><strong>Discharged Condition:</strong> {dischargeCondition}</div>
//         )}
//         {dischargingPhysician && (
//           <div><strong>Discharging Physician:</strong> {dischargingPhysician}</div>
//         )}
//       </footer>
//     </div>
//   );
// };

// export default DischargeSummary;

























// DischargeSummary.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../css/DischargeSummary.css'; // optional: include any custom styling

const DischargeSummary = ({data}) => {
  // const { state } = useLocation(); // Retrieve state passed via navigate()

  console.log("data", data);
  const state = data;

  // Destructure markdown content from state (assuming the API returns markdown strings)
  const { discharge_summary, clinical_errors, case_summary } = state || {};

  return (
    <div className="discharge-summary-container">
      <h1>Discharge Summary</h1>
      {state ? (
        <div>
          <section className="report-section">
            <h2>Discharge Summary Report</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {discharge_summary}
            </ReactMarkdown>
          </section>
          <section className="report-section">
            <h2>Clinical Errors Report</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {clinical_errors}
            </ReactMarkdown>
          </section>
          <section className="report-section">
            <h2>Case Summary</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {case_summary}
            </ReactMarkdown>
          </section>
        </div>
      ) : (
        <p>No report data available.</p>
      )}
    </div>
  );
};

export default DischargeSummary;

