import React from "react";

function TimeDisplay({ currentDate }) {
  return (
    <div id="time">
      <button className="time-button">&lt;</button>
      <div className="date-wrapper">
        <span className="current-date">{currentDate}</span>
        {/* <span>, February 11</span> */}
      </div>
      <button className="time-button">&gt;</button>
    </div>
  );
}

export default TimeDisplay;
