import React from "react";
import { useGame } from "../game-context/GameContext";

export default function TimeDisplay() {
  const { time } = useGame();

  const getDayOfWeek = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = time.getCurrentGameTime().getDay();
    return days[currentDay];
  };

  return (
    <div id="time">
      <button className="time-button">&lt;</button>
      <div className="date-wrapper">
        <span className="current-date">{getDayOfWeek()}</span>
        {/* <span>, February 11</span> */}
      </div>
      <button className="time-button">&gt;</button>
    </div>
  );
}
