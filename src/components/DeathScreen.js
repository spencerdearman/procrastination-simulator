import React from "react";
import "../styles/DeathScreen.css";
import { useNavigate } from "react-router-dom";

function DeathScreen({ deathCause }) {
  const navigate = useNavigate();
  const restartGame = () => {
    window.location = "/";
  };
  return (
    <div id="death-box">
      <div id="death-title">You died 🪦</div>
      <div id="death-message">
        Seems like you couldn't get enough ${deathCause}{" "}
      </div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default DeathScreen;
