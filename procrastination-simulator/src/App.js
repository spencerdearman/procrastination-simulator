import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { GameContext} from'./game-context/GameContext';

//Registering the Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const data = {
  labels: ['Academics', 'Social Life', 'Energy', 'Mental Health'],
  datasets: [
    {
      label: 'Attributes',
      data: [50, 99, 66, 45], //Change the data to be data from the player's attributes
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

export function App() {
  return (
    <div className="App">
      <header className="App-header">      
        <p>
          Game
        </p>
        </header>
        <body>
        <div style={{ width: '20%' }}>
            <Radar data={data} />
        </div>
        </body>
      
    </div>
  );
}

export default App;
