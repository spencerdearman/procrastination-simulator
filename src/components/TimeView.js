import { useEffect, useState } from "react";

const TimeView = ({ time }) => {
  const [currentGameTime, setCurrentGameTime] = useState(null);
  const [isTimeStopped, setIsTimeStopped] = useState(false);

  const updateTime = () => {
    const newTime = time.getCurrentGameTime();
    setCurrentGameTime(newTime);
  };

  useEffect(() => {
    setInterval(updateTime, 1000);
  });

  const toggleTime = () => {
    if (isTimeStopped) {
      time.startTimer();
    } else {
      time.stopTimer();
    }
    setIsTimeStopped(!isTimeStopped);
  };

  const twiceSpeed = () => {
    time.xSpeed(2);
  };

  const halfSpeed = () => {
    time.xSpeed(0.5);
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
