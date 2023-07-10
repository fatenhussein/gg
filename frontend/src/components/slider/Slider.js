import React, { useState } from 'react';
import './Slider.css';
import BtnSlider from './BtnSlider';
import dataSlider from './dataSlider';

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const nextSlide = () => {
    if (slideIndex !== dataSlider.length - 1) {
      setSlideIndex(slideIndex + 1);
    }
    if (slideIndex === dataSlider.length - 1) {
      setSlideIndex(1);
    }
  };
  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length - 1);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };
  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => {
        return (
          <div
            className={slideIndex === index + 1 ? 'slide active-anim' : 'slide'}
            key={obj.id}
          >
            <img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={'next'} />
      <BtnSlider moveSlide={prevSlide} direction={'prev'} />
      <div className="container-dots">
        {Array.from({ length: 4 }).map((item, index ) => (
          <div key={index}
            onMouseOver={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
