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
          <h3 class="blurb-text" id="text-header">Welcome to Procrastination Simulator</h3>
          <p class="blurb-text" id="text-position"> start game description </p>
        </div>
      </div>
    </body>
  );
}

export default StartPage;