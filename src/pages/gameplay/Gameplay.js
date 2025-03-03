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
import { useState, useEffect } from "react";
import Time from "classes/Time";
import Player from "classes/Player";
import Day from "classes/Day";
import Logic from "classes/Logic";
import PlayerStats from "components/PlayerStats";

// Dummy tasks for testing
const dummyTaskData = [
  {
    name: "Eat Lunch",
    category: "energy",
    description: "It's lunchtime...blah blah",
    icon: "🍽️",
    startTime: null,
    endTime: null,
    completed: false,
    locked: false,
    current: false,
    duration: 1,
    attributeImpacts: {
      academics: 0,
      socialLife: 10, // if you eat with people idk up to you
      energy: 40,
      mentalHealth: 0,
    },
  },
  {
    name: "Biology 101",
    category: "academic",
    description: "You failed that last exam so you should blah blah",
    icon: "🧑‍🔬",
    startTime: "2025-01-01T13:00:00",
    endTime: "2025-01-01T14:00:00",
    completed: false,
    locked: true, // NOTE MAKE ALL CLASSES LOCKED = TRUE
    current: false,
    duration: 1,
    attributeImpacts: {
      academics: 15,
      socialLife: 0,
      energy: -20,
      mentalHealth: 0,
    },
  },
];

export default function Gameplay() {
  const [currentDate, setCurrentDate] = useState("Tuesday");
  // Create a single shared Time instance.
  const [time] = useState(new Time(60));
  const [player] = useState(new Player("Player 1"));
  const [day] = useState(new Day());
  // Pass the shared Time instance into Logic.
  const [logic] = useState(new Logic(player, [day], time));
  const [completedTasks, setCompletedTasks] = useState([]);
  const [gameTime, setGameTime] = useState(time.getCurrentGameTime());
  const [notifications, setNotifications] = useState([]);

  // Load notifications from JSON
  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await fetch("/notifications.json");
      const data = await response.json();
      logic.loadNotifications(data.notifications);
      setNotifications(logic.notificationsQueue); // 🆕 Sync state
    };
    fetchNotifications();
  }, [logic]);

  // Start game on initial render if no tasks are present.
  useEffect(() => {
    if (day.tasks.length === 0) {
      logic.startGame(dummyTaskData);
      setCompletedTasks([...logic.currentDay.completedTasks]);
    }
  }, [day, logic]);

  // Poll for updated game time and completed tasks every second.
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = time.getCurrentGameTime();
      console.log("Updated Game Time:", updatedTime);
      setGameTime(updatedTime);
      setCompletedTasks([...logic.currentDay.completedTasks]);
      logic.checkAndTriggerNotification(updatedTime); // Check notifications
      setNotifications([...logic.notificationsQueue]); // Update notification list
    }, 1000);
    return () => clearInterval(interval);
  }, [time, logic]);

  const handleAccept = () => {
    logic.acceptNotification();
    setNotifications([...logic.notificationsQueue]); // 🆕 Refresh after accept
  };

  const handleReject = () => {
    logic.rejectNotification();
    setNotifications([...logic.notificationsQueue]); // 🆕 Refresh after reject
  };

  return (
    <div id="container">
      <NotificationsList
        notifications={notifications}
        onAccept={handleAccept}
        onReject={handleReject}
      />
      <div id="main">
        <Header currentDate={currentDate} />
        <Calendar />
      </div>
      <Sidebar />
      <PlayerStats attributes={player.getAllAttributes()} />
    </div>
  );
}
