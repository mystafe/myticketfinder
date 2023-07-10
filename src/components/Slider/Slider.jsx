import React, { useEffect, useState } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import { set } from "react-cool-form";

function Slider({ imgData }) {
  const [slideIndex, setSlideIndex] = useState(1);
  const [validImages, setValidImages] = useState([]);
  const nextSlide = () => {
    if (slideIndex !== validImages?.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === validImages?.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(validImages?.length);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [slideIndex]);

  useEffect(() => {
    setValidImages(
      imgData &&
        imgData.map((item, index) =>
          item.urlAddress.startsWith("http")
            ? { index: index + 1, urlAddress: item.urlAddress }
            : {
                index: index + 1,
                urlAddress: process.env.PUBLIC_URL + "../" + item.urlAddress,
              }
        )
    );
  }, [imgData]);
  return (
    <div className="container-slider">
      {validImages &&
        validImages.map((item, index) => {
          return (
            <div
              className={
                slideIndex === index + 1
                  ? "slide active-anim"
                  : "slide passive-anim "
              }
            >
              <img src={item.urlAddress} alt={item.description} />
            </div>
          );
        })}

      <BtnSlider moveSlide={prevSlide} direction={"left"} />
      <BtnSlider moveSlide={nextSlide} direction={"right"} />
    </div>
  );
}

export default Slider;
