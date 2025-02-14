import Task from "./Task.js";
// notification class
// should have the text ocntent, the accept or decline button....thats it for MVP
// also have the calls for accept and decline
export default class Notification extends Task {
  #notificationDuration; // Duration of the notification
  #followUp; // Follow-up activity (string)
  #accepted = false; // Whether the notification has been accepted (boolean)
  #notificationTime; // Time of the notification (Date)

  /**
   * Constructor to initialize a Notification instance.
   * @param {string} name - The name of the task/notification.
   * @param {number} notificationDuration - The duration of the notification.
   */
  constructor(name, notificationDuration) {
    super(name);
    this.#notificationDuration = notificationDuration;
  }

  /**
   * Sets the follow-up activity.
   * @param {string} followUp - The follow-up activity.
   */
  setFollowUp(followUp) {
    if (typeof followUp === "string") {
      this.#followUp = followUp;
    } else {
      console.error(
        `Invalid follow-up. Expected a string but got ${typeof followUp}.`,
      );
    }
  }

  /**
   * Gets the follow-up activity.
   * @returns {string} The follow-up activity.
   */
  getFollowUp() {
    return this.#followUp;
  }

  /**
   * Sets whether the notification has been accepted.
   * @param {boolean} accepted - Whether the notification is accepted.
   */
  setAccepted(accepted) {
    if (typeof accepted === "boolean") {
      this.#accepted = accepted;
    } else {
      console.error(
        `Invalid value for accepted. Expected a boolean but got ${typeof accepted}.`,
      );
    }
  }

  /**
   * Gets whether the notification has been accepted.
   * @returns {boolean} True if the notification is accepted, otherwise false.
   */
  getAccepted() {
    return this.#accepted;
  }

  /**
   * Sets the notification time.
   * @param {Date} notificationTime - The time of the notification.
   */
  setNotificationTime(notificationTime) {
    if (notificationTime instanceof Date) {
      this.#notificationTime = notificationTime;
    } else {
      console.error(
        `Invalid notification time. Expected a Date object but got ${typeof notificationTime}.`,
      );
    }
  }

  /**
   * Gets the notification time.
   * @returns {Date} The time of the notification.
   */
  getNotificationTime() {
    return this.#notificationTime;
  }
}
