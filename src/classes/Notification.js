import Task from "./Task.js";
// notification class
// should have the text ocntent, the accept or decline button....thats it for MVP
// also have the calls for accept and decline
export default class Notification extends Task {
  #notificationDuration; // Duration of the notification
  #followUp; // Follow-up activity (string)
  #accepted = false; // Whether the notification has been accepted (boolean)
  #notificationTime; // Time of the notification (Date)
  #option1; // First option text
  #option2; // Second option text
  #option1Impact = {}; // Impact of option 1 (e.g., { academics: 10, socialLife: -5 })
  #option2Impact = {}; // Impact of option 2 (e.g., { academics: -5, socialLife: 10 })
  #narrativeOutcome; // Narrative follow-up text
  #forced = false; // Indicates if the notification is a forced interaction

  /**
   * Constructor to initialize a Notification instance.
   * @param {string} name - The name of the task/notification.
   * @param {number} notificationDuration - The duration of the notification.
   */
  constructor(name, notificationDuration, forced = false) {
    super(name);
    this.#notificationDuration = notificationDuration;
    this.#forced = forced;
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

  /**
   * Function to replace an activity with the notification's follow-up.
   * @param {Task} activity - The activity to be replaced.
   * @returns {string} Message indicating the replacement.
   */
  replaceActivity(activity) {
    if (!(activity instanceof Task)) {
      console.error("Invalid activity provided for replacement.");
      return;
    }

    // Logic to replace the activity
    const followUpActivity = this.getFollowUp();
    if (followUpActivity) {
      console.log(
        `Activity "${activity.name}" has been replaced with follow-up: "${followUpActivity}".`,
      );
      return `Activity "${activity.name}" replaced with "${followUpActivity}"`;
    } else {
      console.warn(
        `No follow-up defined for the notification. Replacement could not occur.`,
      );
      return `No follow-up defined for the replacement.`;
    }
  }
}
