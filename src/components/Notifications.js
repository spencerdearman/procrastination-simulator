import React from "react";

function OptionalNotification() {
  return (
    <div class="notification-popup">
      <div class="notification-main">
        <span class="emoji-icon" role="img">🥳</span>
        <div class="notification-text">
          <h3 class="notification-title">Matthew's Birthday Party 🧑‍💻⚡️⏳⏳⏳</h3>
          <p class="notification-message">
            Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron 
          </p>
        </div>
      </div>
      <div class="notification-options">
        <button class="reject-button" id="reject-button">Reject</button>
        <button class="accept-button" id="accept-button">Accept</button>
      </div>
    </div>
  );
}

function MandatoryNotification() {
  return (
    <div class="alert-popup">
    <div class="notification-main">
      <span class="emoji-icon" role="img">⚠️</span>
      <div class="notification-text">
        <h3 class="notification-title">You got hurt😢</h3>
        <p class="notification-message">
          Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron Lebron 
        </p>
      </div>
    </div>
    <div class="notification-options">
      <button class="accept-button">Dismiss</button>
    </div>
  </div>
  );
}

export default OptionalNotification; MandatoryNotification();