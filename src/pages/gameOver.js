import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import DeathScreen from "../components/DeathScreen";
import "styles/DeathScreen.css";

export default function GameOver() {
  const audioRef = useRef(null);
  const { state } = useLocation();

  useEffect(() => {
    audioRef.current = new Audio("/sound/gameover.mp3");
    audioRef.current.volume = 0.5; // Adjust volume as needed

    audioRef.current.play()
      .then(() => console.log("Game over sound played successfully"))
      .catch(e => console.log("Game over sound failed to play:", e));

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return <DeathScreen deathCause={state.deathCause} />;
}
