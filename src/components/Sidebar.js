import React from "react";
import Stats from "./Stats";
import TaskList from "./TaskList";

function Sidebar({ attributes }) {
  return (
    <div id="sidebar">
      <Stats attributes={attributes} />
      <TaskList />
    </div>
  );
}

export default Sidebar;
