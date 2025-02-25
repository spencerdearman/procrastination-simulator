import React from "react";

//when the user drags the task, it will be added to the slot
const handleDragOver = (e) => {
  e.preventDefault();
};

//when the user drops the task, it will be added to the slot
const handleDrop = (e) => {
  e.preventDefault();
  var data = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(data));

  // do more stuff here...
};

//this is the time block that will be used to display the time and the slot
const TimeBlock = ({ hour, droppable = true }) => {
  return (
    <div className="time-block">
      <div className="hours">{hour}</div>
      <div
        className={`slot ${!droppable ? "disabled" : ""}`}
        onDragOver={droppable ? handleDragOver : null}
        onDrop={droppable ? handleDrop : null}
      ></div>
    </div>
  );
};

//this is the calendar that will be used to display the time blocks and the slots
function Calendar() {
  //this is the time blocks that will be used to display the time and the slot
  const timeBlocks = Array.from({ length: 24 }, (_, index) => {
    const hour = index % 12 || 12; // Converts 0 to 12
    const period = index < 12 ? "AM" : "PM";
    return `${hour}${period}`;
  });

  return (
    <div id="calendar-container">
      <div id="calendar">
        {timeBlocks.map((hour) => (
          <TimeBlock key={hour} hour={hour} />
        ))}
      </div>
    </div>
  );
}

export default Calendar;
