// SlideShow.js
import React, { useState } from 'react';
import './slideshow.scss';


interface Slide {
    img: string;
    title: string;
    description: string;
    buttonLabel: string;
}

interface ChildComponentProps {
    slides: Slide[];
}


const SlideShow: React.FC<ChildComponentProps> = ({ slides }) => {

    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
    };

    const goToSlide = (index: React.SetStateAction<number>) => {
        setCurrentSlide(index);
    };

    return (
        <>
            <div className="slide-show">
                <div className="slides-container">
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={index === currentSlide ? 'slide active' : 'slide'}
                            style={{
                                transform: `translateX(-${currentSlide * 100}%)`
                            }}>
                            <div className="content">
                                <div className="visuel"><img src={slide.img} alt={slide.title} /></div>
                                <h2>{slide.title}</h2>
                                <p>{slide.description}</p>
                                {index === slides.length - 1 ? <a href="/login" className="button">{slide.buttonLabel}</a> : 
                                <button onClick={() => nextSlide()}>{slide.buttonLabel}</button>}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={index === currentSlide ? 'dot active' : 'dot'}
                            onClick={() => goToSlide(index)}
                        ></span>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SlideShow;