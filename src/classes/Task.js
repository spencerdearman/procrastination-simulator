export default class Task {
  static Category = Object.freeze({
    MANDATORY: "mandatory",
    ACADEMIC: "academic",
    SELFCARE: "selfCare",
    SOCIAL: "social",
    ENERGY: "energy",
    CLUBS: "clubs",
  });

  #startTime; //Date
  #endTime; //Date
  #completed = false;
  #status = "PENDING"; //Default status is PENDING
  #optional; //bool
  #movable; //bool
  #current; //bool
  #duration = 1; //each task is 1 in-game hour
  #attributeImpacts = {
    academics: 0,
    socialLife: 0,
    energy: 0,
    mentalHealth: 0,
  };
  #difficulty; //scale of 1 - 4
  #category;

  constructor(name) {
    this.name = name;
  }

  setStatus(status) {
    const validStatus = ["PENDING, COMPLETE, IN_PROGRESS, ABORTED"];
    let normalizedStatus = status.toUpperCase();
    if (validStatus.includes(normalizedStatus)) {
      this.#status = normalizedStatus;
    } else {
      console.error(
        `Invalid status: ${status}. Allowed statuses are: ${validStatus.join(", ")}`,
      );
    }
  }

  getStatus() {
    return this.#status;
  }

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

  getCategory() {
    return this.#category;
  }

  setStartTime(startTime) {
    if (startTime instanceof Date) {
      this.#startTime = startTime;
      // Calculate endTime if assuming duration is fized to 1 hour
      this.#endTime = new Date(
        startTime.getTime() + this.#duration * 60 * 60 * 1000,
      );
    } else {
      console.error(`Invalid start time. Expected a Date object.`);
    }
  }

  getStartTime() {
    return this.#startTime;
  }

  getEndTime() {
    return this.#endTime;
  }

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

  getDuration() {
    return this.#duration;
  }

  changeTime() {
    //to implement
  }

  abort() {
    if (!this.#completed) {
      this.#completed = false;
      this.setStatus("ABORTED");
      console.log(`Task "${this.name}" has been aborted.`);
    } else {
      console.warn(
        `Task "${this.name}" is already completed and cannot be aborted.`,
      );
    }
  }

  completeTask(playerAttributes) {
    if (typeof playerAttributes !== "object" || playerAttributes === null) {
      console.error("Invalid playerAttributes provided. Expected an object.");
      return;
    }

    if (!this.#completed) {
      this.#completed = true;
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

  isOverdue() {
    //to implement
  }

  resetCompleted() {
    this.#completed = false;
  }

  setOptional(optional) {
    if (typeof optional === "boolean") {
      this.#optional = optional;
    } else {
      console.error(
        `Incorrect data type. Required type: boolean. Provided type: ${typeof optional}`,
      );
    }
  }

  getOptional() {
    return this.#optional;
  }

  setMovable(movable) {
    if (typeof movable === "boolean") {
      this.#movable = movable;
    } else {
      console.error(
        `Incorrect data type. Required type: boolean. Provided type: ${typeof movable}`,
      );
    }
  }

  getMovable() {
    return this.#movable;
  }

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

  getAttributeImpact(key) {
    if (this.#attributeImpacts.hasOwnProperty(key)) {
      return this.#attributeImpacts[key];
    } else {
      console.error(
        `Key: ${key} does not exist in the attributeImpact dictionary`,
      );
    }
  }

  setDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 4) {
      this.#difficulty = difficulty;
    } else {
      console.error(`Difficulty should be between 1 - 4`);
    }
  }

  getDifficulty() {
    return this.#difficulty;
  }

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

  debug() {
    console.log(this.toJSON);
  }
}
