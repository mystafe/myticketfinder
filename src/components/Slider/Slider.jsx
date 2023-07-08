import React, { useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";

function Slider({ imgData }) {
  const [slideIndex, setSlideIndex] = useState(1);
  const nextSlide = () => {
    if (slideIndex !== imgData.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === imgData.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(imgData.length);
    }
  };
  return (
    <div className="container-slider">
      {imgData.map((item, index) => {
        return (
          <div
            className={
              slideIndex === index + 1
                ? "slide active-anim"
                : "slide passive-anim "
            }
          >
            {/* <img src={process.env.PUBLIC_URL+"/Img/"+item.url} alt={item.description} /> */}
            <img src={item.url} alt={item.description} />
          </div>
        );
      })}

      <BtnSlider moveSlide={prevSlide} direction={"left"} />
      <BtnSlider moveSlide={nextSlide} direction={"right"} />
    </div>
  );
}

export default Slider;
