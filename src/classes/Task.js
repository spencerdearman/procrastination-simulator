export default class Task {
  // Define available categories as a static property.
  static Category = Object.freeze({
    ACADEMIC: "academic",
    SOCIAL: "Social",
    ENERGY: "Energy",
    MENTAL: "Mental",
  });

  constructor(name) {
    this.id = null; // Will be set when task is created
    this.name = name;
    this.category = Task.Category.MANDATORY;
    this.description = "";
    this.icon = "";
    this.startTime = null; // Date object
    this.endTime = null; // Date object
    this.completed = false;
    this.locked = false;
    this.current = false;
    this.duration = 1; // In-game hours
    this.ambient_sound = null;
    this.attributeImpacts = {
      academics: 0,
      socialLife: 0,
      energy: 0,
      mentalHealth: 0,
    };
    this.reusable = false; // Add reusable property
  }

  setCategory(value) {
    // const normalizedValue = value.toLowerCase();
    if (Object.values(Task.Category).includes(value)) {
      this.category = value;
    } else {
      console.error(
        `Invalid category: ${value}. Allowed categories are: ${Object.values(
          Task.Category,
        ).join(", ")}`,
      );
    }
  }

  getCategory() {
    return this.category;
  }

  setCurrent(isCurrent) {
    if (typeof isCurrent === "boolean") {
      this.current = isCurrent;
    } else {
      console.error(
        `Invalid value for "current". Expected a boolean but got ${typeof isCurrent}.`,
      );
    }
  }

  getCurrent() {
    return this.current;
  }

  setCompleted(isCompleted) {
    if (typeof isCompleted === "boolean") {
      this.completed = isCompleted;
    } else {
      console.error(
        `Invalid value for "completed". Expected a boolean but got ${typeof isCompleted}.`,
      );
    }
  }

  getCompleted() {
    return this.completed;
  }

  calculateEndTime(startTime, duration) {
    return new Date(startTime.getTime() + duration * 60 * 60 * 1000);
  }

  setStartTime(startTime) {
    if (startTime instanceof Date) {
      this.startTime = startTime;
    } else {
      console.error("Invalid start time. Expected a Date object.");
    }
  }

  getStartTime() {
    return this.startTime;
  }

  setEndTime(endTime = null) {
    if (endTime instanceof Date) {
      this.endTime = endTime;
    } else if (this.getStartTime() && this.getDuration()) {
      this.endTime = this.calculateEndTime(
        this.getStartTime(),
        this.getDuration(),
      );
    } else {
      console.warn(
        "The task has not been assigned a start time or duration yet.",
      );
    }
  }

  getEndTime() {
    return this.endTime;
  }

  setDuration(duration) {
    if (typeof duration === "number" && duration > 0 && duration <= 24) {
      this.duration = duration;
      if (this.getStartTime()) {
        this.setEndTime();
      }
    } else {
      console.error(
        "Invalid duration. Must be a positive number between 1 and 24.",
      );
    }
  }

  getDuration() {
    return this.duration;
  }

  startTask() {
    if (this.getCurrent()) {
      console.warn(`Task "${this.name}" is already running.`);
      return;
    }
    let ambient = false;
    console.log(this.name);
    if (this.name.toLowerCase() === "naptime") {
      this.ambient_sound = new Audio("/sound/snoring.mp3");
      ambient = true;
    }
    if (this.name.toLowerCase() === "sleep") {
      console.log("sleep-2");
      this.ambient_sound = new Audio("/sound/snoring.mp3");
      ambient = true;
    }
    if (ambient) {
      this.ambient_sound.volume = 0.2;
      this.ambient_sound.loop = true;
      this.ambient_sound.play();
    }
    this.setCurrent(true);
    console.log(`Task "${this.name}" has started.`);
  }

  changeTime(newStartTime) {
    if (!(newStartTime instanceof Date)) {
      console.error("Invalid time provided. Expected a Date object.");
      return;
    }
    if (!this.getMovable()) {
      console.warn(`Task "${this.name}" is not movable.`);
      return;
    }
    if (newStartTime < Date.now()) {
      console.error("New start time cannot be in the past.");
      return;
    }
    this.setStartTime(newStartTime);
    this.setEndTime(this.calculateEndTime(newStartTime, this.getDuration()));
    console.log(
      `Task "${this.name}" time changed. New start time: ${this.getStartTime()}, New end time: ${this.getEndTime()}`,
    );
  }

  abortTask() {
    if (!this.getCompleted()) {
      this.setCompleted(false);
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
      return false;
    }

    if (this.getCompleted()) {
      console.warn(`Task "${this.name}" is already completed.`);
      return false;
    }

    this.setCompleted(true);

    if (Object.keys(this.getAttributeImpactsObject()).length === 0) {
      console.warn(`Task "${this.name}" has no attribute impacts defined.`);
      return false;
    }

    // Apply attribute impacts to player attributes
    for (let key in this.getAttributeImpactsObject()) {
      if (!playerAttributes.hasOwnProperty(key)) {
        console.error(`Player attributes lacks attribute: ${key}`);
        continue;
      }

      playerAttributes[key] += this.getAttributeImpact(key);
      playerAttributes[key] = Math.min(100, Math.max(0, playerAttributes[key]));
    }
    if (this.ambient_sound) {
      this.ambient_sound.pause();
      this.ambient_sound = null;
    }

    console.log(`Task "${this.name}" completed successfully.`);
    //select sound type
    console.log(this.category);
    let completedSound = new Audio("/sound/heal.mp3");
    completedSound.volume = 0.2;
    if (this.category.toLowerCase() === "mental") {
      completedSound = new Audio("/sound/mental.mp3");
      completedSound.volume = 0.3;
    } else if (this.category.toLowerCase() === "academic") {
      completedSound = new Audio("/sound/page-flip.mp3");
      completedSound.volume = 0.3;
    } else if (this.category.toLowerCase() === "social") {
      completedSound = new Audio("/sound/social.mp3");
      completedSound.volume = 0.3;
    } // Adjust volume as needed
    completedSound.play();
    return true;
  }

  isOverdue(currentGameTime) {
    if (!this.getEndTime()) {
      //console.error(`End time for task "${this.name}" is not set.`);
      return false;
    }
    const overdue = currentGameTime > this.getEndTime();
    console.log(
      `Task "${this.name}" is ${overdue ? "overdue" : "not overdue"}.`,
    );
    return overdue;
  }

  resetCompleted() {
    this.setCompleted(false);
  }

  setOptional(optional) {
    if (typeof optional === "boolean") {
      this.optional = optional;
    } else {
      console.error(
        `Incorrect data type. Required type: boolean. Provided type: ${typeof optional}`,
      );
    }
  }

  getOptional() {
    return this.optional;
  }

  setMovable(movable) {
    if (typeof movable === "boolean") {
      this.movable = movable;
    } else {
      console.error(
        `Incorrect data type. Required type: boolean. Provided type: ${typeof movable}`,
      );
    }
  }

  getMovable() {
    return this.movable;
  }

  setAttributeImpacts(key, value) {
    if (
      this.attributeImpacts.hasOwnProperty(key) &&
      value >= -100 &&
      value <= 100
    ) {
      this.attributeImpacts[key] = value;
    } else {
      console.error(
        `Attribute impact values should be between -100 and +100.\nAttribute keys should be 'academics', 'socialLife', 'energy', or 'mentalHealth'.`,
      );
    }
  }

  getAttributeImpactsObject() {
    return this.attributeImpacts;
  }

  getAttributeImpact(key) {
    if (this.attributeImpacts.hasOwnProperty(key)) {
      return this.attributeImpacts[key];
    } else {
      console.error(`Key: ${key} does not exist in the attribute impacts.`);
    }
  }

  overlapsWith(otherTask) {
    if (!(otherTask instanceof Task)) {
      console.error(
        `Invalid task provided for overlap check with "${this.name}".`,
      );
      return false;
    }
    return (
      this.getStartTime() < otherTask.getEndTime() &&
      this.getEndTime() > otherTask.getStartTime()
    );
  }

  setDifficulty(difficulty) {
    if (difficulty >= 1 && difficulty <= 4) {
      this.difficulty = difficulty;
    } else {
      console.error("Difficulty should be between 1 and 4.");
    }
  }

  getDifficulty() {
    return this.difficulty;
  }

  toJSON() {
    return {
      name: this.name,
      category: this.getCategory(),
      startTime: this.getStartTime(),
      endTime: this.getEndTime(),
      duration: this.getDuration(),
      completed: this.getCompleted(),
      attributeImpacts: this.getAttributeImpactsObject(),
      difficulty: this.getDifficulty(),
    };
  }

  debug() {
    console.log(this.toJSON());
  }

  initializeFromData(data) {
    this.id = data.id;
    this.setCategory(data.category);
    this.description = data.description;
    this.icon = data.icon;
    this.completed = data.completed;
    this.locked = true; // Ensuring all tasks are locked
    this.current = data.current;
    this.duration = data.duration;
    this.reusable = data.reusable;
    this.attributeImpacts = data.attributeImpacts;
    return this;
  }
}
