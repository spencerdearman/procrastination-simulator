import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Player from "./classes/Player";
import Day from "./classes/Day";
import Logic from "./classes/Logic";
import Task from "./classes/Task";
import PlayerStats from "./components/PlayerStats";

export function App() {
  const [player] = useState(new Player("Player 1"));
  const [day] = useState(new Day());
  const [logic] = useState(new Logic(player, [day]));

  logic.seedPlayer({
    academics: 90,
    socialLife: 80,
    energy: 85,
    mentalHealth: 95,
  });
  console.log("Initial Player Attributes:", player.getAllAttributes());

  const task1 = new Task("Study for Exam");
  task1.setCategory("academic");
  task1.setAttributeImpacts("academics", 10);
  day.addTask(task1);

  const task2 = new Task("Social Meetup");
  task2.setCategory("social");
  task2.setAttributeImpacts("socialLife", 15);
  day.addTask(task2);

  console.log(
    "Tasks for the Day:",
    day.tasks.map((t) => t.name),
  );

  task1.startTask();
  task1.completeTask(player.attributes);
  task2.startTask();
  task2.completeTask(player.attributes);

  logic.endDay();
  console.log("Player Attributes After Day:", player.getAllAttributes());

  return (
    <div className="App p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
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
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
