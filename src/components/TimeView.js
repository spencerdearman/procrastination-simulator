import { useGame } from "game-context/GameContext";
import { useEffect, useState } from "react";

const TimeView = ({ time }) => {
  const [currentGameTime, setCurrentGameTime] = useState(null);
  const [isTimeStopped, setIsTimeStopped] = useState(false);
  const { currentTime } = useGame();

  useEffect(() => {
    const newTime = currentTime.getCurrentGameTime();
    setCurrentGameTime(newTime);
  }, [currentTime]);

  const toggleTime = () => {
    if (isTimeStopped) {
      currentTime.startTimer();
    } else {
      currentTime.stopTimer();
    }
    setIsTimeStopped(!isTimeStopped);
  };

  const twiceSpeed = () => {
    time.xSpeed(60);
    setIsTimeStopped(false);
  };

  const halfSpeed = () => {
    time.xSpeed(0.5);
    setIsTimeStopped(false);
  };

  return (
    <div>
      <div>
        {currentGameTime ? currentGameTime.toLocaleString() : "Loading..."}
      </div>
      <button onClick={toggleTime}>
        {isTimeStopped ? "Start Time" : "Stop Time"}
      </button>
      <button onClick={twiceSpeed}>Twice Speed</button>
      <button onClick={halfSpeed}>Half Speed</button>
    </div>
  );
};

export default TimeView;
