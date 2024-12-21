import { useState } from "react";
import AgendaType from "./AgendaType";

interface AgendaProps {
  agenda: AgendaType;
}

const Agenda = ({ agenda }: AgendaProps) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {agenda && (
        <div className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            {editMode ? (
              <>
                <label htmlFor="AGN_TITLE">Titre</label>
                <input id="AGN_TITLE" type="text" value={agenda.AGN_TITLE} />
                <label htmlFor="AGNDATEDEBUT">Date de début</label>
                <input id="AGN_DATEDEBUT" type="date" value={agenda.AGN_DATEDEBUT} />
                <label htmlFor="AGN_DATEFIN">Date de fin</label>
                <input id="AGN_DATEFIN" type="date" value={agenda.AGN_DATEFIN} />
                <label htmlFor="AGN_REPETITION">Répétition</label>
                <input id="AGN_REPETITION" type="text" value={agenda.AGN_REPETITION} />
                <label htmlFor="AGN_DESCRIPTION">Description</label>
                <input id="AGN_DESCRIPTION" type="text" value={agenda.AGN_DESCRIPTION} />
                <label htmlFor="AGN_VIBRATION">Vibration</label>
                <input id="AGN_VIBRATION" type="checkbox" checked={agenda.AGN_VIBRATION} />
                <label htmlFor="AGN_FLASH">Flash</label>
                <input id="AGN_FLASH" type="checkbox" checked={agenda.AGN_FLASH} />
              </>
            ) : (
              <>
                <h2>{agenda.AGN_TITLE}</h2>
                <p>
                  <strong>Date de début:</strong> {new Date(agenda.AGN_DATEDEBUT).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p>
                  <strong>Date de fin</strong> {new Date(agenda.AGN_DATEFIN).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    })}
                </p>
                <p>
                  <strong>Répétition :</strong> {agenda.AGN_REPETITION}
                </p>
                <p>
                  <strong>Description :</strong> {agenda.AGN_DESCRIPTION}
                </p>
                <p>
                    <strong>Répétitions:</strong> {agenda.AGN_REPETITION}
                </p>
                <p>
                    <strong>Vibration :</strong> {agenda.AGN_VIBRATION ? "Oui" : "Non"}
                </p>
                <p>
                    <strong>Flash :</strong> {agenda.AGN_FLASH ? "Oui" : "Non"}
                </p>
                <button
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  Mode édition
                </button>
              </>
            )}

            <button>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Agenda;
