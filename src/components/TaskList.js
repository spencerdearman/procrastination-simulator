import React from "react";
import { useGame } from "../game-context/GameContext";
import TaskBlock from "./TaskBlock";
import "../styles/TaskList.css";


//when the user drags the task, it will be added to the slot
const handleDragStart = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

//this is the task list that will be used to display the tasks
export default function TaskList() {
  const { getUnplannedTasks } = useGame();
  const unplannedTasks = getUnplannedTasks();

  return (
    <div className="task-list">
      <div className="tasks-container">
        {unplannedTasks.map((task, index) => (
          <TaskBlock
            key={`${task.name}-${index}`}
            task={task}
            draggable={true}
          />
        ))}
      </div>
    </div>
  );
}

//this is the task block that will be used to display the task
