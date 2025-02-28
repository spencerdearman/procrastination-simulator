import React from "react";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotificationsList from "./components/Notifications";
import "./styles/Calendar.css";
import "./styles/global.css";
import "./styles/Header.css";
import "./styles/PlayControls.css";
import "./styles/Notification.css";
import "./styles/Sidebar.css";
import "./styles/Stats.css";
import "./styles/TaskList.css";
import WeekSummary from "./components/WeekSummary";
import "./styles/WeekSummary.css";
import { Routes, Route } from "react-router-dom";
import Gameplay from "pages/gameplay/Gameplay";

function App() {
  return (
    <Routes>
      <Route path="" element={<h1>Introduction</h1>} />
      <Route path="/game/tutorial" element={<h1>Tutorial</h1>} />
      <Route path="/game/calendar" element={<Gameplay />} />
      <Route path="/game/end-of-day" element={<h1>End of day</h1>} />
      <Route path="/game/end-of-week" element={<h1>End of week</h1>} />
      <Route
        path="*"
        element={<h1>Make sure this redirects to introduction</h1>}
      />
      <Route path="/game/week-summary" element={<WeekSummary />} />
    </Routes>
  );
}

export default App;
