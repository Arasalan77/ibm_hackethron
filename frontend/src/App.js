import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddPatient from './pages/AddPatient';
import PatientList from './pages/PatientList';
import BedMaster from './pages/BedMaster';
import WardMaster from './pages/WardMaster';
import DoctorMaster from './pages/DoctorMaster';
import ERPhysicianAssessment from './pages/assessments/ERPhysicianAssessment';
import InpatientAssessment from './pages/assessments/InpatientAssessment';
import NursingInitialAssessment from './pages/assessments/NursingInitialAssessment';
import CaseSheetTemplates from './pages/CaseSheetTemplates';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import PatientAssessment from "./pages/PatientAssessment";
import DischargeSummary from './pages/DischargeSummary';
import CaseSummary from './pages/ClinicalError';
import { dischargeSummaryData } from './data';
import { clinicalErrorData } from './data';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});


const exampleResponse = {
  discharge_summary: `
# Discharge Summary Report

## Patient Information
- **Name:** Jane Smith
- **Age:** 52
- **Patient ID:** 987654

## Diagnosis
- Hypertension
- Type 2 Diabetes

## Treatment Plan
1. Administer Lisinopril 10mg daily.
2. Monitor blood pressure and blood sugar levels.
3. Schedule a follow-up in 2 weeks.

---

*Patient is responding well to the treatment plan.*
`,
  clinical_errors: `
# Clinical Errors Report

## Observations
- Incorrect medication dosage noted on 2025-02-15.
- Missed lab follow-up for cholesterol on 2025-02-16.

## Recommendations
- Double-check medication dosages.
- Ensure timely scheduling of lab tests.
`,
  case_summary: `
# Case Summary

## Overview
The patient presented with elevated blood pressure and abnormal blood sugar levels. A comprehensive treatment plan was implemented that includes medication management and lifestyle modifications.

## Outcome
Patient's condition is stable; however, further testing is recommended to rule out potential complications.
`
};



function App() {

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // try{
      const install_prompt_handler = (e) => {
          console.log("beforeinstallprompt in handler");
          e.preventDefault();
          setDeferredPrompt(e);
          setShowModal(true); // Show modal when install prompt is available
      };
      console.log("before adding event listener for beforeinstallprompt");
     
      // window.addEventListener("beforeinstallprompt", install_prompt_handler);
      window.addEventListener("beforeinstallprompt", function(e){
        console.log("beforeinstallprompt in handler");
        e.preventDefault();
        setDeferredPrompt(e);
        setShowModal(true); // Show modal when install prompt is available
      });

    //  }catch(error){
    //     console.log("error in adding event listener for beforeinstallprompt", error);
    //  }

      return () => window.removeEventListener("beforeinstallprompt", install_prompt_handler);
  }, []);

  const handleInstallClick = () => {
      if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === "accepted") {
                  console.log("User accepted the install prompt");
              } else {
                  console.log("User dismissed the install prompt");
              }
              setDeferredPrompt(null);
              setShowModal(false); // Hide modal after action
          });
      }
  };

  return (
    <ThemeProvider theme={theme}>
      {console.log("in app.js")}
      <CssBaseline />
      <Router>
        <Layout>
          {/* <PWAInstallPrompt /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/patients" element={<PatientList />} />
            {/* <Route path="/bed-master" element={<BedMaster />} /> */}
            {/* <Route path="/ward-master" element={<WardMaster />} /> */}
            {/* <Route path="/doctor-master" element={<DoctorMaster />} /> */}
            <Route path="/case-sheet-templates" element={<CaseSheetTemplates />} />
            <Route path="/assessment/er-physician" element={<ERPhysicianAssessment />} />
            <Route path="/assessment/inpatient" element={<InpatientAssessment />} />
            <Route path="/assessment/nursing-initial" element={<NursingInitialAssessment />} />
            <Route path="/patients/:patient_id" element={<PatientAssessment />} />
            {/* <Route path="/discharge-summary" element={<DischargeSummary summary={dischargeSummaryData}/>} /> */}
            <Route path="/discharge-summary" element={<DischargeSummary summary={exampleResponse}/>} />
            <Route path="/clinical-error" element={<CaseSummary data={clinicalErrorData}/>} />
          </Routes>
        </Layout>
      </Router>
      {/* Install Modal */}
      {/* {showModal && (
          <div style={styles.modalOverlay}>
              <div style={styles.modal}>
                  <h2>Install Med AI</h2>
                  <p>Get the app on your device for easy access & a better experience!</p>
                  <button style={styles.installButton} onClick={handleInstallClick}>
                      ⬇ Install
                  </button>
                  <button style={styles.closeButton} onClick={() => setShowModal(false)}>✖</button>
              </div>
          </div>
      )} */}
    </ThemeProvider>
  );
}


const styles = {
  modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
  },
  modal: {
      background: "#fff",
      padding: "20px",
      borderRadius: "10px",
      textAlign: "center",
      position: "relative",
      width: "300px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  installButton: {
      background: "#000",
      color: "#fff",
      padding: "10px 20px",
      fontSize: "16px",
      border: "none",
      cursor: "pointer",
      width: "100%",
      borderRadius: "5px",
      marginTop: "10px",
  },
  closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      background: "none",
      border: "none",
      fontSize: "18px",
      cursor: "pointer",
  }
};

export default App;
