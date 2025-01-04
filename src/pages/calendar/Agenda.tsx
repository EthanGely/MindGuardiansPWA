import { Dispatch, SetStateAction, useState } from "react";
import AgendaType from "./AgendaType";
import cronstrue from "cronstrue";
import "cronstrue/locales/fr";

interface AgendaProps {
  agenda: AgendaType;
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const repetitonCron: { [key: string]: string } = {
  "": "Pas de répétition",
  "1": "Quotidien",
  "2": "Hebdomadaire",
  "3": "Mensuel",
  "4": "Annuel",
  "5": "Personnalisé",
};

/*const repetitionDuree: { [key: string]: string } = {
  "0": "Toujours",
  "1": "Nombre de répétitions",
  "2": "Jusqu'au",
};*/

const Agenda = ({ agenda, setOpened }: AgendaProps) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(agenda.AGN_TITLE);
  const [dateDebut, setDateDebut] = useState(agenda.AGN_DATEDEBUT);
  const [dateFin, setDateFin] = useState(agenda.AGN_DATEFIN);
  const [description, setDescription] = useState(agenda.AGN_DESCRIPTION);
  const [vibration, setVibration] = useState(agenda.AGN_VIBRATION);
  const [flash, setFlash] = useState(agenda.AGN_FLASH);
  const [repetition, setRepetition] = useState(agenda.AGN_REPETITION);
  
  const handleSave = () => {
    fetch(`https://ethan-server.com:8443/agenda/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwtToken"),
      },
      body: JSON.stringify({
        ID_AGENDA: agenda.ID_AGENDA,
        agendaData: {
            AGN_TITLE: title,
            AGN_DATEDEBUT: dateDebut,
            AGN_DATEFIN: dateFin,
            AGN_DESCRIPTION: description,
            AGN_VIBRATION: vibration,
            AGN_FLASH: flash,
            AGN_REPETITION: repetition,
            AGN_DATENOTIFICATION: 0,
        }
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEditMode(false);
      });
  }

  return (
    <>
      {agenda && (
        <div className="modal">
          <div className="modal-content">
            {editMode ? (
              <>
                <form action="" className="form">
                  <div className="form__group">
                    <label htmlFor="AGN_TITLE">Titre</label>
                    <input
                      id="AGN_TITLE"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="AGN_DATEDEBUT">Date de début</label>
                    <input
                      id="AGN_DATEDEBUT"
                      type="date"
                      value={
                        new Date(dateDebut * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                      onChange={(e) => setDateDebut(new Date(e.target.value).getTime() / 1000)}
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="AGN_DATEFIN">Date de fin</label>
                    <input
                      id="AGN_DATEFIN"
                      type="date"
                      value={
                        new Date(dateFin * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                        onChange={(e) => setDateFin(new Date(e.target.value).getTime() / 1000)}
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="AGN_REPETITION">Répétition</label>
                    <select
                      name="AGN_REPETITION"
                      id="AGN_REPETITION"
                      value={repetition}
                      onChange={(e) => setRepetition(e.target.value)}
                    >
                      {Object.keys(repetitonCron).map((key) => (
                        <option key={key} value={key}>
                          {repetitonCron[key]}
                        </option>
                      ))}
                    </select>
                    <input
                      id="AGN_REPETITION"
                      type="text"
                      value={repetition}
                        onChange={(e) => setRepetition(e.target.value)}
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="AGN_DESCRIPTION">Description</label>
                    <textarea name="AGN_DESCRIPTION" id="AGN_DESCRIPTION" onChange={
                        (e) => setDescription(e.target.value)
                    }
                    value={description}></textarea>
                  </div>
                  <div className="form__group">
                    <label htmlFor="AGN_VIBRATION">Vibration</label>
                    <input
                      id="AGN_VIBRATION"
                      type="checkbox"
                      checked={vibration}
                      onChange={(e) => setVibration(e.target.checked)}
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="AGN_FLASH">Flash</label>
                    <input
                      id="AGN_FLASH"
                      type="checkbox"
                      checked={flash}
                        onChange={(e) => setFlash(e.target.checked)}
                    />
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2>{agenda.AGN_TITLE}</h2>
                <p>
                  <strong>Date de début:</strong>{" "}
                  {new Date(agenda.AGN_DATEDEBUT * 1000).toLocaleDateString(
                    undefined,
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <p>
                  <strong>Date de fin</strong>{" "}
                  {new Date(agenda.AGN_DATEFIN * 1000).toLocaleDateString(
                    undefined,
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </p>
                <p>
                  <strong>Répétition :</strong>{" "}
                  {cronstrue.toString(agenda.AGN_REPETITION, { locale: "fr" })}
                </p>
                <p>
                  <strong>Description :</strong> {agenda.AGN_DESCRIPTION}
                </p>
                <p>
                  <strong>Vibration :</strong>{" "}
                  {agenda.AGN_VIBRATION ? "Oui" : "Non"}
                </p>
                <p>
                  <strong>Flash :</strong> {agenda.AGN_FLASH ? "Oui" : "Non"}
                </p>
              </>
            )}
            <div className="flex flex-aligncenter u-g-10 u-mt-4">
              <button
                className="button button--primary"
                onClick={() => {
                    if (editMode) {
                        handleSave();
                    }
                    setEditMode(!editMode);
                    
                }}
              >
                {editMode ? "Enregistrer" : "Modifier"}
              </button>
              <button
                className="button button--primary"
                onClick={() => {
                  setOpened(false);
                }}
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Agenda;
