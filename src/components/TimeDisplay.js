import React from "react";

export default function TimeDisplay({ day }) {
  return (
    <div id="time">
      <button className="time-button">&lt;</button>
      <div className="date-wrapper">
        <span className="current-date">{day.getDayOfWeek()}</span>
      </div>
      <button className="time-button">&gt;</button>
    </div>
  );
}
