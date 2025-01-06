import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Patient {
  USER_ID: number;
  USER_FIRSTNAME: string;
  USER_LASTNAME: string;
  USER_BIRTH: number;
  USER_SEXE: number;
  USER_MAIL: string;
  USER_HEUREREVEIL: string;
  USER_HEURECOUCHER: string;
}

function InfosPatient() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient>();
  const [accordionIndexopen, setAccordionIndexOpen] = useState<number>(-1);

  useEffect(() => {
    const patientId = localStorage.getItem("selectedPatient");

    const checkPatient = async () => {
      if (!patientId) {
        navigate("selectionPatient");
        return;
      }

      const patientDataUnparsed = localStorage.getItem("selectedPatientData");
      const token = localStorage.getItem("jwtToken");

      if (patientDataUnparsed) {
        const patientData = JSON.parse(patientDataUnparsed);
        if (patientData.expirationDate < Date.now()) {
          localStorage.removeItem("selectedPatientData");
        } else {
          console.log("Patient data from local storage");
          setPatient(patientData);
          return;
        }
      }
      
      console.log("Patient data from server");

      if (token && token !== undefined && token !== "undefined" && token !== "") {
        const response = await fetch("https://ethan-server.com:8443/user/getForDoctor", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId: patientId }),
        });

        let res = await response.json();

        const patientsRes = res.user;

        setPatient(patientsRes);
        return;
      }
      return;
    };
    checkPatient();
  }, []);

  if (!patient) {
    return <div>Chargement...</div>;
  }

  const birthDate = new Date(patient.USER_BIRTH * 1000);
  const formattedBirthDate = `${birthDate.getDate().toString().padStart(2, "0")}/${(birthDate.getMonth() + 1).toString().padStart(2, "0")}/${birthDate.getFullYear()}`;
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  return (
    <>
      <div className="main-body u-h-100 flex-col u-g-3">
        <h2>Informations du patient</h2>
        <div className="accordion">
          <button onClick={() => setAccordionIndexOpen(accordionIndexopen === 0 ? -1 : 0)} className={accordionIndexopen === 0 ? "accordion__button accordion__button--active" : "accordion__button"}>Informations personnelles</button>
          <div className="accordion__panel">
            <p>
              {patient.USER_FIRSTNAME} {patient.USER_LASTNAME}
            </p>
            <p>Date de naissance : {formattedBirthDate}</p>
            <p>Age : {age} ans</p>
            <p>Sexe : {patient.USER_SEXE == 1 ? "Homme" : patient.USER_SEXE == 2 ? "Autre" : "Femme"}</p>
            <p>Adresse mail : {patient.USER_MAIL}</p>
            <p>
              Horaires d'activité : {patient.USER_HEUREREVEIL} - {patient.USER_HEURECOUCHER}
            </p>
          </div>
          <button onClick={() => setAccordionIndexOpen(accordionIndexopen === 1 ? -1 : 1)} className={accordionIndexopen === 1 ? "accordion__button accordion__button--active" : "accordion__button"}>Informations médicales</button>
          <div className="accordion__panel">
            <p>En cours de développement...</p>
          </div>

          <button onClick={() => setAccordionIndexOpen(accordionIndexopen === 2 ? -1 : 2)} className={accordionIndexopen === 2 ? "accordion__button accordion__button--active" : "accordion__button"}>Notes</button>
          <div className="accordion__panel">
            <p>En cours de développement...</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfosPatient;
