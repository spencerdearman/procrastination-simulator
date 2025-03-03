import React from "react";

function NotificationsList({ notifications, onAccept, onReject }) {
  if (!notifications || notifications.length === 0) {
    return null; // Hide if no notifications
  }

  return (
    <div className="notifications-list">
      {notifications.map((notification, index) => (
        <Notification
          key={index}
          notification={notification}
          title={notification.header}
          message={notification.getDescription()}
          isMandatory={notification.getForced()}
          acceptButton="Accept"
          rejectButton="Reject"
          onAccept={() => onAccept(notification)}
          onReject={() => onReject(notification)}
        />
      ))}
    </div>
  );
}

function Notification({
  notification,
  isMandatory = false,
  title,
  message,
  icon = "📢",
  acceptButton = "Accept",
  rejectButton = "Reject",
  onAccept,
  onReject,
}) {
  return (
    <div className={isMandatory ? "alert-popup" : "notification-popup"}>
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
        {!isMandatory && (
          <button
            className="reject-button"
            onClick={() => onReject(notification)}
          >
            {rejectButton}
          </button>
        )}
        <button
          className="accept-button"
          onClick={() => onAccept(notification)}
        >
          {acceptButton}
        </button>
      </div>
    </div>
  );
}

export default NotificationsList;
