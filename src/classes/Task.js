export default class Task {
  // Categories for tasks
  static Category = Object.freeze({
    MANDATORY: "mandatory",
    ACADEMIC: "academic",
    SELFCARE: "selfCare",
    SOCIAL: "social",
    ENERGY: "energy",
    CLUBS: "clubs",
  });

  #startTime; // Start time of the task (Date object)
  #endTime; // End time of the task (Date object)
  #completed = false; // Whether the task is completed
  #status = "PENDING"; // Current status of the task: PENDING, COMPLETE, IN_PROGRESS, ABORTED
  #optional; // Whether the task is optional (boolean)
  #movable; // Whether the task's time can be changed (boolean)
  #current; // Whether the task is currently running (boolean)
  #duration = 1; // Duration of the task in in-game hours
  #attributeImpacts = {
    academics: 0,
    socialLife: 0,
    energy: 0,
    mentalHealth: 0,
  };
  #difficulty; // Difficulty of the task (scale of 1-4)
  #category; // Task category, default is "MANDATORY"

  /**
   * Constructor to initialize a task with a name.
   * @param {string} name - The name of the task.
   */
  constructor(name) {
    this.name = name;
    this.#category = Task.Category.MANDATORY;
  }

  /**
   * Sets the task's status to a valid value.
   * @param {string} status - Status of the task (PENDING, COMPLETE, IN_PROGRESS, ABORTED).
   */
  setStatus(status) {
    const validStatus = ["PENDING", "COMPLETE", "IN_PROGRESS", "ABORTED"];
    let normalizedStatus = status.toUpperCase();
    if (validStatus.includes(normalizedStatus)) {
      this.#status = normalizedStatus;
    } else {
      console.error(
        `Invalid status: ${status}. Allowed statuses are: ${validStatus.join(", ")}`,
      );
    }
  }

  /**
   * Gets the current status of the task.
   * @returns {string} The task's status.
   */
  getStatus() {
    return this.#status;
  }

  /**
   * Sets the task category.
   * @param {string} value - The category of the task (e.g., MANDATORY, ACADEMIC, etc.).
   */
  setCategory(value) {
    let normalizedValue = value.toLowerCase();
    // Check if the value is a valid category
    if (Object.values(Task.Category).includes(normalizedValue)) {
      this.#category = normalizedValue; // Assign if valid
    } else {
      console.error(
        `Invalid category: ${value}. Allowed categories are: ${Object.values(Task.Category).join(", ")}`,
      );
    }
  }

  /**
   * Gets the task's category.
   * @returns {string} The category of the task.
   */
  getCategory() {
    return this.#category;
  }

  /**
   * Sets whether the task is currently running and updates the status accordingly.
   * @param {boolean} isCurrent - Whether the task is running.
   */
  setCurrent(isCurrent) {
    if (typeof isCurrent === "boolean") {
      this.#current = isCurrent;
      if (isCurrent) {
        this.setStatus("IN_PROGRESS");
      } else if (this.#status === "IN_PROGRESS") {
        this.setStatus("PENDING");
      }
    } else {
      console.error(
        `Invalid value for "current". Expected a boolean but got ${typeof isCurrent}.`,
      );
    }
  }

  /**
   * Gets whether the task is currently running.
   * @returns {boolean} True if the task is running, otherwise false.
   */
  getCurrent() {
    return this.#current;
  }

  /**
   * Sets whether the task is currently has been completed.
   * @param {boolean} isCompleted - Whether the task is running.
   */
  setCompleted(isCompleted) {
    if (typeof isCompleted === "boolean") {
      this.#completed = isCompleted;
    } else {
      console.error(
        `Invalid value for "completed". Expected a boolean but got ${typeof isCompleted}.`,
      );
    }
  }

  /**
   * Gets whether the task has been completed.
   * @returns {boolean} True if the task has been completed, otherwise false.
   */
  getCompleted() {
    return this.#completed;
  }

  /**
   * Calculates the end time of the task based on its start time and duration.
   * @param {Date} startTime - The start time of the task.
   * @param {number} duration - The duration of the task in hours.
   * @returns {Date} The calculated end time.
   */
  calculateEndTime(startTime, duration) {
    return new Date(startTime.getTime() + duration * 60 * 60 * 1000);
  }

  /**
   * Sets the start time of the task and calculates the end time.
   * @param {Date} startTime - The start time of the task.
   */
  setStartTime(startTime) {
    if (startTime instanceof Date) {
      this.#startTime = startTime;
      // Calculate endTime if assuming duration is fized to 1 hour
      this.#endTime = this.calculateEndTime(startTime, this.#duration);
    } else {
      console.error(`Invalid start time. Expected a Date object.`);
    }
  }

  /**
   * Gets the start time of the task.
   * @returns {Date} The start time of the task.
   */
  getStartTime() {
    return this.#startTime;
  }

  /**
   * Gets the end time of the task.
   * @returns {Date} The end time of the task.
   */
  getEndTime() {
    return this.#endTime;
  }

  /**
   * Sets the task's duration and recalculates the end time if the start time is set.
   * @param {number} duration - The duration of the task in hours.
   */
  setDuration(duration) {
    if (typeof duration === "number" && duration > 0 && duration <= 24) {
      // Max 24 Hours
      this.#duration = duration;
      if (this.#startTime) {
        // Recalculate endTime based on startTime
        this.#endTime = new Date(
          this.#startTime.getTime() + duration * 60 * 60 * 1000,
        );
      }
    } else {
      console.error(
        `Invalid duration. Must be a positive number between 1 and 24.`,
      );
    }
  }

  /**
   * Gets the task's duration.
   * @returns {number} The duration of the task in hours.
   */
  getDuration() {
    return this.#duration;
  }

  /**
   * Starts the task and updates its status to IN_PROGRESS.
   */
  startTask() {
    if (this.getCurrent()) {
      console.warn(`Task "${this.name}" is already running.`);
      return;
    }
    this.setCurrent(true);
    this.setStatus("IN_PROGRESS");
    console.log(`Task "${this.name}" has started.`);
  }

  /**
   * Changes the start time of the task (if it is movable) and updates the end time accordingly.
   * @param {Date} newStartTime - The new start time for the task.
   */
  changeTime(newStartTime) {
    // Updates the start time and endtime for tasks. Useful for moveable tasks
    if (!(newStartTime instanceof Date)) {
      console.error(`Invalid time provided. Expected a Date object.`);
      return;
    }

    if (!this.#movable) {
      console.warn(`Task "${this.name}" is not movable.`);
      return;
    }

    if (newStartTime < Date.now()) {
      // Ensure the new start time is in the future
      console.error(`New start time cannot be in the past.`);
      return;
    }

    this.#startTime = newStartTime;
    this.#endTime = new Date(
      newStartTime.getTime() + this.#duration * 60 * 60 * 1000,
    );

    console.log(
      `Task "${this.name}" time changed. New start time: ${this.#startTime}, New end time: ${this.#endTime}`,
    );
  }

  /**
   * Marks the task as aborted, updates its status, and logs the event.
   * A task cannot be aborted if it is already completed.
   */
  abortTask() {
    if (!this.#completed) {
      this.setCompleted(false);
      this.setStatus("ABORTED");
      console.log(`Task "${this.name}" has been aborted.`);
    } else {
      console.warn(
        `Task "${this.name}" is already completed and cannot be aborted.`,
      );
    }
  }

  /**
   * Completes the task and applies its impacts to the player's attributes.
   * @param {object} playerAttributes - The player's attributes to update.
   */
  completeTask(playerAttributes) {
    if (typeof playerAttributes !== "object" || playerAttributes === null) {
      console.error("Invalid playerAttributes provided. Expected an object.");
      return;
    }

    if (!this.#completed) {
      this.setCompleted(true);
      this.setStatus("COMPLETE");

      if (Object.keys(this.#attributeImpacts).length === 0) {
        console.warn(`Task "${this.name}" has no attribute impacts defined.`);
      }

      //Apply attribute impacts to player attributes
      for (let key in this.#attributeImpacts) {
        if (playerAttributes.hasOwnProperty(key)) {
          playerAttributes[key] += this.#attributeImpacts[key];
          playerAttributes[key] = Math.min(
            100,
            Math.max(0, playerAttributes[key]),
          );
        } else {
          console.error(`Player attributes lacks attribute: ${key}`);
        }
      }
      console.log(`Task "${this.name}" completed successfully.`);
    } else {
      console.warn(`Task "${this.name}" is already completed.`);
    }
  }

  /**
   * Checks if the task is overdue based on the provided game time.
   * A task cannot be overdue if its status is COMPLETE or ABORTED.
   * @param {Date} currentGameTime - The current in-game time to compare with the task's end time.
   * @returns {boolean} True if the task is overdue, otherwise false.
   */
  isOverdue(currentGameTime) {
    if (!this.#endTime) {
      console.error(`End time for task "${this.name}" is not set.`);
      return false;
    }

    if (this.#status === "COMPLETE" || this.#status === "ABORTED") {
      console.log(
        `Task "${this.name}" cannot be overdue. Status: ${this.#status}.`,
      );
      return false;
    }

    const overdue = currentGameTime > this.#endTime;
    console.log(
      `Task "${this.name}" is ${overdue ? "overdue" : "not overdue"}.`,
    );
    return overdue;
  }

  /**
   * Resets the task's completion status to false, allowing it to be marked as incomplete again.
   */
  resetCompleted() {
    this.setCompleted(false);
  }

  /**
   * Sets whether the task is optional.
   * @param {boolean} optional - Whether the task is optional.
   */
  setOptional(optional) {
    if (typeof optional === "boolean") {
      this.#optional = optional;
    } else {
      console.error(
        `Incorrect data type. Required type: boolean. Provided type: ${typeof optional}`,
      );
    }
  }

  /**
   * Gets whether the task is optional.
   * @returns {boolean} True if the task is optional, otherwise false.
   */
  getOptional() {
    return this.#optional;
  }

  /**
   * Sets whether the task is movable.
   * @param {boolean} movable - Whether the task is movable.
   */
  setMovable(movable) {
    if (typeof movable === "boolean") {
      this.#movable = movable;
    } else {
      console.error(
        `Incorrect data type. Required type: boolean. Provided type: ${typeof movable}`,
      );
    }
  }

  /**
   * Gets whether the task is movable.
   * @returns {boolean} True if the task is movable, otherwise false.
   */
  getMovable() {
    return this.#movable;
  }

  /**
   * Sets the impact of the task on a specific attribute.
   * @param {string} key - The attribute to modify (e.g., "academics", "socialLife").
   * @param {number} value - The impact value (must be between -100 and 100).
   */
  setAttributeImpact(key, value) {
    if (
      this.#attributeImpacts.hasOwnProperty(key) &&
      value >= -100 &&
      value <= 100
    ) {
      this.#attributeImpacts[key] = value;
    } else {
      console.error(
        `Attribute impact values should be between -100 and +100.\nAttribute keys should be 'academics', 'socialLife', 'energy', or 'mentalHealth'`,
      );
    }
  }

  /**
   * Gets the impact of the task on a specific attribute.
   * @param {string} key - The attribute to retrieve (e.g., "academics", "socialLife").
   * @returns {number} The impact value of the specified attribute.
   */
  getAttributeImpact(key) {
    if (this.#attributeImpacts.hasOwnProperty(key)) {
      return this.#attributeImpacts[key];
    } else {
      console.error(
        `Key: ${key} does not exist in the attributeImpact dictionary`,
      );
    }
  }

  /**
   * Checks if the task overlaps with another task.
   * @param {Task} otherTask - The task to check for overlap.
   * @returns {boolean} True if the tasks overlap, otherwise false.
   */
  overlapsWith(otherTask) {
    if (!(otherTask instanceof Task)) {
      console.error(`Invalid task provided for overlap check.`);
      return false;
    }

    return (
      this.#startTime < otherTask.getEndTime() &&
      this.#endTime > otherTask.getStartTime()
    );
  }

  /**
   * Sets the difficulty of the task (must be between 1 and 4).
   * @param {number} difficulty - The difficulty level of the task.
   */
  setDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 4) {
      this.#difficulty = difficulty;
    } else {
      console.error(`Difficulty should be between 1 - 4`);
    }
  }

  /**
   * Gets the difficulty of the task.
   * @returns {number} The difficulty level of the task.
   */
  getDifficulty() {
    return this.#difficulty;
  }

  /**
   * Serializes the task into a JSON object for storage or transfer.
   * @returns {object} A JSON representation of the task.
   */
  toJSON() {
    return {
      name: this.name,
      category: this.#category,
      startTime: this.#startTime,
      endTime: this.#endTime,
      duration: this.#duration,
      completed: this.#completed,
      attributeImpacts: this.#attributeImpacts,
      difficulty: this.#difficulty,
    };
  }

  /**
   * Logs the JSON representation of the task for debugging purposes.
   */
  debug() {
    console.log(this.toJSON());
  }
}
