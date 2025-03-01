import React from "react";
import "../styles/DeathScreen.css";

function DeathScreen({ deathCause }) {
  return (
    <div id="death-box">
    <div id="death-title">You died 🪦</div>
    <div id="death-message">Seems like you couldn't get enough ${deathCause} </div>
    <button class="restart-button">Restart Game</button>
  </div>
  );
}

export default DeathScreen;
