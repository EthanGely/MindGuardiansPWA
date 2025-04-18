import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Patient {
  USER_ID: number;
  USER_FIRSTNAME: string;
  USER_LASTNAME: string;
  USER_SEXE: string;
  USER_BIRTH: number;
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

          const res = await response.json();

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
      <table>
        <thead>
          <tr>
            <th>Sexe</th>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Âge</th>
            <th>Espace patient</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.USER_ID} onClick={() => handlePatientSelect(patient)}>
              <td>{patient.USER_SEXE ? 'Homme' : 'Femme'}</td>
              <td>{patient.USER_LASTNAME}</td>
              <td>{patient.USER_FIRSTNAME}</td>
              <td>{new Date().getFullYear() - new Date(patient.USER_BIRTH * 1000).getFullYear()} ans</td>
              <td><button className="button button--small" onClick={() => handlePatientSelect(patient)}>Accéder</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientSelect;
