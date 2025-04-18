import puzzle from "../../assets/puzzle.png";
import de from "../../assets/de.svg";
import game from "../../assets/puzzle.svg";
import heart from "../../assets/hearth.svg";
import notif from "../../assets/bell.svg";
import calendar from "../../assets/calendar(1).png";
import chat from "../../assets/chat.svg";

import CarouselComponent from "../../components/carousel";

const itemsPerPage = 6;

function Dashboard() {
  const cards = [
    {
      title: "Exercices de stimulation",
      icon: de,
      link: "patient/exercices-stimulation",
    },
    {
      title: "Jeux",
      icon: game,
      link: "patient/jeux",
    },
    {
      title: "Exercices physiques",
      icon: heart,
      link: "patient/exercices-physiques",
    },
    {
      title: "Notifications push",
      icon: notif,
      link: "patient/notifications",
    },
    {
      title: "Agenda",
      icon: calendar,
      link: "patient/agenda",
    },
    {
      title: "communication et médias",
      icon: chat,
      link: "patient/communication-medias",
    },
    {
      title: "Puzzle",
      icon: puzzle,
      link: "patient/puzzle",
    },
    {
      title: "Association d'images",
      icon: null,
      link: "patient/association-image",
    },
    {
      title: "Jeu de logique",
      icon: null,
      link: "patient/jeu-logique",
    },
    {
      title: "Mots croisés",
      icon: null,
      link: "patient/mots-croisés",
    },
    {
      title: "Devinettes",
      icon: null,
      link: "patient/devinettes",
    },
  ];

  return (
    <>
        <CarouselComponent cards={cards} itemsPerPage={itemsPerPage} />
    </>
  );
}

export default Dashboard;
