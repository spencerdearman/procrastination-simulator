import React from "react";
import Stats from "components/Stats";
import TaskList from "./TaskList";
import "styles/Sidebar.css";

function Sidebar({ draggedTaskGhostRef }) {
  return (
    <div id="sidebar">
      <Stats />
      <TaskList draggedTaskGhostRef={draggedTaskGhostRef} />
    </div>
  );
}

export default Sidebar;
