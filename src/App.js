import React from "react";
import WeekSummary from "./components/WeekSummary";
import StartPage from "./components/StartPage";
import Tutorial from "./components/Tutorial";
import "./styles/Calendar.css";
import "./styles/global.css";
import "./styles/Header.css";
import "./styles/PlayControls.css";
import "./styles/Notification.css";
import "./styles/Sidebar.css";
import "./styles/Stats.css";
import "./styles/TaskList.css";
import "./styles/Tutorial.css";
import "./styles/WeekSummary.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Gameplay from "pages/gameplay/Gameplay";
import { GameProvider } from "./game-context/GameContext";
import GameOver from "pages/GameOver";

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game/tutorial" element={<Tutorial />} />
        <Route path="/game/calendar" element={<Gameplay />} />
        <Route path="/game/end-of-day" element={<h1>End of day</h1>} />
        <Route path="/game/end-of-week" element={<h1>End of week</h1>} />
        <Route path="/game/game-over" element={<GameOver />} />
        <Route path="/game/week-summary" element={<WeekSummary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </GameProvider>
  );
}

export default App;
