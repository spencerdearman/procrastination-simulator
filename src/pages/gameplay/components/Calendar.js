import React, { useEffect, useState } from "react";
import { useGame } from "game-context/GameContext";
import "styles/Calendar.css";
import TaskBlock from "./TaskBlock";
import "styles/Calendar.css";
import "styles/Notification.css";
import TimeIndicator from "./TimeIndicator";

export default function Calendar({ draggedTaskGhostRef }) {
  const gameContext = useGame();
  const [plannedTasks, setPlannedTasks] = useState();
  const formatHour = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}${period}`;
  };

  useEffect(() => {
    setPlannedTasks(gameContext.tasks.filter((task) => task.startTime));
  }, [gameContext.tasks]);

  const handleDragOver = (e, i) => {
    e.preventDefault();
    if (!draggedTaskGhostRef.current) return;

    if (gameContext.canPlanTask(i)) {
      draggedTaskGhostRef.current.classList.remove("invalid");
    } else {
      draggedTaskGhostRef.current.classList.add("invalid");
    }
  };

  const handleDrop = (e, i) => {
    e.preventDefault();
    try {
      const taskData = JSON.parse(e.dataTransfer.getData("application/json"));
      gameContext.logicPlanTask(taskData, i);

      //Adding audio
      const taskPlacedSound = new Audio("/sound/new_task.mp3");
      taskPlacedSound.volume = 0.5; // Adjust volume as needed
      taskPlacedSound.play();
    } catch (error) {
      console.error("Error handling drop:", error);
    } finally {
      // Cleanup on unmount
      if (draggedTaskGhostRef.current) {
        if (draggedTaskGhostRef.current.dragHandler) {
          document.removeEventListener(
            "drag",
            draggedTaskGhostRef.current.dragHandler,
          );
        }
        draggedTaskGhostRef.current.remove();
        draggedTaskGhostRef.current = null;
      }
    }
  };

  return (
    <div id="calendar-container" className="calendar">
      {gameContext.currentTime && (
        <TimeIndicator currentTime={gameContext.currentTime} />
      )}
      <div id="calendar" className="hours-container">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="time-block">
            <div className="hours">{formatHour(i)}</div>
            <div
              className="slot"
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
            >
              {plannedTasks &&
                (() => {
                  const task = plannedTasks.find(
                    (task) => new Date(task.startTime).getHours() === i,
                  );
                  return (
                    task && (
                      <TaskBlock
                        key={task.name}
                        task={task}
                        draggable={!task.locked}
                        draggedTaskGhostRef={draggedTaskGhostRef}
                      />
                    )
                  );
                })()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
