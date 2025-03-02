import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import "../styles/StartPage.css";

function StartPage() {
  const navigate = useNavigate();
  const blurbRef = useRef(null); // Ref for the blurb text
  const [showButton, setShowButton] = useState(false); // State to control button visibility
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);
  const typedInstanceRef = useRef(null);

  const introEnd = () => {
    navigate("/game/tutorial");
  };

  const startTyping = () => {
    if (hasInteracted) return; // Prevent multiple initializations

    setHasInteracted(true);

    // Create audio element
    audioRef.current = new Audio("/sound/typing.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Try to play audio (now allowed after user interaction)
    audioRef.current
      .play()
      .then(() => console.log("Audio playing successfully"))
      .catch((e) => console.log("Audio play failed:", e));

    // Initialize Typed.js
    typedInstanceRef.current = new Typed(blurbRef.current, {
      strings: [
        "Time is slipping away 😨, deadlines are looming 😭, and your to-do list is growing at an alarming rate 😱.^1000",
        "As a UChicago 🤓 student, you're no stranger to the eternal struggle: Do you grind 💪 through readings and problem sets,^500 or do you succumb to the siren call 🚨 of 'just 10 more minutes' Doom scrolling?^1000",
        "In this game, you'll navigate a chaotic week of student life, balancing academics 📘, mental well-being 💆, social obligations 👯, and sheer exhaustion 🥱.^1000",
        "Plan wisely, resist distractions 👼 (or don't 😈), and try to survive the week without letting any of your stats hit zero.^1000",
        "Because at the end of the day, the real enemy isn't time—it's you 🫵.^1000",
      ],
      typeSpeed: 10,
      fadeOut: true,
      showCursor: false,
      onComplete: () => {
        setShowButton(true);
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null; // Stop sound effect
        }
      },
      onStop: () => {
        if (audioRef.current) audioRef.current.pause();
      },
      onTypingPaused: () => {
        if (audioRef.current) audioRef.current.pause();
      },
      onTypingResumed: () => {
        if (audioRef.current)
          audioRef.current
            .play()
            .catch((e) => console.log("Audio play failed:", e));
      },
    });
  };

  useEffect(() => {
    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="start-page"
      onClick={startTyping}
      style={{ cursor: hasInteracted ? "default" : "pointer" }}
    >
      {/* <div id="header">
        <h3 id="banner-text">Procrastination Simulator</h3>
      </div> */}
      <div id="start-page-content">
        <div id="summary-text-box">
          <h3 id="start-page-text-header">
            {" "}
            Welcome to Procrastination Simulator
            {!hasInteracted && (
              <div id="click-title">Click anywhere to start</div>
            )}
          </h3>

          <p className="blurb-text" id="text-position" ref={blurbRef}></p>
          {showButton && (
            <button id="enter-game" onClick={introEnd}>
              Enter Game!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartPage;
