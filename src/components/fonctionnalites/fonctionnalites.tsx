import SlideShow from "../utils/slideshow.tsx";
import dateCalendar from "../../assets/date.svg";
import logoMg from "../../assets/logo-mind-guardians.png";
import controller from "../../assets/controller.svg";
import simulation from "../../assets/simulation.svg";
import Footer from "../footer.tsx";

function Fonctionnalites() {
  const slides = [
    {
      img: logoMg,
      title: "",
      description: "Bienvenue sur la tablette évolutive pour accompagner les personnes atteintes de la maladie d'Alzheimer. Cette tablette a été conçue pour vous aider à rester connecté, stimulé et soutenu tout au long de votre parcours.",
      buttonLabel: "Commencer",
    },
    {
      img: dateCalendar,
      title: "Rappels et Agenda",
      description: "Restez organisé en programmant vos rendez-vous médicaux et en recevant des rappels pour prendre vos médicaments.",
      buttonLabel: "Suivant",
    },
    {
      img: simulation,
      title: "Exercices de stimulation",
      description: "Stimulez votre cerveau avec des exercices cognitifs amusants et interactifs pour stimuler la mémoire, la concentration et d'autres fonctions cognitives.",
      buttonLabel: "Suivant",
    },
    {
      img: controller,
      title: "Jeux",
      description: "Divertissez-vous avec une sélection de jeux divertissants adaptés à vos capacités cognitives et personnalisés.",
      buttonLabel: "S'inscrire",
    },
  ];

  return (
    <>
      <div className="u-mb-5"></div>
      <SlideShow slides={slides} />
      <Footer />
    </>
  );
}

export default Fonctionnalites;
