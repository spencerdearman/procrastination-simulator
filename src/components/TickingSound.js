import {useEffect,useRef} from "react";

function TickingSound() {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/sound/clock-ticking.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    audioRef.current.play()
      .then(() => console.log("Ticking sound playing"))
      .catch(e => console.log("Ticking sound failed to play:", e));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Optional: Adjust volume based on game speed
//   useEffect(() => {
//     if (!audioRef.current) return;

//   }, [currentTime]);

  return null; // This component doesn't render anything
}

export default TickingSound;