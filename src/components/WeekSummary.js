import React from "react";
import Stats from "./Stats";


function WeekSummary() {
  return (
    <body>
      <div id="header">
        <p id="intro-text">You are a...</p>
        <h3 id="banner-text">Lebron</h3>
      </div>
      <div id="content">
        <div id="stats-box">
          <Stats />
        </div>
        <div id="summary-text-box">
          <p id="blurb-text"> Matthew woke up to the sound of his alarm, rubbing his eyes as he prepared for another busy school day. After a quick breakfast, he grabbed his backpack and headed out the door, catching the bus just in time. His morning was packed with solving algebra problems, discussing historical events, and presenting his science project. At lunch, he joked around with his friends, enjoying a much-needed break. The afternoon flew by with a hands-on coding lesson in computer class and an intense game of basketball in P.E. After school, he stayed late for robotics club, fine-tuning a project for an upcoming competition. Once home, he finished his homework and relaxed with a video game before heading to bed, ready to do it all again tomorrow. </p>
        </div>
      </div>
    </body>
  );
}

export default WeekSummary;