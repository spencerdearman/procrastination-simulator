import React from "react";

//when the user drags the task, it will be added to the slot
const handleDragStart = (ev) => {
  ev.dataTransfer.setData("text", ev.target.id);
};

//this is the task list that will be used to display the tasks
function TaskList() {
  return (
    <div id="tasks-container">
      <div id="tasks-list">
        <TaskBlock id="task2" title="Clean Room" description="Your room is a literal pig sty that needs to be cleaned" type="mental" icon="🧹" />
        <TaskBlock id="task3" title="Sleep" description="zzz" type="energy" icon="💤" />
        <TaskBlock id="task4" title="Study Biology" description="Your midterm is next week and you know how that last one went..." type="academics" icon="📚" />
        <TaskBlock id="task5" title="Theater Rehearsal" description="It's time to go to theater rehearsal, you've got a play coming up soon!" type="social" icon="👯‍♀️" />
        <TaskBlock id="task6" title="Review an Art Crticism Article" description="Artists really love yapping..." type="academics" icon="🖼️" />
      </div>
    </div>
  );
}

//this is the task block that will be used to display the task
function TaskBlock({ id, title, description, type, icon }) {
  return (
    <div className={`task-block type-${type}`} id={id} draggable="true" onDragStart={handleDragStart}>
      <h2>{icon} {title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default TaskList;
