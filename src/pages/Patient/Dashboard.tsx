import { useState } from "react";
import puzzle from "../../assets/date.svg";
import memorisation from "../../assets/date.svg";
import associationImage from "../../assets/date.svg";
import jeuLogique from "../../assets/date.svg";
import motsCroisés from "../../assets/date.svg";
import devinettes from "../../assets/date.svg";

const itemsPerPage = 6;

function Dashboard() {
  const [page, setPage] = useState(1);
  const cards = [
    {
      title: "Agenda",
      icon: puzzle,
      link: "agenda",
    },
    {
      title: "Mémorisation",
      icon: memorisation,
      link: "memorisation",
    },
    {
      title: "Association d'images",
      icon: associationImage,
      link: "association-image",
    },
    {
      title: "Jeu de logique",
      icon: jeuLogique,
      link: "jeu-logique",
    },
    {
      title: "Mots croisés",
      icon: motsCroisés,
      link: "mots-croisés",
    },
    {
      title: "Devinettes",
      icon: devinettes,
      link: "devinettes",
    },
    {
      title: "Mots croisés",
      icon: motsCroisés,
      link: "mots-croisés",
    },
  ];

  const usedCards = cards.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (page < 1 || page > Math.ceil(cards.length / itemsPerPage)) {
    setPage(1);
  }
  return (
    <>
      <div className="main-body u-h-100 flex-col u-g-3">
        <div className="card__list list-3 u-h-85">
          {usedCards.map((card) => (
            <div className="card card--rounded card--shadow u-h-45" key={card.title}>
              <div className="card__item-info">
                <h3 className="card__title">
                  <a
                    className="card__link card__link--cover"
                    href={"patient/" + card.link}
                  >
                    {card.title}
                  </a>
                </h3>
              </div>
              <div className="card__icon">
                <img src={card.icon} alt={card.title} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-center-aligncenter u-g-8 u-h-10">
          <button
            className="button button--primary"
            onClick={() => setPage(page - 1)}
            disabled={page == 1}
          >
            Précédent
          </button>
          <div>
            Page {page} / {Math.ceil(cards.length / itemsPerPage)}
          </div>
            <button
              className="button button--primary"
              onClick={() => setPage(page + 1)}
              disabled={page == Math.ceil(cards.length / itemsPerPage)}
            >
              Suivant
            </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
