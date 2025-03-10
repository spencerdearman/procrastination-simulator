import React from "react";

const PlayerStats = ({ attributes }) => {
  if (!attributes) {
    return <p className="text-red-500">No attributes found</p>;
  }

  return (
    <div className="p-4 border border-purple-300 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-2">Your Score</h2>
      <StatBar
        label="Academics"
        value={attributes.academics}
        color="bg-red-500"
      />
      <StatBar
        label="Social Life"
        value={attributes.socialLife}
        color="bg-yellow-500"
      />
      <StatBar label="Energy" value={attributes.energy} color="bg-green-500" />
      <StatBar
        label="Mental Health"
        value={attributes.mentalHealth}
        color="bg-blue-500"
      />
    </div>
  );
};

const StatBar = ({ label, value, color }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm font-semibold">
        <span>{label.toUpperCase()}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`${color} h-2.5 rounded-full`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default PlayerStats;
