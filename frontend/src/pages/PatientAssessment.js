// // import React from "react";
// // import { useParams,useNavigate } from "react-router-dom";

// // // Import the two assessment components
// // import NursingInitialAssessment from "./assessments/NursingInitialAssessment";
// // import ERPhysicianAssessment from "./assessments/ERPhysicianAssessment";

// // const PatientAssessment = () => {
// //   // Get the dynamic patient_id from the URL
// //   const { patient_id } = useParams();
// //   const navigate = useNavigate();

// //   const handleClick = () => navigate('/discharge-summary');


// //   return (
// //     <div style={{ padding: "20px" }}>
// //         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //             <h1>Patient Assessment for {patient_id}</h1>
// //             <div style={{ display: "flex", gap: "10px" }}>
// //                 <button style={{ width:"80px" }} onClick={handleClick}>
// //                     Discharge Summary
// //                 </button>
// //                 <button style={{ width:"80px" }}>
// //                     Case Summary
// //                 </button>
// //                 <button style={{ width:"80px" }}>
// //                     Clinical Errors
// //                 </button>
// //             </div>
// //         </div>
        
        
// //         {/* Render the Nursing Initial Assessment component */}
// //         <div style={{ marginBottom: "20px" }}>
// //             <NursingInitialAssessment patientId={patient_id} />
// //         </div>
        
// //         {/* Render the ER Physician Assessment component */}
// //         <div>
// //             <ERPhysicianAssessment patientId={patient_id} />
// //         </div>
// //     </div>
// //   );
// // };

// // export default PatientAssessment;
























// // PatientAssessment.jsx
// import React, { useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import NursingInitialAssessment from "./assessments/NursingInitialAssessment";
// import ERPhysicianAssessment from "./assessments/ERPhysicianAssessment";

// const PatientAssessment = () => {
//   const { patient_id } = useParams();
//   const navigate = useNavigate();

//   // Create refs for the child components
//   const nursingRef = useRef();
//   const erPhysicianRef = useRef();

//   const handleDischargeClick = async () => {
//     // Get form data from both assessment components
//     const nursingData = nursingRef.current?.getFormData();
//     const erData = erPhysicianRef.current?.getFormData();

//     // Combine into a single payload, including patient id and timestamp
//     const payload = {
//       patientId: patient_id,
//       nursingInitialAssessment: nursingData,
//       erPhysicianAssessment: erData,
//       submittedAt: new Date().toISOString(),
//     };

//     console.log("Payload to send:", payload);

//     // try {
//     //   const response = await fetch('/api/discharge-summary', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(payload)
//     //   });

//     //   if (!response.ok) {
//     //     throw new Error('Failed to submit discharge summary');
//     //   }

//     //   console.log('Discharge summary submitted successfully');
//     //   navigate('/success'); // Adjust navigation as needed
//     // } catch (error) {
//     //   console.error('Error submitting discharge summary:', error);
//     // }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h1>Patient Assessment for {patient_id}</h1>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <button style={{ width:"80px" }} onClick={handleDischargeClick}>
//             Discharge Summary
//           </button>
//           <button style={{ width:"80px" }}>
//             Case Summary
//           </button>
//           <button style={{ width:"80px" }}>
//             Clinical Errors
//           </button>
//         </div>
//       </div>
      
//       {/* Render the Nursing Initial Assessment component with ref */}
//       <div style={{ marginBottom: "20px" }}>
//         <NursingInitialAssessment ref={nursingRef} patientId={patient_id} />
//       </div>
      
//       {/* Render the ER Physician Assessment component with ref */}
//       <div>
//         <ERPhysicianAssessment ref={erPhysicianRef} patientId={patient_id} />
//       </div>
//     </div>
//   );
// };

// export default PatientAssessment;





















// PatientAssessment.jsx
import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NursingInitialAssessment from "./assessments/NursingInitialAssessment";
import ERPhysicianAssessment from "./assessments/ERPhysicianAssessment";

const PatientAssessment = () => {
  const { patient_id } = useParams();
  const navigate = useNavigate();

  // Create refs for the child components
  const nursingRef = useRef();
  const erPhysicianRef = useRef();

  const handleDischargeClick = async () => {
    // Get form data from both assessment components
    const nursingData = nursingRef.current?.getFormData();
    const erData = erPhysicianRef.current?.getFormData();

    // Combine into a single payload, including patient id and a timestamp
    const payload = {
      patientId: patient_id,
      nursingInitialAssessment: nursingData,
      erPhysicianAssessment: erData,
      submittedAt: new Date().toISOString(),
    };

    console.log("Payload to send:", payload);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/generate_reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }).then(response => response.json())
      .then(data => console.log("res_data: ",data))
      .catch(error => console.error(error));

    //   if (!response.ok) {
    //     throw new Error('Failed to submit discharge summary');
    //   }
    //   const response_data = response.json();
    //   console.log("response_data:",response_data);
      console.log('Discharge summary submitted successfully');
    //   navigate('/success'); // Adjust navigation as needed
    navigate('/discharge-summary', { state: data });

    } catch (error) {
      console.error('Error submitting discharge summary:', error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Patient Assessment for {patient_id}</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ width:"80px" }} onClick={handleDischargeClick}>
            Discharge Summary
          </button>
          <button style={{ width:"80px" }}>
            Case Summary
          </button>
          <button style={{ width:"80px" }}>
            Clinical Errors
          </button>
        </div>
      </div>
      
      {/* Render the Nursing Initial Assessment component with ref */}
      <div style={{ marginBottom: "20px" }}>
        <NursingInitialAssessment ref={nursingRef} patientId={patient_id} />
      </div>
      
      {/* Render the ER Physician Assessment component with ref */}
      <div>
        <ERPhysicianAssessment ref={erPhysicianRef} patientId={patient_id} />
      </div>
    </div>
  );
};

export default PatientAssessment;


