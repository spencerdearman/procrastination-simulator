import { StatIcons } from "components/Stats";
import React from "react";

export default function TaskStats({ attributes }) {
  const icons = {
    academics: StatIcons.ACADEMIC,
    socialLife: StatIcons.SOCIAL,
    energy: StatIcons.ENERGY,
    mentalHealth: StatIcons.MENTAL,
  };

  return (
    <div className="inline-block bg-gray-700 rounded-md pl-4 py-1 shadow-md">
      {Object.keys(attributes).map((key) => {
        const isNegative = attributes[key] < 0;
        if (attributes[key] !== 0)
          return (
            <p
              key={key}
              className={`inline-block mr-4 ${isNegative ? "text-red-500" : "text-green-500"}`}
            >
              {`${icons[key]} ${isNegative ? "↓" : "↑"}`}
            </p>
          );
        return <React.Fragment key={key}></React.Fragment>;
      })}
    </div>
  );
}
