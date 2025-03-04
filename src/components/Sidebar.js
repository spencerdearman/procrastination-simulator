import React from "react";
import Stats from "./Stats";
import TaskList from "./TaskList";
import "../styles/Sidebar.css";

function Sidebar({ draggedTaskGhostRef }) {
  return (
    <div id="sidebar">
      <Stats />
      <TaskList draggedTaskGhostRef={draggedTaskGhostRef} />
    </div>
  );
}

export default Sidebar;
