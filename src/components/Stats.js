import { useGame } from "game-context/GameContext";
import React from "react";
import "../styles/Stats.css";

const Stats = () => {
  const { attributes } = useGame();

  if (!attributes) {
    console.error("Attributes missing");
    return <></>;
  }

  return (
    <div id="stats">
      <p className="side-bar-header">Your Stats</p>
      <div id="stats-block">
        <StatBar
          title="Academics"
          colorClass="academics"
          score={attributes.academics}
        />
        <StatBar
          title="Social Life"
          colorClass="social-life"
          score={attributes.socialLife}
        />
        <StatBar title="Energy" colorClass="energy" score={attributes.energy} />
        <StatBar
          title="Mental Health"
          colorClass="mental-health"
          score={attributes.mentalHealth}
        />
      </div>
    </div>
  );
};

function StatBar({ title, colorClass, score }) {
  const isLow = score < 10;

  return (
    <div className="stats-bar">
      <p className="side-bar-subheading">{title}</p>
      <div className="progress-container">
        <progress
          className={`stats-bar-fill ${colorClass} sb-${title.toLowerCase().replace(" ", "-")} ${isLow ? "flash-warning" : ""}`}
          value={score}
          max="100"
        ></progress>
        <label className={isLow ? "flash-warning" : ""}>{score}/100</label>
      </div>
    </div>
  );
}

export default Stats;
