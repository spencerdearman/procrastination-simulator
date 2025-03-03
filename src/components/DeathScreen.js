import React from "react";
import "../styles/DeathScreen.css";
import { useNavigate } from "react-router-dom";

const getDeathDescription = (cause) => {
  const energyMessages = [
    "You fell asleep during your final presentation... at least you got some rest!",
    "Your body finally gave up after that 10th energy drink",
    "Turns out humans actually need sleep to survive. Who knew?",
    "You became one with your bed and never got up again",
  ];

  const mentalHealthMessages = [
    "You spent so much time doom scrolling, you forgot to scroll through your textbook",
    "Your brain went on permanent vacation without telling you",
    "You binged an entire series instead of studying... worth it though?",
    "Your stress level reached new heights - literally off the charts!",
  ];

  const academicMessages = [
    "You flunked out... don't worry, you'll be able to write a book about it in 20 years",
    "Your GPA dropped so low it found oil",
    "Turns out attending class occasionally is actually important",
    "Your professor's disappointment was immeasurable",
  ];

  const socialLifeMessages = [
    "You became a hermit and forgot how to talk to people",
    "Your only friend became your laptop... and it blue-screened on you",
    "You ghosted so many people, they started calling you Casper",
    "Your social battery died and couldn't find a charger",
  ];

  switch (cause) {
    case "energy":
      return energyMessages[Math.floor(Math.random() * energyMessages.length)];
    case "mentalHealth":
      return mentalHealthMessages[
        Math.floor(Math.random() * mentalHealthMessages.length)
      ];
    case "academics":
      return academicMessages[
        Math.floor(Math.random() * academicMessages.length)
      ];
    case "socialLife":
      return socialLifeMessages[
        Math.floor(Math.random() * socialLifeMessages.length)
      ];
    default:
      return "You somehow managed to break the game... impressive!";
  }
};

function DeathScreen({ deathCause }) {
  const navigate = useNavigate();
  const restartGame = () => {
    navigate("/");
  };
  return (
    <div id="death-box">
      <div id="death-title">You died 🪦</div>
      <div id="death-message">{getDeathDescription(deathCause)}</div>
      <button className="restart-button" onClick={restartGame}>
        Restart Game
      </button>
    </div>
  );
}

export default DeathScreen;
