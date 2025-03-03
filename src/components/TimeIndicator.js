import { useEffect, useRef, useState } from "react";
import { useGame } from "../game-context/GameContext";

function TimeIndicator() {
  const [position, setPosition] = useState(0);
  const indicatorRef = useRef(null);
  const { currentTime, mode } = useGame();
  const lastUpdateTimeRef = useRef(null);

  useEffect(() => {
    if (!currentTime) return;

    const updateTimeIndicator = () => {
      const gameTime = currentTime.getCurrentGameTime();
      //console.log(gameTime);
      lastUpdateTimeRef.current = gameTime;

      const totalMinutes = gameTime.getHours() * 60 + gameTime.getMinutes();
      const percentageOfDay = (totalMinutes / (24 * 60)) * 100;

      const calendarContainer = document.getElementById("calendar-container");
      if (!calendarContainer || !indicatorRef.current) return;

      const containerRect = calendarContainer.getBoundingClientRect();
      const scrollTop = calendarContainer.scrollTop;

      const calendarHeight =
        document.querySelector(".hours-container").scrollHeight;
      const pixelPosition = (calendarHeight * percentageOfDay) / 100;

      if (
        pixelPosition >= scrollTop &&
        pixelPosition <= scrollTop + containerRect.height
      ) {
        const adjustedPosition =
          containerRect.top + (pixelPosition - scrollTop);
        setPosition(adjustedPosition);
        if (indicatorRef.current) {
          indicatorRef.current.style.display = "block";
        }
      } else {
        if (indicatorRef.current) {
          indicatorRef.current.style.display = "none";
        }
      }

      // changge background color of passed time blocks
      const timeBlocks = document.querySelectorAll(".time-block");
      timeBlocks.forEach((block, index) => {
        if (index < gameTime.getHours()) {
          block.classList.add("past");
        } else {
          block.classList.remove("past");
        }
      });
    };

    const calendarContainer = document.getElementById("calendar-container");
    if (!calendarContainer) return;
    calendarContainer.addEventListener("scroll", updateTimeIndicator);

    updateTimeIndicator();

    // TODO: deal with PAUSE mode
    const interval = setInterval(
      updateTimeIndicator,
      mode === "play" ? 100 : 1000,
    );

    return () => {
      clearInterval(interval);
      if (calendarContainer) {
        calendarContainer.removeEventListener("scroll", updateTimeIndicator);
      }
    };
  }, [currentTime, mode]);

  return (
    <div
      ref={indicatorRef}
      className="current-time-indicator"
      style={{ top: `${position}px` }}
    />
  );
}

export default TimeIndicator;
