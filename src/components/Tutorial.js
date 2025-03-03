import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import slide1 from "../images/slide1.png";
import slide2 from "../images/slide2.png";
import slide3 from "../images/slide3.png";
import slide4 from "../images/slide4.png";
import "../styles/Tutorial.css";

function Tutorial() {
  const navigate = useNavigate();
  const totalSlides = 4;
  const [currentSlide, setCurrentSlide] = useState(1);

  // Create an array of imported slides
  const slides = [slide1, slide2, slide3, slide4]; // add all your slides here

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
