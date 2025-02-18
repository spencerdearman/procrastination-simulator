import React, { useState } from "react";
import "./App.css";
// import { createRoot } from "react-dom/client";
// import Player from "./classes/Player";
// import Day from "./classes/Day";
// import Logic from "./classes/Logic";
// import Task from "./classes/Task";
// import PlayerStats from "./components/PlayerStats";

// export function App() {
//   const [player] = useState(new Player("Player 1"));
//   const [day] = useState(new Day());
//   const [logic] = useState(new Logic(player, [day]));

//   logic.seedPlayer({
//     academics: 90,
//     socialLife: 80,
//     energy: 85,
//     mentalHealth: 95,
//   });
//   console.log("Initial Player Attributes:", player.getAllAttributes());

//   const task1 = new Task("Study for Exam");
//   task1.setCategory("academic");
//   task1.setAttributeImpacts("academics", 10);
//   day.addTask(task1);

//   const task2 = new Task("Social Meetup");
//   task2.setCategory("social");
//   task2.setAttributeImpacts("socialLife", 15);
//   day.addTask(task2);

//   console.log(
//     "Tasks for the Day:",
//     day.tasks.map((t) => t.name),
//   );

//   task1.startTask();
//   task1.completeTask(player.attributes);
//   task2.startTask();
//   task2.completeTask(player.attributes);

//   logic.endDay();
//   console.log("Player Attributes After Day:", player.getAllAttributes());

function App() {
  const [currentDate, setCurrentDate] = useState("Tuesday");
  return (
    <div id="container">
      <div id="main">
        <div id="header">
          <div id="time">
            <button className="time-button">&lt;</button>
            <div className="date-wrapper">
              <p className="current-date">{currentDate}</p>
              <p>, February 11</p>
            </div>
            <button className="time-button">&gt;</button>
          </div>
          <div id="play-button">
            {/* replace with actual buttons*/}
            <button className="control-button">⏪</button>
            <button className="control-button">▶️</button>
            <button className="control-button">⏩</button>
          </div>
        </div>
        <div id="calendar">
          {[...Array(13)].map((_, index) => (
            <div key={index} className="time-block"></div>
          ))}
        </div>
      </div>
      <div id="sidebar">
        <div id="stats">
          <p class="side-bar-header">Your Stats</p>

          <div id="stats-block">
            <div class="div-academics">
              <p class="side-bar-subheading">Academics</p>
              <div class="stats-bar sb-academics"></div>
              <div class="stats-bar-fill academics-color sb-academics"></div>
              <div class="stats-score">9/100</div>
            </div>
            <div class="div-social-life">
              <p class="side-bar-subheading">Social Life</p>
              <div class="stats-bar sb-social-life"></div>
              <div class="stats-bar-fill social-life-color sb-social-life"></div>
              <div class="stats-score">9/100</div>
            </div>
            <div class="div-energy">
              <p class="side-bar-subheading">Energy</p>
              <div class="stats-bar sb-energy"></div>
              <div class="stats-bar-fill energy-color sb-energy"></div>
              <div class="stats-score">9/100</div>
            </div>
            <div class="div-mental-health">
              <p class="side-bar-subheading">Mental Health</p>
              <div class="stats-bar sb-mental-health"></div>
              <div class="stats-bar-fill mental-health-color sb-mental-health"></div>
              <div class="stats-score">9/100</div>
            </div>
          </div>
        </div>
        <div id="tasks-container">
          <div id="tasks-list">
            <div className="task-block" id="task1">
              <h2>Write Essay</h2>
              <p>info about this specific task</p>
            </div>
            <div className="task-block" id="task2">
              <h2>Eat Food</h2>
              <p>yum</p>
            </div>
            <div className="task-block" id="task3">
              <h2>Sleep</h2>
              <p>zzz</p>
            </div>
            <div className="task-block" id="task4">
              <h2>Another Task</h2>
              <p>info</p>
            </div>
            <div className="task-block" id="task5">
              <h2>Another Task</h2>
              <p>info</p>
            </div>
            <div className="task-block" id="task6">
              <h2>Another Task</h2>
              <p>info</p>
            </div>
          </div>
        </div>
      </div>
    {/* <div className="App p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Game - Day Test</h1>
      <p className="text-lg font-semibold mb-4">Player Name: {player.name}</p>
      <PlayerStats attributes={player.attributes} />
      <p className="text-lg font-semibold mt-4">Completed Tasks:</p>
      {day.completedTasks.length > 0 ? (
        day.completedTasks.map((task, index) => (
          <p key={index} className="text-base">
            - {task.name}
          </p>
        ))
      ) : (
        <p className="text-base text-gray-500">No tasks completed yet.</p>
      )} */}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
