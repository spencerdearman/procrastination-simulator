import React from "react";
import { useGame } from "../game-context/GameContext";
import "styles/Calendar.css";
import TaskBlock from "./TaskBlock";
import '../styles/Calendar.css';
import '../styles/Notification.css';

export default function Calendar() {
  const gameContext = useGame();
  const plannedTasks = gameContext.getPlannedTasks();
  const formatHour = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}${period}`;
  };

  return (
    <div id="calendar-container" className="calendar">
      <div id="calendar" className="hours-container">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="time-block">
            <div className="hours">{formatHour(i)}</div>
            <div
              className="slot"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                try {
                  const taskData = JSON.parse(
                    e.dataTransfer.getData("application/json"),
                  );
                  gameContext.logicPlanTask(taskData, i);
                  console.log(`Dropped task "${taskData.name}" at hour ${i}`);
                } catch (error) {
                  console.error("Error handling drop:", error);
                }
              }}
            >
              {plannedTasks
                .filter((task) => new Date(task.startTime).getHours() === i)
                .map((task, index) => (
                  <TaskBlock
                    key={`${task.name}-${index}`}
                    task={task}
                    draggable={false}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
