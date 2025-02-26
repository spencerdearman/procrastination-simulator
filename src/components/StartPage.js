import React, { useEffect, useRef, useState } from "react";
import Typed from "typed.js";

function StartPage() {
  const blurbRef = useRef(null); // Ref for the blurb text
  const [showButton, setShowButton] = useState(false); // State to control button visibility

  useEffect(() => {
    // Initialize Typed.js for the blurb text
    const blurbTyped = new Typed(blurbRef.current, {
      strings: [
        "Time is slipping away 😨, deadlines are looming 😭, and your to-do list is growing at an alarming rate 😱.^1000",
        "As a UChicago 🤓 student, you’re no stranger to the eternal struggle: Do you grind 💪 through readings and problem sets,^500 or do you succumb to the siren call 🚨 of 'just 10 more minutes' Doom scrolling?^1000",
        "In this game, you’ll navigate a chaotic week of student life, balancing academics 📘, mental well-being 💆, social obligations 👯, and sheer exhaustion 🥱.^1000",
        "Plan wisely, resist distractions 👼 (or don’t 😈), and try to survive the week without letting any of your stats hit zero.^1000",
        "Because at the end of the day, the real enemy isn’t time—it’s you 🫵.^1000",
      ],
      typeSpeed: 10,
      fadeOut: true,
      showCursor: false,
      onComplete: () => {
        setShowButton(true); // Show button after typing completes
      },
    });

    return () => {
      blurbTyped.destroy();
    };
  }, []);

  return (
    <div>
      <div id="header">
        <h3 id="banner-text">Procrastination Simulator</h3>
      </div>
      <div id="content">
        <div id="summary-text-box">
          <h3 class="blurb-text" id="text-header">
            {" "}
            🛎️ &nbsp;&nbsp; Welcome to Procrastination Simulator
          </h3>
          <p className="blurb-text" id="text-position" ref={blurbRef}></p>
          {/* Only show the button when typing is complete */}
          {showButton && <button id="enter-game">Enter Game!</button>}
        </div>
      </div>
    </div>
  );
}

export default StartPage;
