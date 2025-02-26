import React from "react";

function Tutorial() {
  return (
    <div className="tutorial">
      <button class="tutorial-button" id="tutorial-left">
        &lt;
      </button>
      <img src="./images/slide1.png" alt="" id="tutorial-image" />
      <button className="tutorial-button" id="tutorial-right">
        &gt;
      </button>
      <script src="./scripts/tutorial.js" defer />
    </div>
  );
}

export default Tutorial;
