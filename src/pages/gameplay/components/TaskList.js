import React, { useEffect, useState } from "react";
import TaskBlock from "./TaskBlock";
import "styles/TaskList.css";
import { useGame } from "game-context/GameContext";

//this is the task list that will be used to display the tasks
export default function TaskList({ draggedTaskGhostRef, viewableTasks }) {
  const { mode, unplanTask } = useGame();

  const handleDrop = (e) => {
    e.preventDefault();

    try {
      const taskData = JSON.parse(e.dataTransfer.getData("application/json"));
      unplanTask(taskData);
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
    <div className="overflow-hidden h-full" onDrop={handleDrop}>
      <div className="tasks-container overflow-y-scroll p-4 bg-[#fdf7dd] rounded-[15px] border-2 border-blue-dark">
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
