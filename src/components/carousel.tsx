import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

interface CarouselComponentProps {
  cards: { title: string; link: string; icon?: string | null }[];
  itemsPerPage: number;
}

function CarouselComponent({ cards, itemsPerPage }: CarouselComponentProps) {
  function chunkArray<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, i) => array.slice(i * size, i * size + size));
  }

  const chunkedCards = chunkArray(cards, itemsPerPage);

  return (
    <>
      <Carousel swipeable={true} draggable={true} responsive={responsive} infinite={false} autoPlay={false} keyBoardControl={true} transitionDuration={500} renderArrowsWhenDisabled={true}>
        {chunkedCards.map((cardList, index) => (
          <div className="card__list list-3" key={index}>
            {cardList.map((card) => (
              <div className="card card--rounded card--shadow" key={card.title}>
                <div className="card__item-info">
                  <h3 className="card__title">
                    <a className="card__link card__link--cover" href={card.link}>
                      {card.title}
                    </a>
                  </h3>
                </div>
                {card.icon && (
                  <div className="card__icon">
                    <img src={card.icon} alt={card.title} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default CarouselComponent;
