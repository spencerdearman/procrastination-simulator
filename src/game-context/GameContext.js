import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import Time from "../classes/Time";
import Player from "../classes/Player";
import Logic from "../classes/Logic";
import Day from "../classes/Day";
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
  const [gameLogic, setGameLogic] = useState(null);
  const [attributes, setAttributes] = useState({});
  const [currentTime, setCurrentTime] = useState(new Time());
  const [tasks, setTasks] = useState([]);
  const [notifications] = useState([]);
  const navigate = useNavigate();

  // Initialize game logic
  useEffect(() => {
    const days = [new Day()]; // Start with one day, can add more as needed
    const player = new Player();
    const logic = new Logic(days, currentTime, player);
    setAttributes(logic.getAttributes());
    setGameLogic(logic);
  }, []);

  useEffect(() => {
    if (!gameLogic) return;

    const shuffledTaskData = [...taskData].sort(() => Math.random() - 0.5);
    const parsedTasks = gameLogic.parseTasks(shuffledTaskData);
    setTasks(parsedTasks);

    // Initialize the game with the parsed tasks
    gameLogic.startGame(shuffledTaskData);
    return () => {
      gameLogic.time.stopGameLoop();
    };
  }, [gameLogic]);

  useEffect(() => {
    if (!gameLogic) return;

    // Subscribe to time updates from the game logic
    const unsubscribe = gameLogic.time.subscribe((newTime) => {
      setCurrentTime(newTime);

      // Get updated attributes from game logic
      setAttributes(gameLogic.getAttributes());

      // Check for notifications
      gameLogic.checkAndTriggerNotification(newTime.getCurrentGameTime());
    });

    return () => {
      unsubscribe();
    };
  }, [gameLogic]);

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

  useEffect(() => {
    const isGameOver = Object.values(attributes).some((stat) => stat <= 0);
    if (isGameOver) {
      // TODO: Might have to update internal `Player` state before navigating to fail screen
      navigate("/game/game-over");
    }
  }, [attributes, navigate]);

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
