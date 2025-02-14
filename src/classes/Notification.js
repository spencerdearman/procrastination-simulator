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
}
