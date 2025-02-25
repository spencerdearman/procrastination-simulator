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

const dummyTaskData = [
  {
    name: "Study for Exam",
    category: "academic",
    description: "Study for the upcoming exam",
    icon: "",
    duration: 1,
    startTime: "2025-01-01T00:00:00",
    endTime: "2025-01-01T01:00:00",
    attributeImpacts: {
      academics: 10,
      socialLife: 0,
      energy: -20,
      mentalHealth: 0,
    },
    difficulty: 2,
  },
  {
    name: "Go to the Gym",
    category: "social",
    description: "Work out at the gym",
    icon: "",
    duration: 1,
    startTime: "2025-01-01T10:30:00",
    endTime: "2025-01-01T11:30:00",
    attributeImpacts: {
      academics: 0,
      socialLife: 0,
      energy: -30,
      mentalHealth: 10,
    },
    difficulty: 3,
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
    }, 1000);
    return () => clearInterval(interval);
  }, [time, logic]);

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
