import React, { useContext } from "react";
import { GameContext } from "../game-context/GameContext";

const DaySummary = () => {
  const { logic } = useContext(GameContext);
  const day = logic.currentDay;

  return (
    <div className="day-summary p-6 max-w-md mx-auto bg-gray-100 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Day Summary</h1>

      <section className="attribute-changes mb-6">
        <h2 className="text-xl font-semibold">Attribute Changes</h2>
        <ul className="list-disc ml-6">
          {Object.entries(day.attributeChanges).map(([attribute, change]) => (
            <li key={attribute}>
              {attribute}: {change}
            </li>
          ))}
        </ul>
      </section>

      <section className="completed-tasks mb-6">
        <h2 className="text-xl font-semibold">Completed Tasks</h2>
        {day.completedTasks.length > 0 ? (
          <ul className="list-disc ml-6">
            {day.completedTasks.map((task, index) => (
              <li key={index}>{task.name}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks completed.</p>
        )}
      </section>

      <section className="rollover-tasks">
        <h2 className="text-xl font-semibold">Tasks to Rollover</h2>
        {day.rollover.length > 0 ? (
          <ul className="list-disc ml-6">
            {day.rollover.map((task, index) => (
              <li key={index}>{task.name}</li>
            ))}
          </ul>
        ) : (
          <p>No tasks to rollover.</p>
        )}
      </section>
    </div>
  );
};

export default DaySummary;
