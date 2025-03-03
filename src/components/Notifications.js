import React from "react";

function NotificationsList({ notifications, onAccept, onReject }) {
  return (
    <div className="notifications-list">
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          title={notification.name} // Header is passed as name in constructor
          message={notification.getDescription()}
          isMandatory={notification.getForced()}
          acceptButton="Accept"
          rejectButton="Reject"
          onAccept={onAccept}
          onReject={onReject}
        />
      ))}
    </div>
  );
}

function Notification({
  isMandatory = false,
  title = "Matthew's birthday party",
  message = "Lebron lebron lebron",
  icon = "🥳",
  dismissButton = "Dismiss",
  acceptButton = "Accept",
  rejectButton = "Reject",
  onAccept,
  onReject,
}) {
  const randomPosition = {
    top: `${Math.floor(Math.random() * 80)}vh`, // Random value between 0-80% of viewport height
    left: `${Math.floor(Math.random() * 80)}vw`, // Random value between 0-80% of viewport width
  };

  if (isMandatory) {
    // Mandatory Notification
    return (
      <div className="alert-popup" style={randomPosition}>
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
      <div className="notification-popup" style={randomPosition}>
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
            {rejectButton}
          </button>
          <button className="accept-button" id="accept-button">
            {acceptButton}
          </button>
        </div>
      </div>
    );
  }
}

export default NotificationsList;
