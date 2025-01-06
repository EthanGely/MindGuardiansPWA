import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Patient {
  USER_ID: number;
  USER_FIRSTNAME: string;
  USER_LASTNAME: string;
}

const PatientSelect: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      console.log("fetching patients");

      try {
        const token = localStorage.getItem("jwtToken");
        if (token && token !== undefined && token !== "undefined" && token !== "") {
          const response = await fetch("https://ethan-server.com:8443/user/getAllForDoctor", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("response", response);

          let res = await response.json();

          const patientsRes = res.users;

          setPatients(patientsRes);
          return;
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  const handlePatientSelect = (patient: Patient) => {
    localStorage.setItem("selectedPatient", patient.USER_ID.toString());
    navigate("/docteur");
    return;
  };

  console.log("patients", patients);

  if (!patients || patients.length === 0) {
    return <div>Chargement...</div>;
  }
  return (
    <div>
      <h2>Sélectionnez un patient</h2>
      <ul className="patients-list">
        {patients.map((patient) => (
          <li className="patient" key={patient.USER_ID} onClick={() => handlePatientSelect(patient)}>
            {patient.USER_FIRSTNAME} {patient.USER_LASTNAME}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientSelect;
