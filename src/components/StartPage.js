import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Typed from "typed.js";
import "../styles/StartPage.css";

// Paragraphs for the "click to continue" flow:
const typedParagraphs = [
  "Time is slipping away 😨, deadlines are looming 😭, and your to-do list is growing at an alarming rate 😱.^1000",
  "As a UChicago 🤓 student, you're no stranger to the eternal struggle: Do you grind 💪 through readings and problem sets,^500 or do you succumb to the siren call 🚨 of 'just 10 more minutes' Doom scrolling?^1000",
  "In this game, you'll navigate a chaotic week of student life, balancing academics 📘, mental well-being 💆, social obligations 👯, and sheer exhaustion 🥱.^1000",
  "Plan wisely, resist distractions 👼 (or don't 😈), and try to survive the week without letting any of your stats hit zero.^1000",
  "Because at the end of the day, the real enemy isn't time—it's you 🫵.^1000",
];

function StartPage() {
  const navigate = useNavigate();
  const blurbRef = useRef(null);
  const typedInstanceRef = useRef(null);

  // Tracks which paragraph we're on
  const [typedIndex, setTypedIndex] = useState(0);

  // Whether to show the “Click to continue” prompt after typing finishes
  const [showContinue, setShowContinue] = useState(false);

  // Determines if we're on the last paragraph
  const isLastParagraph = typedIndex === typedParagraphs.length - 1;

  // Set up (or re-initialize) the Typed instance whenever typedIndex changes
  useEffect(() => {
    // Destroy any previous instance before creating a new one
    if (typedInstanceRef.current) {
      typedInstanceRef.current.destroy();
    }

    typedInstanceRef.current = new Typed(blurbRef.current, {
      strings: [typedParagraphs[typedIndex]],
      typeSpeed: 10,
      fadeOut: true,
      showCursor: false,
      onComplete: () => {
        setShowContinue(true);
      },
    });

    // Cleanup on unmount or before re-initializing
    return () => {
      typedInstanceRef.current.destroy();
    };
  }, [typedIndex]);

  // Handle the user's click on the “Click to continue” prompt
  const handleContinueClick = () => {
    setShowContinue(false);

    if (!isLastParagraph) {
      // Move to the next paragraph
      setTypedIndex((prev) => prev + 1);
    } else {
      // If it's the last paragraph, proceed to the next route
      navigate("/game/tutorial");
    }
  };

  return (
    <div id="start-page">
      <div id="start-page-content">
        <div
          id="summary-text-box"
          onClick={showContinue ? handleContinueClick : undefined}
          style={{ cursor: showContinue ? "pointer" : "default" }}
        >
          <h3 id="start-page-text-header">
            Welcome to Procrastination Simulator
          </h3>

          {/* The typed text */}
          <p className="blurb-text" id="text-position" ref={blurbRef} />
          {showContinue && (
            <div style={{ marginTop: "1rem", marginLeft: "1rem" }}>
              Click to Continue
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StartPage;
