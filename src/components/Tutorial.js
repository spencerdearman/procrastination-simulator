import React from "react";
import './scripts/tutorialScripting.js';
// import 'scripts/tutorialScripting.js';

function Tutorial() {
  return (
    <div className="tutorial">
      <button className="tutorial-button" id="tutorial-left">
        &lt;
      </button>
      <img src="./images/slide1.png" alt="" id="tutorial-image" />
      <button className="tutorial-button" id="tutorial-right">
        &gt;
      </button>
     
    </div>
  );
}

export default Tutorial;
