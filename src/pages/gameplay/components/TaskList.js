import React, { useEffect, useState } from "react";
import TaskBlock from "./TaskBlock";
import "styles/TaskList.css";
import { useGame } from "game-context/GameContext";

//this is the task list that will be used to display the tasks
export default function TaskList({ draggedTaskGhostRef, viewableTasks }) {
  const { mode } = useGame();
  return (
    <div className="task-list">
      <div className="tasks-container">
        {viewableTasks.map((task, index) => (
          <TaskBlock
            key={`${task.name}-${index}`}
            task={task}
            draggable={true}
            mode={mode}
            draggedTaskGhostRef={draggedTaskGhostRef}
          />
        ))}
      </div>
    </div>
  );
}
