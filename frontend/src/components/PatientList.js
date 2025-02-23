import React, { useState } from "react";
import "./PatientList.css"; // We'll define some basic CSS here

const patientData = [
  {
    name: "Mr. VASANTHA VENKAT",
    age: 58,
    ward: "Deluxe Bed",
    patientID: "nXP-IP250112",
  },
  {
    name: "Mr. Eedipi Suraiiahgoud",
    age: 64,
    ward: "Suite Bed",
    patientID: "nXP-IP250114",
  },
  {
    name: "Mr. Manneru Larence",
    age: 35,
    ward: "Suite Room",
    patientID: "nXP-IP250115",
  },
  {
    name: "Mr. Teegala Mallesh Goud",
    age: 49,
    ward: "Surgical",
    patientID: "nXP-IP250116",
  },
  {
    name: "Mr. Palaguri Raju",
    age: 42,
    ward: "Medical",
    patientID: "nXP-IP250117",
  },
  {
    name: "Dr. SHAIK ASIF HUSSAIN",
    age: 27,
    ward: "D & E",
    patientID: "nXP-IP250118",
  },
];

function PatientList() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <div>
      {/* Button to toggle the patient list menu */}
      <button onClick={toggleMenu} style={{ margin: "20px" }}>
        {isMenuOpen ? "Close Patients List" : "Open Patients List"}
      </button>

      {/* Menu container that slides from left */}
      <div className={`patient-menu ${isMenuOpen ? "open" : ""}`}>
        <h2>Patients</h2>
        <ul>
          {patientData.map((patient, index) => (
            <li key={index} className="patient-item">
              <div className="patient-name">
                {patient.name} ({patient.age})
              </div>
              <div>Ward: {patient.ward}</div>
              <div>ID: {patient.patientID}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PatientList;
