import React from "react";
import "../styles/Header.css";
import TimeDisplay from "./TimeDisplay";
import PlayControls from "./PlayControls";
import { useGame } from "../game-context/GameContext";

function Header() {
  const { gameDay } = useGame();
  
  return (
    <div id="header">
      <TimeDisplay />
      <PlayControls />
    </div>
  );
}

export default Header;
