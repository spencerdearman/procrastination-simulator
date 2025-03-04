import React from "react";
import "../styles/Header.css";
import TimeDisplay from "./TimeDisplay";
import PlayControls from "./PlayControls";
import { GameState, useGame } from "game-context/GameContext";

function Header({ mode }) {
  const { day } = useGame();

  if (!day) return;

  return (
    <div id="header">
      <TimeDisplay day={day} />
      {mode === GameState.PAUSED && <PlayControls />}
    </div>
  );
}

export default Header;
