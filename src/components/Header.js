import React from "react";
import "../styles/Header.css";
import TimeDisplay from "./TimeDisplay";
import PlayControls from "./PlayControls";

function Header() {
  return (
    <div id="header">
      <TimeDisplay />
      <PlayControls />
    </div>
  );
}

export default Header;
