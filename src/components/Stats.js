import React from "react";

const Stats = ({ attributes }) => {
  if (!attributes) {
    console.log("Attributes missing");
  }

  return (
    <div id="stats">
      <p className="side-bar-header">Your Stats</p>
      <div id="stats-block">
        <StatBar
          title="Academics"
          colorClass="academics-color"
          score={attributes.academics}
        />
        <StatBar
          title="Social Life"
          colorClass="social-life-color"
          score={attributes.socialLife}
        />
        <StatBar
          title="Energy"
          colorClass="energy-color"
          score={attributes.energy}
        />
        <StatBar
          title="Mental Health"
          colorClass="mental-health-color"
          score={attributes.mentalHealth}
        />
      </div>
    </div>
  );
};

function StatBar({ title, colorClass, score }) {
  return (
    <div className={`div-${title.toLowerCase().replace(" ", "-")}`}>
      <p className="side-bar-subheading">{title}</p>
      <div className="progress-container">
        <progress
          className={`stats-bar-fill ${colorClass} sb-${title.toLowerCase().replace(" ", "-")}`}
          value={score}
          max="100"
        ></progress>
        <label>{score}/100</label>
      </div>
    </div>
  );
}

export default Stats;
