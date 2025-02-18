import React from "react";

function Stats() {
  return (
    <div id="stats">
      <p className="side-bar-header">Your Stats</p>
      <div id="stats-block">
        <StatBar title="Academics" colorClass="academics-color" />
        <StatBar title="Social Life" colorClass="social-life-color" />
        <StatBar title="Energy" colorClass="energy-color" />
        <StatBar title="Mental Health" colorClass="mental-health-color" />
      </div>
    </div>
  );
}

function StatBar({ title, colorClass }) {
  return (
    <div className={`div-${title.toLowerCase().replace(" ", "-")}`}>
      <p className="side-bar-subheading">{title}</p>
      <div
        className={`stats-bar sb-${title.toLowerCase().replace(" ", "-")}`}
      ></div>
      <div
        className={`stats-bar-fill ${colorClass} sb-${title.toLowerCase().replace(" ", "-")}`}
      ></div>
      <div className="stats-score">9/100</div>
    </div>
  );
}

export default Stats;
