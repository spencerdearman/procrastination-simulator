import React from "react";
import Stats from "./Stats";
import TaskList from "./TaskList";

function Sidebar() {
  return (
    <div id="sidebar">
      <Stats />
      <TaskList />
    </div>
  );
}

export default Sidebar;
