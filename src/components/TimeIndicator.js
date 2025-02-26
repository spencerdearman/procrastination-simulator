import { useEffect, useRef, useState } from "react";

function TimeIndicator() {
  const [position, setPosition] = useState(0);
  const indicatorRef = useRef(null);

  useEffect(() => {
    const updateTimeIndicator = () => {
      const now = new Date();
      console.log(now);
      const totalMinutes = now.getHours() * 60 + now.getMinutes();
      const percentageOfDay = (totalMinutes / (24 * 60)) * 100;
      console.log(percentageOfDay);

      const calendarContainer = document.getElementById("calendar-container");
      const containerRect = calendarContainer.getBoundingClientRect();
      const scrollTop = calendarContainer.scrollTop;
      const totalHeight = calendarContainer.scrollHeight - containerRect.height;

      const pixelPosition = (totalHeight * percentageOfDay) / 100;

      // only show indicator when it's within the visible calendar area
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

      // Update past blocks shading - not working rn
      const timeBlocks = document.querySelectorAll(".time-block");
      timeBlocks.forEach((block, index) => {
        const blockPosition = (index / timeBlocks.length) * 100;
        if (blockPosition < percentageOfDay) {
          block.classList.add("past");
        } else {
          block.classList.remove("past");
        }
      });
    };

    // handle scroll
    const calendarContainer = document.getElementById("calendar-container");
    calendarContainer.addEventListener("scroll", updateTimeIndicator);

    updateTimeIndicator();
    const interval = setInterval(updateTimeIndicator, 60000);

    return () => {
      clearInterval(interval);
      calendarContainer.removeEventListener("scroll", updateTimeIndicator);
    };
  }, []);

  return (
    <div
      ref={indicatorRef}
      className="current-time-indicator"
      style={{ top: `${position}px` }}
    />
  );
}

export default TimeIndicator;
