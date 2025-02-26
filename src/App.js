// import React, { useState } from "react";
// import Gameplay from "pages/gameplay/Gameplay";

// function App() {
//   return <Gameplay />;
// }

// export default App;


// DONT PUSH THIS SHIT PLS <3
import React, { useState, useEffect } from "react";
import Player from "./classes/Player";
import Day from "./classes/Day";
import Logic from "./classes/Logic";
import PlayerStats from "./components/PlayerStats";
import TimeView from "./components/TimeView";
import Time from "./classes/Time";

// Dummy tasks for testing
const dummyTaskData = [
  {
    name: "Eat Lunch",
    category: "energy",
    description: "It's lunchtime...blah blah",
    icon: "🍽️",
    startTime: null,
    endTime: null,
    completed: false,
    locked: false,
    current: false,
    duration: 1,
    attributeImpacts: {
      academics: 0,
      socialLife: 10, // if you eat with people idk up to you
      energy: 40,
      mentalHealth: 0,
    },
  },
  {
    name: "Biology 101",
    category: "academic",
    description: "You failed that last exam so you should blah blah",
    icon: "🧑‍🔬",
    startTime: "2025-01-01T13:00:00",
    endTime: "2025-01-01T14:00:00",
    completed: false,
    locked: true, // NOTE MAKE ALL CLASSES LOCKED = TRUE
    current: false,
    duration: 1,
    attributeImpacts: {
      academics: 15,
      socialLife: 0,
      energy: -20,
      mentalHealth: 0,
    },
  },
];

export function App() {
  // Create a single shared Time instance.
  const [time] = useState(new Time(60));
  const [player] = useState(new Player("Player 1"));
  const [day] = useState(new Day());
  // Pass the shared Time instance into Logic.
  const [logic] = useState(new Logic(player, [day], time));
  const [completedTasks, setCompletedTasks] = useState([]);
  const [gameTime, setGameTime] = useState(time.getCurrentGameTime());

  // Start game on initial render if no tasks are present.
  useEffect(() => {
    console.log("about to call startGame");
    logic.startGame(dummyTaskData);
    setCompletedTasks([...logic.currentDay.completedTasks]);
  }, [day, logic]);

  // Poll for updated game time and completed tasks every second.
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = time.getCurrentGameTime();
      console.log("Updated Game Time:", updatedTime);
      setGameTime(updatedTime);
      setCompletedTasks([...logic.currentDay.completedTasks]);
    }, 1000);
    return () => clearInterval(interval);
  }, [time, logic]);

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
