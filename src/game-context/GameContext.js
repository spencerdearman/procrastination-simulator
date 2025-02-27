// GameContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Time from "../classes/Time";
import Player from "../classes/Player";
import Task from "../classes/Task";
import Notification from "../classes/Notification";
import Day from "../classes/Day";
import taskData from '../data/taskData'; // Import your task data

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [player, setPlayer] = useState(new Player("Player1"));
  const [time, setTime] = useState(new Time());
  const [day, setDay] = useState(new Day());
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(time.getCurrentGameTime());

  // Initialize tasks from task data
  useEffect(() => {
    const initializeTasks = () => {
      // Check if tasks are already initialized
      if (day.unplannedTasks.length > 0) {
        console.log("Tasks already initialized, skipping...");
        return;
      }

      // Shuffle the task data
      const shuffledTaskData = [...taskData].sort(() => Math.random() - 0.5);

      const parsedTasks = shuffledTaskData.map(data => {
        const task = new Task(data.name);
        task.setCategory(data.category);
        task.description = data.description;
        task.icon = data.icon;
        task.duration = data.duration;
        
        // Set attribute impacts
        for (let key in data.attributeImpacts) {
          task.setAttributeImpacts(key, data.attributeImpacts[key]);
        }

        return task;
      });

      setTasks(parsedTasks);
      // Add tasks to the current day
      parsedTasks.forEach(task => day.addTask(task));
      
      // Debug logs
      console.log("All tasks:", parsedTasks);
      console.log("Unplanned tasks:", day.unplannedTasks);
    };

    initializeTasks();
  }, []); // Empty dependency array - run once on mount

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
    const updatedPlayer = new Player({
      ...player,
      attributes: { ...player.attributes }
    });
    updatedPlayer.addPoints(attribute, value);
    setPlayer(updatedPlayer);
  };

  const resetPlayerAttributes = () => {
    const updatedPlayer = new Player({
      ...player,
      attributes: { ...player.attributes }
    });
    updatedPlayer.resetAttributes();
    setPlayer(updatedPlayer);
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

  const value = {
    player,
    time,
    currentTime,
    day,
    tasks,
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
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
