import { useGame } from "game-context/GameContext";
import React from "react";
import TimeView from "./TimeView";

export default function TimeDisplay({ day }) {
  const { currentTime } = useGame();

  return (
    <div id="time">
      <button className="time-button">&lt;</button>
      <div className="date-wrapper">
        <span className="current-date">{day.getDayOfWeek()}</span>
        <TimeView time={currentTime} />
      </div>
      <button className="time-button">&gt;</button>
    </div>
  );
}
