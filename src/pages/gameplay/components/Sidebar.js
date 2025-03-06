import React, { useState, useEffect } from "react";
import Stats from "components/Stats";
import TaskList from "./TaskList";
import "styles/Sidebar.css";
import TaskFilterBar from "./TaskFilterBar";
import { useGame } from "game-context/GameContext";

const getUnplannedTasks = (tasks) => {
  return tasks.filter((task) => !task.startTime || task.reusable);
};

function Sidebar({ draggedTaskGhostRef }) {
  const { tasks } = useGame();
  const [viewableTasks, setViewableTasks] = useState(getUnplannedTasks(tasks));
  const [filterPredicate, setFilterPredicate] = useState();

  useEffect(() => {
    setViewableTasks(
      getUnplannedTasks(tasks).filter(
        (t) => !filterPredicate || filterPredicate(t),
      ),
    );
  }, [tasks, filterPredicate]);

  return (
    <div id="sidebar">
      <Stats />
      <div className="overflow-y-scroll h-full w-full">
        <h3 className="text-3xl text-center">Tasks</h3>
        <TaskFilterBar setTaskFilterFunction={setFilterPredicate} />
        <TaskList
          draggedTaskGhostRef={draggedTaskGhostRef}
          viewableTasks={viewableTasks}
        />
      </div>
    </div>
  );
}

export default Sidebar;
