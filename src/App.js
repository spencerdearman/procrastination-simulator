import React from "react";
import WeekSummary from "./components/WeekSummary";
import StartPage from "./components/StartPage";
import Tutorial from "./components/Tutorial";
import "./styles/global.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Gameplay from "pages/gameplay/Gameplay";
import { GameProvider } from "./game-context/GameContext";
import GameOver from "pages/GameOver";
import EndOfDay from "pages/EndOfDay";
import EndOfWeek from "pages/EndOfWeek";

function App() {
  return (
    <GameProvider>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game/tutorial" element={<Tutorial />} />
        <Route path="/game/calendar" element={<Gameplay />} />
        <Route path="/game/end-of-day" element={<EndOfDay />} />
        <Route path="/game/end-of-week" element={<EndOfWeek />} />
        <Route path="/game/game-over" element={<GameOver />} />
        <Route path="/game/week-summary" element={<WeekSummary />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </GameProvider>
  );
}

export default App;
