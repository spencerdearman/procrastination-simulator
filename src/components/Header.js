import React from "react";
import "../styles/Header.css";
import TimeDisplay from "./TimeDisplay";
import PlayControls from "./PlayControls";

function Header({ currentDate }) {
  return (
    <div id="header">
      <TimeDisplay currentDate={currentDate} />
      <PlayControls />
    </div>
  );
}

export default Header;
