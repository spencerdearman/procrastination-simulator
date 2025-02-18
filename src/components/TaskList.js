import React from "react";

function TaskList() {
  return (
    <div id="tasks-container">
      <div id="tasks-list">
        <TaskBlock
          id="task1"
          title="Write Essay"
          description="info about this specific task"
        />
        <TaskBlock id="task2" title="Eat Food" description="yum" />
        <TaskBlock id="task3" title="Sleep" description="zzz" />
        <TaskBlock id="task4" title="Another Task" description="info" />
        <TaskBlock id="task5" title="Another Task" description="info" />
        <TaskBlock id="task6" title="Another Task" description="info" />
      </div>
    </div>
  );
}

function TaskBlock({ id, title, description }) {
  return (
    <div className="task-block" id={id}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default TaskList;
