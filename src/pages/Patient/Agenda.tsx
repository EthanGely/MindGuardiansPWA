import { useEffect, useMemo, useState } from "react";
import AgendaMonthView from "../calendar/MonthView";
import AgendaType from "../calendar/AgendaType";
const modeOptions: { [key: number]: string } = {
  0: "Mois",
  1: "Semaine",
  2: "Jour",
};

function capitalize(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function Agenda() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mode, setMode] = useState(0);
  const [agendas, setAgendas] = useState<AgendaType[]>([]);

  const formattedDate = useMemo(() => {
    switch (mode) {
      case 0:
      case 1:
        return selectedDate.toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        });
      case 2:
        return selectedDate.toLocaleDateString(undefined, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        });
      default:
        return selectedDate.toLocaleDateString(undefined, {
          month: "long",
          year: "numeric",
        });
    }
  }, [selectedDate, mode]);

  const datesApi = useMemo(() => {
    // based on the mode, get the begin and end date in a unix timestamp format
    switch (mode) {
      case 0:
        return {
          dateDebut: Math.floor(new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
          ).getTime() / 1000),
          dateFin: Math.floor(new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
          ).getTime() / 1000),
        };
      case 1:
        return {
          dateDebut: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate() - selectedDate.getDay()
          ),
          dateFin: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate() + (6 - selectedDate.getDay())
          ),
        };
      case 2:
        return {
          dateDebut: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          ),
          dateFin: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate()
          ),
        };
      default:
        return {
          dateDebut: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            1
          ),
          dateFin: new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
          ),
        };
    }
  }, [selectedDate, mode]);

  const handlePrev = () => {
    switch (mode) {
      case 0:
        setSelectedDate(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() - 1,
            selectedDate.getDate()
          )
        );
        break;
      case 1:
        setSelectedDate(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate() - 7
          )
        );
        break;
      case 2:
        setSelectedDate(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate() - 1
          )
        );
        break;
    }
  };

  const handleNext = () => {
    switch (mode) {
      case 0:
        setSelectedDate(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            selectedDate.getDate()
          )
        );
        break;
      case 1:
        setSelectedDate(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate() + 7
          )
        );
        break;
      case 2:
        setSelectedDate(
          new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth(),
            selectedDate.getDate() + 1
          )
        );
        break;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://ethan-server.com:8443/agenda/getAll",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("jwtToken"),
          },
          body: JSON.stringify({ dateDebut: datesApi.dateDebut, dateFin: datesApi.dateFin }),
        }
      );
      const res = await response.json();
      setAgendas(res);
    };
    fetchData();
  }, [datesApi]);

  return (
    <>
      <div className="filters flex-spaceBetween u-mb-4">
        <div className="flex-aligncenter u-g-4">
          <button
            className="button button--primary"
            onClick={() => {
              alert("En cours de développement...\nUn peu de patience");
            }}
          >
            Filtrer
          </button>
          <select
            className="button button--primary"
            name="mode"
            id="modeAgenda"
            onChange={(e) => setMode(Number(e.target.value))}
          >
            {Object.entries(modeOptions).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-aligncenter u-g-4">
          <button
            className="button button--primary"
            onClick={() => {
              handlePrev();
            }}
          >
            {'<'}
          </button>
          <p className="calendar__date">{capitalize(formattedDate)}</p>
          <button
            className="button button--primary"
            onClick={() => {
              handleNext();
            }}
          >
            {'>'}
          </button>
        </div>
        <div className="flex-aligncenter u-g-4">
          <button
            className="button button--primary"
            onClick={() => {
              alert("En cours de développement...\nUn peu de patience");
            }}
          >
            Ajouter un événement
          </button>
        </div>
      </div>
      {mode === 0 && <AgendaMonthView selectedDate={selectedDate} agendas={agendas} />}
    </>
  );
}

export default Agenda;
