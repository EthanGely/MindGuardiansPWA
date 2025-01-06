import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import imageCalendar from "../../assets/calendar.png";

interface Patient {
  USER_ID: number;
  USER_FIRSTNAME: string;
  USER_LASTNAME: string;
  USER_BIRTH: number;
  USER_SEXE: number;
}

const itemsPerPage = 5;
const itemsLine1 = 2;

function Dashboard() {
  const navigate = useNavigate();

  const [patient, setPatient] = useState<Patient>();
  const [page, setPage] = useState(1);

  useEffect(() => {
    const patientId = localStorage.getItem("selectedPatient");

    const checkPatient = async () => {
      if (!patientId) {
        navigate("selectionPatient");
        return;
      }

      const token = localStorage.getItem("jwtToken");
      const patientDataUnparsed = localStorage.getItem("selectedPatientData");

      if (patientDataUnparsed) {
        const patientData = JSON.parse(patientDataUnparsed);
        if (patientData.expirationDate < Date.now() || patientData.USER_ID != patientId) {
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
        const expirationDate = Date.now() + 3600000;
        localStorage.setItem("selectedPatientData", JSON.stringify({ ...patientsRes, expirationDate }));

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

  let patientInfoHtml = "<p>" + patient.USER_FIRSTNAME + " " + patient.USER_LASTNAME + "</p>";

  const birthDate = new Date(patient.USER_BIRTH * 1000);
  const formattedBirthDate = `${birthDate.getDate().toString().padStart(2, "0")}/${(birthDate.getMonth() + 1).toString().padStart(2, "0")}/${birthDate.getFullYear()}`;
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  patientInfoHtml += "<p>Date de naissance : " + formattedBirthDate + " (" + age + " ans)" + "</p>";
  patientInfoHtml += "<p>Sexe : " + (patient.USER_SEXE == 1 ? "Homme" : patient.USER_SEXE == 2 ? "Autre" : "Femme") + "</p>";
  const cards = [
    {
      title: "Informations patient",
      content: patientInfoHtml,
      link: "detailsPatient",
    },
    {
      title: "Exercices de stimulation",
      content: "<p>Ajoutez des exercices de stimulation</p><p>En cours de développement...</p>",
      link: "",
    },
    {
      title: "Notifications push",
      content: "",
      link: "",
    },
    {
      title: "Agenda",
      content: "",
      link: "agenda",
      image: imageCalendar,
    },
    {
      title: "Communication et médias",
      content: "",
      link: "",
    },
    {
      title: "Lorem ipsum",
      content: "<p>Lorem ipsum dolor sit amet</p>",
      link: "",
    },
    {
      title: "Lorem ipsum 2",
      content: "<p>Lorem ipsum dolor sit amet</p>",
      link: "",
    },
  ];

  const usedCards = cards.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const usedCardsLine1 = usedCards.slice(0, itemsLine1);
  const usedCardsLine2 = usedCards.slice(itemsLine1, itemsPerPage);

  if (page < 1 || page > Math.ceil(cards.length / itemsPerPage)) {
    setPage(1);
  }

  return (
    <>
      <div className="main-body u-h-100 flex-col u-g-3">
        <div className={`card__list list-${itemsLine1} u-h-45`}>
          {usedCardsLine1.map((card) => (
            <div className="card card--rounded card--shadow u-h-90" key={card.title}>
              <div className="card__item-info">
                <h3 className="card__title">
                  {card.link ? (
                    <a className="card__link card__link--cover" href={"./docteur/" + card.link}>
                      {card.title}
                    </a>
                  ) : (
                    card.title
                  )}
                </h3>
              </div>
              <div className="card__content">
                <div dangerouslySetInnerHTML={{ __html: card.content }} />
              </div>
              {card.image ? (
                <div className="card__icon">
                  <img src={card.image} alt={card.title} />
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        <div className="card__list list-3 u-h-40">
          {usedCardsLine2.map((card) => (
            <div className="card card--rounded card--shadow u-h-90" key={card.title}>
              <div className="card__item-info">
                <h3 className="card__title">
                  {card.link ? (
                    <a className="card__link card__link--cover" href={"./docteur/" + card.link}>
                      {card.title}
                    </a>
                  ) : (
                    card.title
                  )}
                </h3>
              </div>
              <div className="card__content">
                <div dangerouslySetInnerHTML={{ __html: card.content }} />
              </div>
              {card.image ? (
                <div className="card__icon">
                  <img src={card.image} alt={card.title} />
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-center-aligncenter u-g-8 u-h-10">
          <button className="button button--primary" onClick={() => setPage(page - 1)} disabled={page == 1}>
            Précédent
          </button>
          <div>
            Page {page} / {Math.ceil(cards.length / itemsPerPage)}
          </div>
          <button className="button button--primary" onClick={() => setPage(page + 1)} disabled={page == Math.ceil(cards.length / itemsPerPage)}>
            Suivant
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
