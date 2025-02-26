import React, { useState } from "react";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotificationsList from "./components/Notifications";
import WeekSummary from "./components/WeekSummary";
import Tutorial from "./components/Tutorial";
import "./styles/Calendar.css";
import "./styles/global.css";
import "./styles/Header.css";
import "./styles/PlayControls.css";
import "./styles/Notification.css";
import "./styles/Sidebar.css";
import "./styles/Stats.css";
import "./styles/TaskList.css";
// import "./styles/WeekSummary.css";

function App() {
  const [currentDate, setCurrentDate] = useState("Tuesday");

  return (
    <div id="container">
      {/* <NotificationsList /> */}
      <Tutorial />
      <div id="main">
        <Header currentDate={currentDate} />
        <Calendar />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;
