import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import Time from "../classes/Time";
import Player from "../classes/Player";
import Task from "../classes/Task";
import taskData from '../data/taskData';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [player] = useState(new Player());
  const [time] = useState(new Time());
  const [currentTime, setCurrentTime] = useState(time.getCurrentGameTime());
  const [gameDay, setGameDay] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const initializeTasks = () => {
      if (tasks.length > 0) {
        console.log("Tasks already initialized, skipping...");
        return;
      }

      const shuffledTaskData = [...taskData].sort(() => Math.random() - 0.5);

      const parsedTasks = shuffledTaskData.map(data => {
        const task = new Task(data.name);
        task.id = data.id;
        task.setCategory(data.category);
        task.description = data.description;
        task.icon = data.icon;
        task.duration = data.duration;
        task.reusable = data.reusable || false;
        
        for (let key in data.attributeImpacts) {
          task.setAttributeImpacts(key, data.attributeImpacts[key]);
        }

        //console.log('Created task:', task.name, 'reusable:', task.reusable);
        return task;
      });

      setTasks(parsedTasks);
      console.log("Tasks initialized:", parsedTasks.length);
    };

    initializeTasks();
  }, []);

  const logicPlanTask = useCallback((taskData, hourIndex) => {
    console.log('logicPlanTask called with:', taskData, hourIndex);
    if (!taskData || hourIndex === undefined) {
      console.error('Invalid task or hour index');
      return;
    }

    // Find task by ID
    const originalTask = tasks.find(t => t.id === taskData.id);
    
    if (!originalTask) {
      console.error('Could not find matching task with ID:', taskData.id);
      return;
    }

    let taskToSchedule;
    if (originalTask.reusable) {
      // Create a new instance for reusable tasks
      taskToSchedule = new Task(originalTask.name);
      taskToSchedule.id = `${originalTask.id}-${Date.now()}`; // Unique ID
      taskToSchedule.setCategory(originalTask.category);
      taskToSchedule.description = originalTask.description;
      taskToSchedule.icon = originalTask.icon;
      taskToSchedule.duration = originalTask.duration;
      taskToSchedule.reusable = false; // The copy isn't reusable
      
      // Copy attribute impacts
      for (let key in originalTask.attributeImpacts) {
        taskToSchedule.setAttributeImpacts(key, originalTask.attributeImpacts[key]);
      }
    } else {
      taskToSchedule = originalTask;
    }

    const startTime = new Date(time.getCurrentGameTime());
    startTime.setHours(hourIndex, 0, 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + taskToSchedule.duration);

    taskToSchedule.setStartTime(startTime);
    taskToSchedule.setEndTime(endTime);

    if (originalTask.reusable) {
      // Add the new instance to the tasks array
      setTasks(prevTasks => {
        const newTasks = [...prevTasks, taskToSchedule];
        
        // Log task lists after update
        console.group('Task Lists After Assignment');
        console.log('Planned Tasks:', newTasks
          .filter(t => t.startTime)
          .map(t => ({
            id: t.id,
            name: t.name,
            startTime: t.startTime,
            reusable: t.reusable
          }))
        );
        console.log('Unplanned Tasks:', newTasks
          .filter(t => !t.startTime || t.reusable)
          .map(t => ({
            id: t.id,
            name: t.name,
            reusable: t.reusable
          }))
        );
        console.groupEnd();
        
        return newTasks;
      });
    } else {
      // Update the original task
      setTasks(prevTasks => {
        const newTasks = [...prevTasks];
        
        // Log task lists after update
        console.group('Task Lists After Assignment');
        console.log('Planned Tasks:', newTasks
          .filter(t => t.startTime)
          .map(t => ({
            id: t.id,
            name: t.name,
            startTime: t.startTime,
            reusable: t.reusable
          }))
        );
        console.log('Unplanned Tasks:', newTasks
          .filter(t => !t.startTime || t.reusable)
          .map(t => ({
            id: t.id,
            name: t.name,
            reusable: t.reusable
          }))
        );
        console.groupEnd();
        
        return newTasks;
      });
    }
    
    console.log('Task planned:', taskToSchedule.name, 'Start:', startTime, 'End:', endTime);
  }, [tasks, time]);

  const getUnplannedTasks = useCallback(() => {
    const unplannedTasks = tasks.filter(task => {
      const shouldShow = !task.startTime || task.reusable;
      //console.log('Task:', task.name, 'startTime:', task.startTime, 'reusable:', task.reusable, 'showing:', shouldShow);
      return shouldShow;
    });
    console.log('Unplanned tasks:', unplannedTasks.length);
    return unplannedTasks;
  }, [tasks]);

  const getPlannedTasks = useCallback(() => {
    return tasks.filter(task => task.startTime);
  }, [tasks]);

  const value = useMemo(() => ({
    player,
    time,
    currentTime,
    gameDay,
    tasks,
    notifications,
    logicPlanTask,
    getUnplannedTasks,
    getPlannedTasks,
  }), [
    player,
    time,
    currentTime,
    gameDay,
    tasks,
    notifications,
    logicPlanTask,
    getUnplannedTasks,
    getPlannedTasks
  ]);

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;