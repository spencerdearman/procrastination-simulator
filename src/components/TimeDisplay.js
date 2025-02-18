import React from "react";

function TimeDisplay({ currentDate }) {
  return (
    <div id="time">
      <button className="time-button">&lt;</button>
      <div className="date-wrapper">
        <p className="current-date">{currentDate}</p>
        <p>, February 11</p>
      </div>
      <button className="time-button">&gt;</button>
    </div>
  );
}

export default TimeDisplay;
