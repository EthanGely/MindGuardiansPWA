import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import imageCalendar from "../../assets/calendar.png";
import imageInfo from "../../assets/user-square.svg";
import imageExo from "../../assets/dice.svg";
import imageCarnet from "../../assets/book.svg";
import imageSms from "../../assets/sms.svg";

interface Patient {
  USER_ID: number;
  USER_FIRSTNAME: string;
  USER_LASTNAME: string;
  USER_BIRTH: number;
  USER_SEXE: number;
}

const itemsPerPage :number = 5;
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

        const res = await response.json();

        const patientsRes = res.user;
        const expirationDate = Date.now() + 3600000;
        localStorage.setItem("selectedPatientData", JSON.stringify({ ...patientsRes, expirationDate }));

        setPatient(patientsRes);
        return;
      }
      return;
    };
    checkPatient();
  }, [navigate]);

  if (!patient) {
    return <div>Chargement...</div>;
  }

  const cards = [
    {
      title: "Informations",
      link: "detailsPatient",
      image: imageInfo,
    },
    {
      title: "Exercices de stimulation",
      link: "",
      image: imageExo,
    },
    {
      title: "Carnet de liaison",
      link: "",
      image: imageCarnet,
    },
    {
      title: "Agenda",
      link: "agenda",
      image: imageCalendar,
    },
    {
      title: "Communication et médias",
      link: "",
      image: imageSms,
    }
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
        <div className={`card__list list-${itemsLine1}`}>
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
              {card.image && (
                <div className="card__icon">
                  <img src={card.image} alt={card.title} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="card__list list-3">
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
              {card.image && (
                <div className="card__icon">
                  <img src={card.image} alt={card.title} />
                </div>
              )}
            </div>
          ))}
        </div>
        { (cards.length > itemsPerPage) && (
        <div className="flex flex-center-aligncenter u-g-8">
          <button className="button button--primary" onClick={() => setPage(page - 1)} disabled={page == 1}>
            Précédent
          </button>
          <div onClick={() => alert(cards.length + " / " + itemsPerPage)}>
            Page {page} / {Math.ceil(cards.length / itemsPerPage)}
          </div>
          <button className="button button--primary" onClick={() => setPage(page + 1)} disabled={page == Math.ceil(cards.length / itemsPerPage)}>
            Suivant
          </button>
        </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
