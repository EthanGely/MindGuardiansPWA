//import { useEffect, useState } from "react";
import "./agenda.scss";

function Agenda() {
  const agendas = [
    {
      title: "Boire de l'eau",
      repetition: "12 fois par jour",
      recurrence: "Tous les jours",
    },
    {
      title: "Prendre ses médicaments",
      repetition: "2 fois par jour",
      recurrence: "Tous les jours",
    },
    {
      title: "Marcher",
      repetition: "1 fois par jour",
      recurrence: "Tous les jours",
    },
    {
      title: "Boire de l'eau",
      repetition: "12 fois par jour",
      recurrence: "Tous les jours",
    },
    {
      title: "Prendre ses médicaments",
      repetition: "2 fois par jour",
      recurrence: "Tous les jours",
    },
    {
      title: "Marcher",
      repetition: "1 fois par jour",
      recurrence: "Tous les jours",
    },
  ];

  return (
    <div id="agenda-main">
      <div className="agenda-haut">
        <div className="agenda-haut__add">
          <button className="button button--primary">Ajouter une notification</button>
        </div>
        <div className="agenda-haut__pagination">
          <button disabled className="button button--primary-dark">
            Précédent
          </button>
          <p>Page 1 sur 2</p>
          <button className="button button--primary">Suivant</button>
        </div>
      </div>
      <div className="agenda-liste">
        {agendas.map((agenda, index) => (
          <div className="agenda" key={index}>
            <div className="agenda__title">
              <h2>{agenda.title}</h2>
            </div>
            <div className="agenda__content">
              <p className="agenda__repetition">
                Répétition: <span>{agenda.repetition}</span>
              </p>
              <p className="agenda__recurrence">
                Récurrence: <span>{agenda.recurrence}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Agenda;
