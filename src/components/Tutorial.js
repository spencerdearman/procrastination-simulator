import React, { useState } from "react";
// import 'scripts/tutorialScripting.js';

function Tutorial() {
  const totalSlides = 4;
  const [currentSlide, setCurrentSlide] = useState(1);
  const handlePreviousSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide(prev => Math.min(totalSlides, prev +1));
  };

  return (
    <div className="tutorial">
      <button className="tutorial-button" id="tutorial-left" onClick={handlePreviousSlide}>
        &lt;
      </button>
      <img src={`./images/slide${currentSlide}.png`} alt="" id="tutorial-image" />
      <button className="tutorial-button" id="tutorial-right" onClick={handleNextSlide}>
        &gt;
      </button>

    </div>
  );
}

export default Tutorial;
