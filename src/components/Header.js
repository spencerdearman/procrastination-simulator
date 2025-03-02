import React from "react";
import "../styles/Header.css";
import TimeDisplay from "./TimeDisplay";
import PlayControls from "./PlayControls";
import { GameState } from "game-context/GameContext";

function Header({ mode }) {
  return (
    <div id="header">
      <TimeDisplay />
      {mode === GameState.PAUSED && <PlayControls />}
    </div>
  );
}

export default Header;
