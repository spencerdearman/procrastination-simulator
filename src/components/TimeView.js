import { useEffect, useState } from "react";

const TimeView = ({ time }) => {
  const [currentGameTime, setCurrentGameTime] = useState(null);

  const updateTime = () => {
    const newTime = time.getCurrentGameTime();
    setCurrentGameTime(newTime);
  };

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      {currentGameTime ? currentGameTime.toLocaleString() : "Loading..."}
    </div>
  );
};

export default TimeView;
