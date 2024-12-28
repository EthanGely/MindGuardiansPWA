import AgendaType from "./AgendaType";
import Agenda from "./Agenda";
import { Dispatch, SetStateAction } from "react";

interface AgendaProps {
  agenda: AgendaType | AgendaType[];
  setOpened: Dispatch<SetStateAction<boolean>>;
}

const AgendaPopUp = ({agenda, setOpened}: AgendaProps) => {
  return (
    <>
      {(agenda && Array.isArray(agenda)) ? '' : <Agenda agenda={agenda as AgendaType} setOpened={setOpened} />}
    </>
  );
};

export default AgendaPopUp;
