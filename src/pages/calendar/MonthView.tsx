import { useState } from "react";

interface MonthProps {
  selectedDate: Date;
  agendas: [];
}

const messages = [
  'Un agenda est prévu ce jour, mais le dev n\'a pas encore eu le temps d\'y travailler... ;(',
  'Pour accélérer le développement, offrez-moi une boisson énergisante (non, je n\'aime pas le café...) !',
  'Patience... Cliquer sur ce message ne fera pas apparaître l\'agenda plus vite...',
  'Un jour, un agenda apparaîtra... Mais pas aujourd\'hui !',
  'Heuuu...',
  '... Non, toujours pas !',
  'Un jour, peut-être...',
  '... Ou pas !',
  'Toujours pas...',
  '... Toujours rien...',
  '... Toujours pas...',
  'Non, rien de rien, Non, je ne fait rien',
  'Attendez...',
  'Essayez encore une fois ?',
  'Je crois que ça vient',
  'Le prochain clic sera le bon !',
  'Mince, raté !',
];

const [openedPopup, setOpenedPopup] = useState(false);

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const today = new Date();

function MonthView({ selectedDate, agendas }: MonthProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  //Get the number of days in the month
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  //Get the first day of the month
  const firstDay =
    (new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay() +
      6) %
    7;
  //Get number of weeks in the month
  const weeksInMonth = Math.ceil(daysInMonth / 7) + 1;

  const isCurrentMonth =
    today.getMonth() === selectedDate.getMonth() &&
    today.getFullYear() === selectedDate.getFullYear();

  // Tri des agendas par durée
  agendas.sort((a: any, b: any) => {
    if (Math.abs(a.AGN_DATEFIN - a.AGN_DATEDEBUT) < Math.abs(b.AGN_DATEFIN - b.AGN_DATEDEBUT)) {
      return 1;
    }
    if (Math.abs(a.AGN_DATEFIN - a.AGN_DATEDEBUT) > Math.abs(b.AGN_DATEFIN - b.AGN_DATEDEBUT)) {
      return -1;
    }
    return 0;
  });


  const handleAgendaClick = () => {

    setOpenedPopup(!openedPopup);
  }

  console.log(agendas);
  return (
    <>
      <div id="calendar" className="calendar">
        <div className="calendar__rows">
          <div className="calendar__header calendar__row flex u-mb-4">
            {[
              "lundi",
              "mardi",
              "mercredi",
              "jeudi",
              "vendredi",
              "samedi",
              "dimanche",
            ].map((day) => (
              <p
                className={
                  "calendar__cell" +
                  (isCurrentMonth &&
                  today.toLocaleDateString(undefined, { weekday: "long" }) ===
                    day
                    ? " calendar__cell--today"
                    : "")
                }
                key={day}
              >
                {capitalize(day)}
              </p>
            ))}
          </div>
          {Array.from({ length: weeksInMonth }, (_, i) => {
            return (
              <div key={i} className="calendar__row flex">
                {Array.from({ length: 7 }, (_, j) => {
                  const day = i * 7 + j - firstDay + 1;
                  if (day > 0 && day <= daysInMonth) {
                    let daysAgendaNumber = 0;
                    return (
                      <div
                        key={j}
                        className={
                          "calendar__cell" +
                          (isCurrentMonth && today.getDate() === day
                            ? " calendar__cell--today"
                            : "")
                        }
                      >
                        <p className="calendar__day">{day}</p>
                        {agendas.map((agenda: any) => {
                          const dateDebut = new Date(agenda.AGN_DATEDEBUT * 1000);
                          const dateFin = new Date(agenda.AGN_DATEFIN * 1000);

                          const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
                          const currentDateEnd = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day, 23, 59, 59);
                          
                          if ( (dateDebut <= currentDateEnd && dateFin >= currentDate) && daysAgendaNumber < 3) {
                            daysAgendaNumber++;
                            return (
                              <div key={agenda.ID_AGENDA} className="calendar__agenda" onClick={() => {alert(messages[messageIndex] ?? "Y'aura pas d'autres messages, mais promis, je vais en ajouter si ça vous amuse => En revanche, ça ralentira la durée de développement de la fonctionnalité"); setMessageIndex(messageIndex + 1)}}></div>
                            )
                          }
                        })}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={j}
                        className="calendar__cell calendar__cell--empty"
                      ></div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MonthView;
