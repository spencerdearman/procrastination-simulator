import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import Time from "../classes/Time";
import Player from "../classes/Player";
import Task from "../classes/Task";
import taskData from "../data/taskData";

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [attributes, setAttributes] = useState(Player.getInitialAttributes());
  const [currentTime, setCurrentTime] = useState(new Time());
  const [tasks, setTasks] = useState([]);
  const [notifications] = useState([]);

  useEffect(() => {
    const initializeTasks = () => {
      if (tasks.length > 0) {
        console.log("Tasks already initialized, skipping...");
        return;
      }

      const shuffledTaskData = [...taskData].sort(() => Math.random() - 0.5);

      const parsedTasks = shuffledTaskData.map((data) => {
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime.tick();
        return newTime;
      });
      setAttributes((prevAttributes) =>
        Player.decrementAttributes(prevAttributes),
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const logicPlanTask = useCallback(
    (taskData, hourIndex) => {
      console.log("logicPlanTask called with:", taskData, hourIndex);
      if (!taskData || hourIndex === undefined) {
        console.error("Invalid task or hour index");
        return;
      }

      // Find task by ID
      const originalTask = tasks.find((t) => t.id === taskData.id);

      if (!originalTask) {
        console.error("Could not find matching task with ID:", taskData.id);
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
          taskToSchedule.setAttributeImpacts(
            key,
            originalTask.attributeImpacts[key],
          );
        }
      } else {
        taskToSchedule = originalTask;
      }

      const startTime = new Date(currentTime.getCurrentGameTime());
      startTime.setHours(hourIndex, 0, 0, 0);

      const endTime = new Date(startTime);
      endTime.setHours(startTime.getHours() + taskToSchedule.duration);

      taskToSchedule.setStartTime(startTime);
      taskToSchedule.setEndTime(endTime);

      if (originalTask.reusable) {
        // Add the new instance to the tasks array
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks, taskToSchedule];
          return newTasks;
        });
      } else {
        // Update the original task
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          return newTasks;
        });
      }
    },
    [tasks, currentTime],
  );

  const getPlannedTasks = useCallback(() => {
    return tasks.filter((task) => task.startTime);
  }, [tasks]);

  const value = useMemo(
    () => ({
      attributes,
      currentTime,
      tasks,
      notifications,
      logicPlanTask,
      getPlannedTasks,
    }),
    [
      attributes,
      currentTime,
      tasks,
      notifications,
      logicPlanTask,
      getPlannedTasks,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export default GameProvider;
