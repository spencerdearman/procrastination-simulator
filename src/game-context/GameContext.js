// GameContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Time from "../classes/Time";
import Player from "../classes/Player";
import Task from "../classes/Task";
import Notification from "../classes/Notification";
import Day from "../classes/Day";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState(new Player("Player1"));
  const [time, setTime] = useState(new Time());
  const [day, setDay] = useState(new Day());
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(time.getCurrentGameTime());

  // === Game Loop: Update Game Time Every Second ===
  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = time.getCurrentGameTime();
      setCurrentTime(updatedTime);
      checkForOverdueTasks(updatedTime);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, tasks]);

  // === Task Management ===
  const addTask = (taskName) => {
    const newTask = new Task(taskName);
    day.addTask(newTask);
    setTasks([...day.tasks]);
  };

  const startNewDay = () => {
    const newDay = new Day();
    setDay(newDay);
    setTasks([]);
    setNotifications([]);
  };

  const completeTask = (task) => {
    task.completeTask(player.attributes);
    day.updateCompleted();
    setPlayer(new Player(player.name));
    setTasks([...day.tasks]);
  };

  const abortTask = (task) => {
    task.abortTask();
    setTasks([...day.tasks]);
  };

  const updatePlayerAttribute = (attribute, value) => {
    player.addPoints(attribute, value);
    setPlayer(new Player(player.name)); // Refresh state
  };

  const resetPlayerAttributes = () => {
    player.resetAttributes();
    setPlayer(new Player(player.name));
  };

  // === Notification Management ===
  const addNotification = (notification) => {
    day.addNotification(notification);
    setNotifications([...day.notifications]);
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleNotificationDecision = (notification, decision) => {
    notification.handleDecision(decision, player.attributes);
    setPlayer(new Player(player.name));
    dismissNotification(notification.id);
  };

  const rescheduleTask = (task, newStartTime) => {
    task.changeTime(newStartTime);
    setTasks([...day.tasks]);
  };

  const setTaskOptional = (task, isOptional) => {
    task.setOptional(isOptional);
    setTasks([...day.tasks]);
  };

  const setTaskMovable = (task, isMovable) => {
    task.setMovable(isMovable);
    setTasks([...day.tasks]);
  };

  // === Check for Overdue Tasks ===
  const checkForOverdueTasks = (currentTime) => {
    tasks.forEach((task) => {
      if (task.isOverdue(currentTime) && task.getStatus() !== "COMPLETE") {
        const overdueNotification = new Notification(
          "Task Overdue!",
          `The task \"${task.name}\" is overdue.`,
          "⏰",
        );
        addNotification(overdueNotification);
      }
    });
  };

  // === Day-End Logic ===
  const endDay = () => {
    day.updateCompleted();
    day.updateRollover();
    setTasks([...day.rollover]);
    setPlayer(new Player(player.name));
  };

  // === Time control ===
  const setGameTime = (newGameTime) => {
    time.setCurrentGameTime(newGameTime);
    setCurrentTime(time.getCurrentGameTime());
  };

  const resetGameTime = () => {
    time.resetGameTime();
    setCurrentTime(time.getCurrentGameTime());
  };

  const changeGameSpeed = (newSpeed) => {
    time.setSpeedMultiplier(newSpeed);
    setCurrentTime(time.getCurrentGameTime());
  };

  const updateTimeScale = (newScale) => {
    time.setScale(newScale);
    setCurrentTime(time.getCurrentGameTime());
  };

  return (
    <GameContext.Provider
      value={{
        player,
        tasks,
        time,
        day,
        currentTime,
        notifications,
        addTask,
        completeTask,
        abortTask,
        addNotification,
        dismissNotification,
        handleNotificationDecision,
        endDay,
        setGameTime,
        resetGameTime,
        changeGameSpeed,
        updateTimeScale,
        rescheduleTask,
        setTaskOptional,
        setTaskMovable,
        updatePlayerAttribute,
        resetPlayerAttributes,
        startNewDay,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
