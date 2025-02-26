import React from "react";
// import Stats from "./Stats";


function StartPage() {
  return (
    <body>
      <div id="header">
        {/* <p id="intro-text">Welcome to</p> */}
        <h3 id="banner-text">Procrastination Simulator</h3>
      </div>
      <div id="content">
        <div id="summary-text-box">
          <h3 class="blurb-text" id="text-header"> 🛎️ &nbsp;&nbsp; Welcome to Procrastination Simulator</h3>
          <p class="blurb-text" id="text-position">Time is slipping away 😨, deadlines are looming 😭, and your to-do list is growing at an alarming rate 😱. As a UChicago 🤓 student, you’re no stranger to the eternal struggle: Do you grind 💪through readings and problem sets, or do you succumb to the siren call 🚨 of “just 10 more minutes” Doom scrolling? In this game, you’ll navigate a chaotic week of student life, balancing academics📘, mental well-being💆, social obligations👯, and sheer exhaustion🥱. Plan wisely, resist distractions 👼 (or don’t 😈), and try to survive the week without letting any of your stats hit zero. Because at the end of the day, the real enemy isn’t time—it’s you 🫵.</p>
          <button id="enter-game">Enter Game</button>
        </div>
        
        
        
      </div>
    </body>
  );
}

export default StartPage;