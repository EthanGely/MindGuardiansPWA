import game from "../../assets/puzzle.svg";

import CarouselComponent from "../../components/carousel";

const itemsPerPage = 6;

function Jeux() {
  const cards = [
    {
      title: "Puzzle",
      icon: game,
      link: "/patient/puzzle",
    },
  ];

  return (
    <>
        <CarouselComponent cards={cards} itemsPerPage={itemsPerPage} />
    </>
  );
}

export default Jeux;
