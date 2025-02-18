import React, { useState, useEffect } from "react";
import Player from "./classes/Player";
import Day from "./classes/Day";
import Logic from "./classes/Logic";
import Task from "./classes/Task";
import PlayerStats from "./components/PlayerStats";
import TimeView from "./components/TimeView";
import Time from "./classes/Time";

// Dummy JSON data for tasks
const dummyTaskData = [
  {
    name: "Study for Exam",
    category: "academic",
    description: "Study for the upcoming exam",
    icon: "",
    duration: 1,
    attributeImpacts: {
      academics: 10,
      socialLife: 0,
      energy: -20,
      mentalHealth: 0,
    },
    difficulty: 2,
  },
  {
    name: "Go to the Gym",
    category: "social",
    description: "Work out at the gym",
    icon: "",
    duration: 1,
    attributeImpacts: {
      academics: 0,
      socialLife: 0,
      energy: -30,
      mentalHealth: 10,
    },
    difficulty: 3,
  },
];

// Function to parse JSON data into Task instances
function parseTasks(taskDataArray) {
  return taskDataArray.map((data) => {
    const task = new Task(data.name);
    task.setCategory(data.category);
    task.description = data.description;
    task.icon = data.icon;
    task.duration = data.duration;
    for (let key in data.attributeImpacts) {
      task.setAttributeImpacts(key, data.attributeImpacts[key]);
    }
    task.difficulty = data.difficulty;
    return task;
  });
}

export function App() {
  const [player] = useState(new Player("Player 1"));
  const [day] = useState(new Day());
  const [logic] = useState(new Logic(player, [day]));
  const [time] = useState(new Time(30));
  const [completedTasks, setCompletedTasks] = useState([]);
  const [gameTime, setGameTime] = useState(time.getCurrentGameTime());

  useEffect(() => {
    // Seed the player if tasks are not already added
    if (day.tasks.length === 0) {
      logic.seedPlayer({
        academics: 100,
        socialLife: 100,
        energy: 100,
        mentalHealth: 100,
      });
      console.log("Initial Player Attributes:", player.getAllAttributes());

      // Parse tasks from the dummy JSON and add them to the day
      const parsedTasks = parseTasks(dummyTaskData);
      parsedTasks.forEach((task) => {
        day.addTask(task);
        // Optionally, start and complete the task as needed:
        task.startTask();
        task.completeTask(player.attributes);
      });
      day.updateCompleted();
      logic.endDay();

      console.log(
        "Completed Tasks:",
        day.completedTasks.map((t) => t.name),
      );
      console.log("Player Attributes After Day:", player.getAllAttributes());

      // Update React state so the UI re-renders
      setCompletedTasks([...day.completedTasks]);
    }
  }, []); // Run once on mount

  // Set up an interval to update game time (if desired)
  useEffect(() => {
    const interval = setInterval(() => {
      setGameTime(time.getCurrentGameTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <div className="App p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Game - Day Test</h1>
      <p className="text-lg font-semibold mb-4">Player Name: {player.name}</p>
      <PlayerStats attributes={player.attributes} />
      <TimeView time={time} currentGameTime={gameTime} />
      <p className="text-lg font-semibold mt-4">Completed Tasks:</p>
      {completedTasks.length > 0 ? (
        completedTasks.map((task, index) => (
          <p key={index} className="text-base">
            - {task.name}
          </p>
        ))
      ) : (
        <p className="text-base text-gray-500">No tasks completed yet.</p>
      )}
    </div>
  );
}

export default App;

// function App() {
//   const [currentDate, setCurrentDate] = useState("Tuesday");

//   const changeDate = (newDate) => {
//     setCurrentDate(newDate);
//   };

//   return (
//     <div id="container">
//       <div id="main">
//         <div id="header">
//           <div id="time">
//             <button
//               className="time-button"
//               onClick={() => changeDate("Monday")}
//             >
//               &lt;
//             </button>
//             <div className="date-wrapper">
//               <p className="current-date">{currentDate}</p>
//               <p>, February 11</p>
//             </div>
//             <button
//               className="time-button"
//               onClick={() => changeDate("Wednesday")}
//             >
//               &gt;
//             </button>
//           </div>
//           <div id="play-button">
//             <button className="control-button">⏪</button>
//             <button className="control-button">▶️</button>
//             <button className="control-button">⏩</button>
//           </div>
//         </div>
//         <div id="calendar">
//           {[...Array(13)].map((_, index) => (
//             <div key={index} className="time-block"></div>
//           ))}
//         </div>
//       </div>
//       <div id="sidebar">
//         <div id="stats">
//           <p className="side-bar-header">Your Stats</p>
//           <div id="stats-block">
//             <div className="div-academics">
//               <p className="side-bar-subheading">Academics</p>
//               <div className="stats-bar sb-academics"></div>
//               <div className="stats-bar-fill academics-color sb-academics"></div>
//               <div className="stats-score">9/100</div>
//             </div>
//             <div className="div-social-life">
//               <p className="side-bar-subheading">Social Life</p>
//               <div className="stats-bar sb-social-life"></div>
//               <div className="stats-bar-fill social-life-color sb-social-life"></div>
//               <div className="stats-score">9/100</div>
//             </div>
//             <div className="div-energy">
//               <p className="side-bar-subheading">Energy</p>
//               <div className="stats-bar sb-energy"></div>
//               <div className="stats-bar-fill energy-color sb-energy"></div>
//               <div className="stats-score">9/100</div>
//             </div>
//             <div className="div-mental-health">
//               <p className="side-bar-subheading">Mental Health</p>
//               <div className="stats-bar sb-mental-health"></div>
//               <div className="stats-bar-fill mental-health-color sb-mental-health"></div>
//               <div className="stats-score">9/100</div>
//             </div>
//           </div>
//         </div>
//         <div id="tasks-container">
//           <div id="tasks-list">
//             <div className="task-block" id="task1">
//               <h2>Write Essay</h2>
//               <p>info about this specific task</p>
//             </div>
//             <div className="task-block" id="task2">
//               <h2>Eat Food</h2>
//               <p>yum</p>
//             </div>
//             <div className="task-block" id="task3">
//               <h2>Sleep</h2>
//               <p>zzz</p>
//             </div>
//             <div className="task-block" id="task4">
//               <h2>Another Task</h2>
//               <p>info</p>
//             </div>
//             <div className="task-block" id="task5">
//               <h2>Another Task</h2>
//               <p>info</p>
//             </div>
//             <div className="task-block" id="task6">
//               <h2>Another Task</h2>
//               <p>info</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
