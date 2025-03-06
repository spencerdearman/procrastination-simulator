import { useGame } from "game-context/GameContext";
import React from "react";
import "../styles/Stats.css";

export const StatIcons = Object.freeze({
  ACADEMIC: "📖",
  SOCIAL: "🍻",
  MENTAL: "😌",
  ENERGY: "⚡️",
});

const Stats = () => {
  const { attributes } = useGame();

  if (!attributes) {
    console.error("Attributes missing");
    return <></>;
  }

  return (
    <div id="stats">
      <div id="stats-block" className="border-2 border-blue-dark">
        <h3 className="side-bar-header">Your Stats</h3>
        <StatBar
          icon={StatIcons.ACADEMIC}
          title="Academics"
          colorClass="academics"
          score={attributes.academics}
        />
        <StatBar
          icon={StatIcons.SOCIAL}
          title="Social Life"
          colorClass="social-life"
          score={attributes.socialLife}
        />
        <StatBar
          icon={StatIcons.ENERGY}
          title="Energy"
          colorClass="energy"
          score={attributes.energy}
        />
        <StatBar
          icon={StatIcons.MENTAL}
          title="Mental Health"
          colorClass="mental-health"
          score={attributes.mentalHealth}
        />
      </div>
    </div>
  );
};

function StatBar({ icon, title, colorClass, score }) {
  const isLow = score < 10;

  return (
    <div className="stats-bar flex-1">
      <p className="side-bar-subheading">
        {icon} {title}
      </p>
      <div className="progress-container">
        <progress
          className={`stats-bar-fill ${colorClass} sb-${title.toLowerCase().replace(" ", "-")} ${isLow ? "flash-warning" : ""}`}
          value={score}
          max="100"
        ></progress>
        <label className={`min-w-[40px] ml-2 ${isLow ? "flash-warning" : ""}`}>
          {score}
        </label>
      </div>
    </div>
  );
}

export default Stats;
