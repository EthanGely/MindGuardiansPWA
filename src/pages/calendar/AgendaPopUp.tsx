import AgendaType from "./AgendaType";
import Agenda from "./Agenda";

interface AgendaProps {
  agenda: AgendaType | AgendaType[];
}

const AgendaPopUp = ({agenda}: AgendaProps) => {
  return (
    <>
      {(agenda && Array.isArray(agenda)) ? '' : <Agenda agenda={agenda as AgendaType} />}
    </>
  );
};

export default AgendaPopUp;
