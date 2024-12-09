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
      <div className="main-body">
        <div className="card__list list-3">
          {usedCards.map((card) => (
            <div className="card card--shadow" key={card.title}>
              <a className="card__title" href={"patient/" + card.link}>
                {card.title}
              </a>
              <div className="card__icon">
                <img src={card.icon} alt={card.title} />
              </div>
            </div>
          ))}
        </div>
        {page > 1 && (
          <button onClick={() => setPage(page - 1)}>Précédent</button>
        )}
        <div>
          Page {page} / {Math.ceil(cards.length / itemsPerPage)}
        </div>
        {page < cards.length / itemsPerPage && (
          <button onClick={() => setPage(page + 1)}>Suivant</button>
        )}
      </div>
    </>
  );
}

export default Dashboard;
