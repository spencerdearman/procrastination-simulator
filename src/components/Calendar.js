import React from "react";

// New TimeBlock component
const TimeBlock = ({ hour }) => {
  return (
    <div className="time-block">
      <div className="hours">{hour}</div>
      <div className="slot"></div>
    </div>
  );
};

function Calendar() {
  return (
    <div id="calendar-container">
      <div id="calendar">
        <TimeBlock hour="12AM" />
        <TimeBlock hour="1AM" />
        <TimeBlock hour="2AM" />
        <TimeBlock hour="3AM" />
        <TimeBlock hour="4AM" />
        <TimeBlock hour="5AM" />
        <TimeBlock hour="6AM" />
        <TimeBlock hour="7AM" />
        <TimeBlock hour="8AM" />
        <TimeBlock hour="9AM" />
        <TimeBlock hour="10AM" />
        <TimeBlock hour="11AM" />
        <TimeBlock hour="12PM" />
        <TimeBlock hour="1PM" />
        <TimeBlock hour="2PM" />
        <TimeBlock hour="3PM" />
        <TimeBlock hour="4PM" />
        <TimeBlock hour="5PM" />
        <TimeBlock hour="6PM" />
        <TimeBlock hour="7PM" />
        <TimeBlock hour="8PM" />
        <TimeBlock hour="9PM" />
        <TimeBlock hour="10PM" />
        <TimeBlock hour="11PM" />
      </div>
    </div>
  );
}

export default Calendar;
