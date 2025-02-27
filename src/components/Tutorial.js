import React, { useState } from "react";
// import 'scripts/tutorialScripting.js';

function Tutorial() {
  const [tutorialVisibility, setTutorialVisibility] = useState("hidden");
  const [leftDisabled, setLeftDisabled] = useState(true);
  const [rightDisabled, setRightDisabled] = useState(false);
  const totalSlides = 4;
  const [currentSlide, setCurrentSlide] = useState(1);
  const handlePreviousSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 1));
    if (currentSlide <= 2) {
      setLeftDisabled(true);
    } else {
      setLeftDisabled(false);
      setRightDisabled(false);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => Math.min(totalSlides, prev + 1));
    if (currentSlide >= totalSlides - 1) {
      setRightDisabled(true);
    } else {
      setLeftDisabled(false);
      setRightDisabled(false);
    }
  };

  // call this somewhere to start the tutorial
  const tutorialStart = () => {
    setTutorialVisibility("visible");
  };

  const tutorialEnd = () => {
    setTutorialVisibility("hidden");
    // code to start game logic
  };

  return (
    <div className="tutorial" style={{ visibility: `${tutorialVisibility}` }}>
      <div className="tutorial-top">
        <button
          disabled={leftDisabled}
          className="tutorial-button"
          id="tutorial-left"
          onClick={handlePreviousSlide}
        >
          &lt;
        </button>
        <img
          src={`./images/slide${currentSlide}.png`}
          alt=""
          id="tutorial-image"
        />
        <button
          disabled={rightDisabled}
          className="tutorial-button"
          id="tutorial-right"
          onClick={handleNextSlide}
        >
          &gt;
        </button>
      </div>
      <div className="tutorial-bottom">
        <button id="tutorial-end" onClick={tutorialEnd}>
          End Tutorial
        </button>
      </div>
    </div>
  );
}

export default Tutorial;
