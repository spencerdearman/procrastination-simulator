import React from "react";

function Notification({
  isMandatory = false,
  title = "Matthew's birthday party",
  message = "Lebron lebron lebron",
  icon = "🥳"
}) {
  if (isMandatory) {
    // Mandatory Notification
    return (
      <div className="alert-popup">
        <div className="notification-main">
          <span className="emoji-icon" role="img">
            {icon}
          </span>
          <div className="notification-text">
            <h3 className="notification-title">{title}</h3>
            <p className="notification-message">{message}</p>
          </div>
        </div>
        <div className="notification-options">
          <button className="accept-button">Dismiss</button>
        </div>
      </div>
    );
  } else {
    // Optional Notification
    return (
      <div className="notification-popup">
        <div className="notification-main">
          <span className="emoji-icon" role="img">
            {icon}
          </span>
          <div className="notification-text">
            <h3 className="notification-title">{title}</h3>
            <p className="notification-message">{message}</p>
          </div>
        </div>
        <div className="notification-options">
          <button className="reject-button" id="reject-button">
            Reject
          </button>
          <button className="accept-button" id="accept-button">
            Accept
          </button>
        </div>
      </div>
    );
  }
}

export default Notification;
