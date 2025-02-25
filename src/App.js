import React, { useState } from "react";
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
import "./styles/WeekSummary.css"

function App() {
  const [currentDate, setCurrentDate] = useState("Tuesday");

  return (
    <WeekSummary/>
  );
}

export default App;
