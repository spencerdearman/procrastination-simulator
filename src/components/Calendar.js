import React from "react";

function Calendar() {
  return (
    <div id="calendar">
      {[...Array(13)].map((_, index) => (
        <div key={index} className="time-block"></div>
      ))}
    </div>
  );
}

export default Calendar;
