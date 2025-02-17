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
    this.setCategory("NOTIFICATION");
  }

  /**
   * Sets the options for the notification.
   * @param {string} option1 - The first option text.
   * @param {string} option2 - The second option text.
   */
  setOptions(option1, option2) {
    if (typeof option1 === "string" && typeof option2 === "string") {
      this.#option1 = option1;
      this.#option2 = option2;
    } else {
      console.error("Options must be strings.");
    }
  }

  /**
   * Gets the options for the notification.
   * @returns {object} An object containing option1 and option2.
   */
  getOptions() {
    return { option1: this.#option1, option2: this.#option2 };
  }

  /**
   * Sets the impacts for each option.
   * @param {object} option1Impact - Impact of choosing option 1.
   * @param {object} option2Impact - Impact of choosing option 2.
   */
  setImpacts(option1Impact, option2Impact) {
    this.#option1Impact = option1Impact;
    this.#option2Impact = option2Impact;
  }

  /**
   * Gets the impacts for each option.
   * @returns {object} An object containing impacts for option1 and option2.
   */
  getImpacts() {
    return {
      option1Impact: this.#option1Impact,
      option2Impact: this.#option2Impact,
    };
  }

  /**
   * Sets the narrative follow-up text.
   * @param {string} narrative - Narrative follow-up text.
   */
  setNarrative(narrative) {
    this.#narrativeOutcome = narrative;
  }

  /**
   * Gets the narrative follow-up text.
   * @returns {string} The narrative follow-up text.
   */
  getNarrative() {
    return this.#narrativeOutcome;
  }

  /**
   * Resets the decision options after one is made.
   */
  resetOptions() {
    this.setOptions("", "");
    this.setImpacts({}, {});
    this.setFollowUp(""); // Reset follow-up
  }

  /**
   * Handles the player's decision and applies the respective impacts.
   * @param {string} decision - The player's decision ("option1" or "option2").
   * @param {object} playerAttributes - The player's attributes to update.
   */
  handleDecision(decision, playerAttributes) {
    let impacts;

    const options = this.getOptions();
    const impactsData = this.getImpacts();

    if (decision === options.option1) {
      impacts = this.getImpacts().option1Impact;
    } else if (decision === options.option2) {
      impacts = this.getImpacts().option2Impact;
    } else {
      console.error(
        `Invalid decision: '${decision}'. Expected '${options.option1}' or '${options.option2}'.`,
      );
      return;
    }

    // Apply impacts
    for (let key in impacts) {
      if (playerAttributes.hasOwnProperty(key)) {
        playerAttributes[key] += impacts[key];
        playerAttributes[key] = Math.min(
          100,
          Math.max(0, playerAttributes[key]),
        ); // Clamp between 0 and 100
      }
    }

    this.setCompleted(true); // Mark notification as completed

    console.log(
      `Decision made: ${decision}. Impacts applied: ${JSON.stringify(impacts)}`,
    );

    // Display narrative follow-up
    if (this.getNarrative()) {
      console.log(`Follow-up Narrative: ${this.getNarrative()}`);
    }

    // Reset options to avoid carrying forward decisions
    this.resetOptions();
  }

  /**
   * Overrides the current activity if the notification is forced.
   * @param {Task} currentActivity - The current activity being performed.
   * @returns {string} Message indicating the override.
   */
  overrideActivity(currentActivity) {
    if (!this.getForced()) {
      console.warn("This notification is not a forced interaction.");
      return;
    }

    // Stop the current activity if it is running
    if (currentActivity.getCurrent()) {
      currentActivity.setCurrent(false);
      currentActivity.setStatus("ABORTED");
    }

    console.log(
      `Forced Interaction: Overriding activity "${currentActivity.name}".`,
    );
    return `Activity "${currentActivity.name}" overridden by a forced notification.`;
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
   * Sets the notification duration.
   * @param {number} duration - Duration of the notification.
   */
  setNotificationDuration(duration) {
    if (typeof duration === "number" && duration > 0) {
      this.#notificationDuration = duration;
    } else {
      console.error(
        "Invalid notification duration. Must be a positive number.",
      );
    }
  }

  getForced() {
    return this.#forced;
  }

  /**
   * Gets the notification duration.
   * @returns {number} The duration of the notification.
   */
  getNotificationDuration() {
    return this.#notificationDuration;
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
