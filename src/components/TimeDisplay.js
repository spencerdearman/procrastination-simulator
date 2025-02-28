import { useGame } from "game-context/GameContext";
import React, { useEffect, useState } from "react";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function getDayOfWeek(currentTime) {
  const currentDay = currentTime.getCurrentGameTime().getDay();
  return days[currentDay];
}

export default function TimeDisplay() {
  const { currentTime } = useGame();
  const [dayOfWeek, setDayOfWeek] = useState(getDayOfWeek(currentTime), [
    currentTime,
  ]);

  useEffect(() => {
    const newDay = getDayOfWeek(currentTime);
    setDayOfWeek((prevDay) => (prevDay !== newDay ? newDay : prevDay));
  }, [currentTime]);

  return (
    <div id="time">
      <button className="time-button">&lt;</button>
      <div className="date-wrapper">
        <span className="current-date">{dayOfWeek}</span>
      </div>
      <button className="time-button">&gt;</button>
    </div>
  );
}
