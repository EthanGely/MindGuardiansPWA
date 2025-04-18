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

interface Note {
  ID_NOTE_PATIENT: number;
  ID_PATIENT: number;
  ID_WRITER: number;
  NP_TEXT: string;
  NP_PRIVATE: number;
  NP_DATE: number;
  NP_UPDATE: number | null;
  USER_LASTNAME: string | null;
  USER_FIRSTNAME: string | null;
}

interface NewNote {
  active: boolean;
  text: string;
}

function InfosPatient() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient>();
  const [accordionIndexopen, setAccordionIndexOpen] = useState<number>(-1);
  const [prevAccordion, setPrevAccordion] = useState<number>(-1);
  const [editNotes, setEditNotes] = useState<number>(-1);
  const [editNotePrivee, setEditNotePrivee] = useState<number>(-1);
  const [notePrivee, setNotePrivee] = useState<Note>();
  const [notesPublique, setNotesPublique] = useState<Array<Note>>([]);
  const [newNote, setNewNote] = useState<NewNote>({ active: false, text: "" });

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

        const res = await response.json();

        const patientsRes = res.user;

        setPatient(patientsRes);
        return;
      }
      return;
    };
    checkPatient();
  }, [navigate]);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!patient) return;

      try {
        const token = localStorage.getItem("jwtToken");
        if (token && token !== undefined && token !== "undefined" && token !== "") {
          const response = await fetch("https://ethan-server.com:8443/notes/getAllWithName", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ patientId: patient?.USER_ID }),
          });
          const res = await response.json();

          console.log("res", res);

          setNotePrivee(res.notes.notePrivee[0] ?? []);
          setNotesPublique(res.notes.notePublic ?? []);
          return;
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchNotes();
  }, [patient]);

  useEffect(() => {
    if (prevAccordion === 2 && prevAccordion != accordionIndexopen && editNotePrivee !== -1) {
      alert("Vous devez sauvegarder la note avant de changer d'onglet");
      setAccordionIndexOpen(2);
    }
    setPrevAccordion(accordionIndexopen);
  }, [accordionIndexopen]);

  async function saveNote(idNote: number | null, isPrivate: boolean = false) {
    let note = isPrivate ? notePrivee?.NP_TEXT : notesPublique.find((note) => note.ID_NOTE_PATIENT === idNote)?.NP_TEXT;
    if (!note) {
      note = "";
    }

    try {
      const token = localStorage.getItem("jwtToken");
      if (token && token !== undefined && token !== "undefined" && token !== "") {
        const response = await fetch("https://ethan-server.com:8443/notes/setNote", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteId: idNote,
            patientId: patient?.USER_ID,
            note: note,
            noteType: isPrivate ? 1 : 0,
          }),
        });
        const res = await response.json();

        console.log("res", res);
        setEditNotes(-1);
        setEditNotePrivee(-1);
        return;
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }

  if (!patient) {
    return <div>Chargement...</div>;
  }

  const birthDate = new Date(patient.USER_BIRTH * 1000);
  const formattedBirthDate = `${birthDate.getDate().toString().padStart(2, "0")}/${(birthDate.getMonth() + 1).toString().padStart(2, "0")}/${birthDate.getFullYear()}`;
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  function isSameDay(NP_DATE: number, NP_UPDATE: number) {
    const date1 = new Date(NP_DATE * 1000);
    const date2 = new Date(NP_UPDATE * 1000);

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
  return (
    <>
      <div className="main-body u-h-100 flex-col u-g-3">
        <h2>
          Informations du patient - {patient.USER_FIRSTNAME} {patient.USER_LASTNAME}
        </h2>
        <div className="accordion">
          <button onClick={() => setAccordionIndexOpen(accordionIndexopen === 0 ? -1 : 0)} className={accordionIndexopen === 0 ? "accordion__button accordion__button--active" : "accordion__button"}>
            Informations personnelles
          </button>
          <div className="accordion__panel">
            <div className="patient-info">
              <h3 className="patient-info__name">
              {patient.USER_FIRSTNAME} {patient.USER_LASTNAME}
              </h3>
              <div className="patient-info__details">
              <p>
                <strong>Date de naissance :</strong> {formattedBirthDate}
              </p>
              <p>
                <strong>Age :</strong> {age} ans
              </p>
              <p>
                <strong>Sexe :</strong> {patient.USER_SEXE === 1 ? "Homme" : patient.USER_SEXE === 2 ? "Autre" : "Femme"}
              </p>
              <p>
                <strong>Adresse mail :</strong> {patient.USER_MAIL}
              </p>
              <p>
                <strong>Horaires d'activité :</strong> {patient.USER_HEUREREVEIL} - {patient.USER_HEURECOUCHER}
              </p>
              </div>
            </div>
          </div>
          <button onClick={() => setAccordionIndexOpen(accordionIndexopen === 1 ? -1 : 1)} className={accordionIndexopen === 1 ? "accordion__button accordion__button--active" : "accordion__button"}>
            Informations médicales partagées
          </button>
          <div className="accordion__panel">
            {notesPublique.map((note) => (
              <div key={note.ID_NOTE_PATIENT + '-publique'} className="u-mb-4">
                {editNotes === note.ID_NOTE_PATIENT && (
                  <>
                    <form className="form form--nostyle">
                      <div className="form__group">
                        <textarea className="u-w-100 u-mt-4 u-pr-3 u-pl-3" value={note.NP_TEXT} onChange={(e) => setNotesPublique((prevNotes) => prevNotes.map((n) => (n.ID_NOTE_PATIENT === note.ID_NOTE_PATIENT ? { ...n, NP_TEXT: e.target.value } : n)))} />
                      </div>
                    </form>
                    <button className="button button--secondary button--small u-align-center u-mb-4 u-mt-4" onClick={() => saveNote(note.ID_NOTE_PATIENT, false)}>
                      Sauvegarder
                    </button>
                  </>
                )}
                {editNotes !== note.ID_NOTE_PATIENT && (
                  <div className="u-p-4 u-mt-4 card card--shadow-dark card--rounded card--row no-hover u-flex-justify-between">
                    {note.USER_FIRSTNAME && note.USER_LASTNAME && (
                        <p className="card__label">
                          {note.USER_FIRSTNAME + ' ' + note.USER_LASTNAME} - Le {new Date(note.NP_DATE * 1000).toLocaleDateString("fr-FR")}
                          {note.NP_UPDATE && !isSameDay(note.NP_DATE, note.NP_UPDATE) ? ' (mise à jour ' + new Date(note.NP_UPDATE * 1000).toLocaleDateString("fr-FR") + ')' : ''}
                        </p>
                    )}
                    <p className="u-mb-0 u-mt-2 u-pt-3 u-pb-3 u-text-left">{note.NP_TEXT}</p>
                    <button className="button button--secondary button--small" onClick={() => setEditNotes(note.ID_NOTE_PATIENT)}>
                      Editer
                    </button>
                  </div>
                )}
              </div>
            ))}
            {notesPublique.length === 0 && <p>Aucune note publique</p>}
            {!newNote.active && (
              <button className="button button--secondary button--small u-align-center u-mb-4 u-mt-4" onClick={() => setNewNote({ active: true, text: "" })}>
                Ajouter une note
              </button>
            )}
            {newNote.active && (
              <>
                <form className="form form--nostyle">
                  <div className="form__group">
                    <textarea className="u-w-100 u-mt-4 u-pr-3 u-pl-3" value={newNote.text} onChange={(e) => setNewNote({ ...newNote, text: e.target.value })} />
                  </div>
                </form>
                <button className="button button--secondary button--small u-align-center u-mb-4 u-mt-4" onClick={() => saveNote(null, false)}>
                  Sauvegarder
                </button>
              </>
            )}
          </div>

          <button onClick={() => setAccordionIndexOpen(accordionIndexopen === 2 ? -1 : 2)} className={accordionIndexopen === 2 ? "accordion__button accordion__button--active" : "accordion__button"}>
            Note privée
          </button>
          <div className="accordion__panel">
            {notePrivee && (
              <div key={notePrivee.ID_NOTE_PATIENT + "-private"} className="u-mb-4">
                {editNotePrivee === notePrivee.ID_NOTE_PATIENT && (
                  <>
                    <form className="form form--nostyle">
                      <div className="form__group">
                        <textarea className="u-w-100 u-mt-4" value={notePrivee.NP_TEXT} onChange={(e) => setNotePrivee({ ...notePrivee, NP_TEXT: e.target.value } as Note)} />
                      </div>
                    </form>
                    <button className="button button--secondary button--small u-align-center u-mb-4 u-mt-4" onClick={() => saveNote(notePrivee.ID_NOTE_PATIENT, true)}>
                      Sauvegarder
                    </button>
                  </>
                )}
                {editNotePrivee !== notePrivee.ID_NOTE_PATIENT && (
                  <>
                    <p className="u-mb-0 u-text-left u-p-4 card card--shadow-dark card--rounded no-hover">{notePrivee.NP_TEXT}</p>
                    <button className="button button--secondary button--small u-align-center u-mb-4 u-mt-4" onClick={() => setEditNotePrivee(notePrivee.ID_NOTE_PATIENT)}>
                      {notePrivee && notePrivee.NP_TEXT && notePrivee.NP_TEXT.length > 0 ? "Editer" : "Ajouter une note"}
                    </button>
                  </>
                )}
              </div>
            )}
            {!notePrivee && <p>Aucune note privée</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default InfosPatient;
