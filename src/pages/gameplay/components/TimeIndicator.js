import { DEFAULT_SPEED } from "classes/Time";
import { useEffect, useRef, useState } from "react";
import { GameState, useGame } from "game-context/GameContext";

function TimeIndicator({ currentTime }) {
  const [position, setPosition] = useState(0);
  const indicatorRef = useRef(null);
  const { mode } = useGame();
  const lastUpdateTimeRef = useRef(null);

  useEffect(() => {
    if (!currentTime) return;

    const gameTime = currentTime.getCurrentGameTime();
    lastUpdateTimeRef.current = gameTime;

    // change background color of passed time blocks
    const timeBlocks = document.querySelectorAll(".time-block");
    timeBlocks.forEach((block, index) => {
      if (index < gameTime.getHours()) {
        block.classList.add("past");
      } else {
        block.classList.remove("past");
      }
    });
  }, [currentTime, mode]);

  useEffect(() => {
    const calendarHeight =
      document.querySelector(".hours-container").scrollHeight;

    if (mode === GameState.PLAY) {
      setPosition(calendarHeight);
    }
  }, [mode]);

  return (
    <div
      ref={indicatorRef}
      className="current-time-indicator"
      style={{
        top: `${position}px`,
        transitionDuration: `${DEFAULT_SPEED * 24}s`,
      }}
    />
  );
}

export default TimeIndicator;
