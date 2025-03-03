import { useState, useEffect } from "react";
import { useGame } from "game-context/GameContext";
import Calendar from "components/Calendar";
import Header from "components/Header";
import NotificationsList from "components/Notifications";
import Sidebar from "components/Sidebar";
import TickingSound from "components/TickingSound";
import PlayerStats from "components/PlayerStats";
import Time from "classes/Time";
import Player from "classes/Player";
import Day from "classes/Day";
import Logic from "classes/Logic";
import "styles/Calendar.css";
import "styles/global.css";
import "styles/Header.css";
import "styles/PlayControls.css";
import "styles/Notification.css";
import "styles/Sidebar.css";
import "styles/Stats.css";
import "styles/TaskList.css";

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
      socialLife: 10,
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
    locked: true,
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
  const {
    mode,
    notifications,
    handleAcceptNotification,
    handleRejectNotification,
  } = useGame();
  const [currentDate, setCurrentDate] = useState("Tuesday");
  const [time] = useState(new Time(60));
  const [player] = useState(new Player("Player 1"));
  const [day] = useState(new Day());
  const [logic] = useState(new Logic(player, [day], time));
  const [completedTasks, setCompletedTasks] = useState([]);
  const [gameTime, setGameTime] = useState(time.getCurrentGameTime());

  useEffect(() => {
    if (day.tasks.length === 0) {
      logic.startGame(dummyTaskData);
      setCompletedTasks([...logic.currentDay.completedTasks]);
    }
  }, [day, logic]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = time.getCurrentGameTime();
      setGameTime(updatedTime);
      setCompletedTasks([...logic.currentDay.completedTasks]);
      logic.checkAndTriggerNotification(updatedTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [time, logic]);

  return (
    <div id="container">
      <NotificationsList
        notifications={notifications}
        onAccept={handleAcceptNotification}
        onReject={handleRejectNotification}
      />
      <TickingSound />
      <div id="main">
        <Header mode={mode} />
        <Calendar />
      </div>
      <Sidebar />
      <PlayerStats attributes={player.getAllAttributes()} />
    </div>
  );
}
