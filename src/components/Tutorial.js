import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import slide1 from "../images/slide1.png";
import slide2 from "../images/slide2.png";
import slide3 from "../images/slide3.png";
import slide4 from "../images/slide4.png";
import slide5 from "../images/slide5.png";
import slide6 from "../images/slide6.png";
import slide7 from "../images/slide7.png";
import slide8 from "../images/slide8.png";
import slide9 from "../images/slide9.png";
import slide10 from "../images/slide10.png";
import slide11 from "../images/slide11.png";
import slide12 from "../images/slide12.png";
import slide13 from "../images/slide13.png";
import "../styles/Tutorial.css";

function Tutorial() {
  const navigate = useNavigate();
  const totalSlides = 13;
  const [currentSlide, setCurrentSlide] = useState(1);

  // Create an array of imported slides
  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
    slide5,
    slide6,
    slide7,
    slide8,
    slide9,
    slide10,
    slide11,
    slide12,
    slide13,
  ]; // add all your slides here

  const handlePreviousSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const tutorialEnd = () => {
    navigate("/game/calendar");
  };

  return (
    <div className="tutorial">
      <div className="tutorial-top">
        <button
          className="tutorial-button"
          id="tutorial-left"
          onClick={handlePreviousSlide}
          style={{ visibility: currentSlide === 1 ? "hidden" : "visible" }}
        >
          &lt;
        </button>
        <img
          alt={`Tutorial slide ${currentSlide}`}
          src={slides[currentSlide - 1]}
          id="tutorial-image"
        />
        <button
          className="tutorial-button"
          id="tutorial-right"
          onClick={handleNextSlide}
          style={{
            visibility: currentSlide === totalSlides ? "hidden" : "visible",
          }}
        >
          &gt;
        </button>
      </div>
      <div className="tutorial-bottom">
        <button id="tutorial-end" onClick={tutorialEnd}>
          Start Scheduling!
        </button>
      </div>
    </div>
  );
}

export default Tutorial;
