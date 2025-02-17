import React, { useState } from "react";
import "./App.css";

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
            <p>Play button goes here</p>
          </div>
        </div>
        <div id="calendar">
          {/* Render 12 time blocks */}
          {[...Array(13)].map((_, index) => (
            <div key={index} className="time-block"></div>
          ))}
        </div>
      </div>
      <div id="sidebar">
        <div id="stats">
          <p>stats: im dying rn help</p>
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
    </div>
  );
}

export default App;
