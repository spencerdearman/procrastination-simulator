import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Time from "../classes/Time";
import Player from "../classes/Player";
import Logic from "../classes/Logic";
import taskData from "../data/taskData";
import ToastNofication from "components/ToastNotification";

export const GameState = Object.freeze({
  PAUSED: "paused",
  PLAY: "play",
  COMPLETE: "COMPLETE",
});

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const [mode, setMode] = useState(GameState.PAUSED);
  const [gameLogic, setGameLogic] = useState(null);
  const [attributes, setAttributes] = useState({});
  const [currentTime, setCurrentTime] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [notifications] = useState([]);
  const [day, setDay] = useState(null);
  const navigate = useNavigate();

  // Initialize game logic
  useEffect(() => {
    const time = new Time();
    const player = new Player();
    const logic = new Logic(3, time, player);
    setCurrentTime(time);
    setAttributes(logic.getAttributes());
    setGameLogic(logic);
  }, []);

  useEffect(() => {
    setMode(GameState.PAUSED);
  }, [day]);

  useEffect(() => {
    if (!gameLogic) return;

    const shuffledTaskData = [...taskData].sort(() => Math.random() - 0.5);
    const parsedTasks = gameLogic.startGame(shuffledTaskData);
    setTasks(parsedTasks);

    return () => {
      gameLogic.endGame();
    };
  }, [gameLogic]);

  useEffect(() => {
    if (!gameLogic) return;
    if (mode === GameState.PAUSED) {
      // Do nothing since state is driven elsewhere (pausing inside of Logic.js and playing within <PlayControls />)
    } else if (mode === GameState.PLAY) {
      // Initialize the game with the parsed tasks
      gameLogic.beginDay();
    } else {
      // TODO: may have to navigate to another page here
    }
  }, [mode, gameLogic]);

  useEffect(() => {
    if (!gameLogic) return;
    setDay(gameLogic.getCurrentDay());

    // Subscribe to time updates from the game logic
    const unsubscribe = gameLogic.time.subscribe((newTime) => {
      setCurrentTime(newTime);

      // Get updated attributes from game logic
      setAttributes(gameLogic.getAttributes());

      const currentDay = gameLogic.getCurrentDay();
      if (currentDay === null) {
        navigate("/game/end-of-week");
        return;
      }
      setDay((prev) => (prev?.id === currentDay?.id ? prev : currentDay));
    });

    return () => {
      unsubscribe();
    };
  }, [gameLogic, navigate]);

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
    const deficiency = Object.keys(attributes).find(
      (stat) => attributes[stat] <= 0,
    );
    if (deficiency) {
      // TODO: Might have to update internal `Player` state before navigating to fail screen
      initializeGameState();
      navigate("/game/game-over", { state: { deathCause: deficiency } });
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
      mode,
      setMode,
    }),
    [
      attributes,
      currentTime,
      tasks,
      notifications,
      logicPlanTask,
      getPlannedTasks,
      setMode,
      mode,
    ],
  );

  // Don't render child components until this component is set up
  if (currentTime === null) return <></>;

  return (
    <>
      {mode === GameState.PAUSED && <ToastNofication text="Plan your day!" />}
      <GameContext.Provider value={value}>{children}</GameContext.Provider>
    </>
  );
};

export default GameProvider;
