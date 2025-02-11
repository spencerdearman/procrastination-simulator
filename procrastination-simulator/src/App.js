import React, { useState } from 'react';
import Player from './classes/Player';
import PlayerStats from './components/PlayerStats';

export function App() {
  const [player] = useState(new Player("Player 1"));

  console.log(player.attributes); // Debugging log to check if attributes exist

  return (
    <div className="App p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-2">Game</h1>
      <p className="text-lg font-semibold mb-4">Player Name: {player.name}</p>
      <PlayerStats attributes={player.attributes} />
    </div>
  );
}

export default App;