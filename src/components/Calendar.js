import React from 'react';
import { useGame } from "../game-context/GameContext";
import TaskBlock from "./TaskBlock";

export default function Calendar() {
  const gameContext = useGame();
  const plannedTasks = gameContext.getPlannedTasks();

  return (
    <div id="calendar-container" className="calendar">
      <div id="calendar" className="hours-container">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="time-block"
            
          ><div className="hours">{`${i}:00`}</div>
           <div 
           className="slot"
           onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              try {
                const taskData = JSON.parse(e.dataTransfer.getData('application/json'));
                gameContext.logicPlanTask(taskData, i);
                console.log(`Dropped task "${taskData.name}" at hour ${i}`);
              } catch (error) {
                console.error('Error handling drop:', error);
              }
            }}
           >
            {plannedTasks
              .filter(task => new Date(task.startTime).getHours() === i)
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