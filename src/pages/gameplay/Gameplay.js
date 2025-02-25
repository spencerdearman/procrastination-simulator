import Calendar from "components/Calendar";
import Header from "components/Header";
import NotificationsList from "components/Notifications";
import Sidebar from "components/Sidebar";
import "styles/Calendar.css";
import "styles/global.css";
import "styles/Header.css";
import "styles/PlayControls.css";
import "styles/Notification.css";
import "styles/Sidebar.css";
import "styles/Stats.css";
import "styles/TaskList.css";
import { useState } from "react";

export default function Gameplay() {
  const [currentDate, setCurrentDate] = useState("Tuesday");

  return (
    <div id="container">
      <NotificationsList />
      <div id="main">
        <Header currentDate={currentDate} />
        <Calendar />
      </div>
      <Sidebar />
    </div>
  );
}
