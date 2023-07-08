import React from "react";
import "./Slider.css";

function BtnSlider({ moveSlide, direction }) {
  return (
    <button
      onClick={moveSlide}
      className={direction === "right" ? "btn-slide right" : "btn-slide left"}
    >
      {direction === "left" ? "<" : ">"}
    </button>
  );
}

export default BtnSlider;
