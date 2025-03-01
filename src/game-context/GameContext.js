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
      if (!gameLogic || !taskData || hourIndex === undefined) {
        console.error("Invalid game logic, task or hour index");
        return;
      }

      const task = tasks.find((t) => t.id === taskData.id);
      if (!task) {
        console.error("Could not find matching task with ID:", taskData.id);
        return;
      }

      // Let the game logic handle task planning
      gameLogic.logicPlanTask(task, hourIndex);

      // Update React state to reflect changes
      setTasks([
        ...gameLogic.currentDay.tasks.filter(Boolean),
        ...gameLogic.currentDay.unplannedTasks,
      ]);
    },
    [gameLogic, tasks],
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
