import { GameState, useGame } from "game-context/GameContext";
import React from "react";

function PlayControls() {
  const { setMode } = useGame();
  return (
    <div id="play-button">
      {/* <button className="control-button">⏪</button> */}
      <button
        onClick={() => setMode(GameState.PLAY)}
        className="control-button flashing"
      >
        ▶
      </button>
      {/* <button className="control-button">⏩</button> */}
    </div>
  );
}

export default PlayControls;
