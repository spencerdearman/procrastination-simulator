import React, { createContext, useState } from "react";
import Logic from "../classes/Logic";
import Player from "../classes/Player";
import Day from "../classes/Day";
import Time from "../classes/Time";

// Create a context for the game.
export const GameContext = createContext();

// The GameProvider sets up the shared game logic and exposes it to its children.
export const GameProvider = ({ children }) => {
  // Initialize the game logic only once.
  const [logic] = useState(() => {
    const time = new Time(60); // Shared Time instance
    const player = new Player("Player 1");
    const day = new Day();
    // Create the game logic with the shared instances.
    return new Logic(player, [day], time);
  });

  return (
    <GameContext.Provider value={{ logic }}>{children}</GameContext.Provider>
  );
};
