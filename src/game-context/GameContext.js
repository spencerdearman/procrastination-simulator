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
import { notificationData } from "../data/notificationData";

export const GameState = Object.freeze({
  TUTORIAL: "tutorial",
  PAUSED: "paused",
  PLAY: "play",
  COMPLETE: "complete",
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
  const [mode, setMode] = useState(GameState.TUTORIAL);
  const [gameLogic, setGameLogic] = useState(null);
  const [attributes, setAttributes] = useState({});
  const [currentTime, setCurrentTime] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [day, setDay] = useState(null);

  const initializeGameState = useCallback(() => {
    const time = new Time();
    const player = new Player("TestPlayer");

    const dayEndHandler = (currentDay, nextDay, startTime, tasks) => {
      setDay(nextDay);
      setCurrentTime(startTime);
      setTasks(tasks);

      // The object's methods aren't passed through the state property, so we must compute it here, and send the string value across
      currentDay.dayOfWeek = currentDay.getDayOfWeek();
      navigate("/game/end-of-day", {
        state: { currentDay: currentDay, nextDay: nextDay },
      });
    };

    const logic = new Logic(3, time, player, notificationData);
    logic.loadNotifications(notificationData);
    logic.eventHooks.dayEnd = dayEndHandler;
    logic.eventHooks.taskStarted = () => {
      setTasks(logic.getTasks());
    };
    setCurrentTime(time);
    setAttributes(logic.getAttributes());
    setGameLogic(logic);
  }, [navigate]);

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
    if (mode === GameState.PAUSED) {
      // Do nothing since state is driven elsewhere (pausing inside of Logic.js and playing within <PlayControls />)
    } else if (mode === GameState.PLAY && gameLogic) {
      // Initialize the game with the parsed tasks
      gameLogic.beginDay();
    } else {
      initializeGameState();
    }
  }, [mode, gameLogic, initializeGameState]);

  useEffect(() => {
    if (!gameLogic) return;
    setDay(gameLogic.getCurrentDay());

    // Subscribe to time updates from the game logic
    const unsubscribe = gameLogic.time.subscribe((newTime) => {
      setCurrentTime(newTime);

      // Get updated attributes from game logic
      setAttributes(gameLogic.getAttributes());

      // *** Update notifications state here ***
      const newNotification = gameLogic.currentNotification;
      // Wrap in an array so NotificationsList can map over it
      setNotifications(newNotification ? [newNotification] : []);

      const currentDay = gameLogic.getCurrentDay();

      if (currentDay === null) {
        setMode(GameState.COMPLETE);
        navigate("/game/end-of-week");
        return;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [gameLogic, navigate]);

  const handleAcceptNotification = () => {
    if (gameLogic) {
      gameLogic.acceptNotification();
      // Update notifications immediately after a decision
      const newNotification = gameLogic.currentNotification;
      setNotifications(newNotification ? [newNotification] : []);
    }
  };

  const handleRejectNotification = () => {
    if (gameLogic) {
      gameLogic.rejectNotification();
      // Update notifications immediately after a decision
      const newNotification = gameLogic.currentNotification;
      setNotifications(newNotification ? [newNotification] : []);
    }
  };

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
      gameLogic.planTask(task, hourIndex);

      // Update React state to reflect changes
      setTasks(gameLogic.getTasks());
    },
    [gameLogic, tasks],
  );

  const unplanTask = useCallback(
    (taskData) => {
      const task = tasks.find((t) => t.id === taskData.id);
      if (!task) {
        console.error("Could not find matching task with ID:", taskData.id);
        return;
      }
      gameLogic.unplanTask(task);
      setTasks(gameLogic.getTasks());
    },
    [gameLogic, tasks],
  );

  useEffect(() => {
    const deficiency = Object.keys(attributes).find(
      (stat) => attributes[stat] <= 0,
    );
    if (deficiency) {
      // TODO: Might have to update internal `Player` state before navigating to fail screen
      setMode(GameState.COMPLETE);
      navigate("/game/game-over", { state: { deathCause: deficiency } });
    }
  }, [attributes, navigate, initializeGameState]);

  const getPlannedTasks = useCallback(() => {
    return tasks.filter((task) => task.startTime);
  }, [tasks]);

  const canPlanTask = useCallback(
    (hourIndex) => {
      return gameLogic.canPlanTask(hourIndex);
    },
    [gameLogic],
  );

  const value = useMemo(
    () => ({
      attributes,
      currentTime,
      tasks,
      notifications,
      handleAcceptNotification,
      handleRejectNotification,
      canPlanTask,
      logicPlanTask,
      getPlannedTasks,
      unplanTask,
      mode,
      setMode,
      day,
    }),
    [
      attributes,
      currentTime,
      tasks,
      notifications,
      canPlanTask,
      logicPlanTask,
      gameLogic,
      getPlannedTasks,
      unplanTask,
      setMode,
      mode,
      day,
    ],
  );
  const shouldShowToast = () => {
    return location.pathname === "/game/calendar" && mode === GameState.PAUSED;
  };

  // Don't render child components until this component is set up
  if (currentTime === null) return <></>;

  return (
    <>
      {shouldShowToast() && <ToastNofication text="Plan your day!" />}
      <GameContext.Provider value={value}>{children}</GameContext.Provider>
    </>
  );
};

export default GameProvider;
