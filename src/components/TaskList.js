import React, { useEffect, useState } from "react";
import { useGame } from "../game-context/GameContext";
import TaskBlock from "./TaskBlock";
import "../styles/TaskList.css";

//this is the task list that will be used to display the tasks
export default function TaskList() {
  const { tasks } = useGame();
  const [unplannedTasks, setUnplannedTasks] = useState(tasks);

  useEffect(() => {
    setUnplannedTasks(tasks.filter((task) => !task.startTime || task.reusable));
  }, [tasks]);

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
