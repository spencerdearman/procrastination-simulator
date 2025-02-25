import React from "react";

function Stats() {
  return (
    <div id="stats">
      <p className="side-bar-header">Your Stats</p>
      <div id="stats-block">
        <StatBar title="Academics" colorClass="academics-color" score="22" />
        <StatBar
          title="Social Life"
          colorClass="social-life-color"
          score="50"
        />
        <StatBar title="Energy" colorClass="energy-color" score="75" />
        <StatBar
          title="Mental Health"
          colorClass="mental-health-color"
          score="100"
        />
      </div>
    </div>
  );
}

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
