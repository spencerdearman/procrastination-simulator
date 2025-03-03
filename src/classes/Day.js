import Task from "./Task.js";

export class DayUtils {
  static isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  static isWithinTimeWindow(task, currentGameTime) {
    if (!task.startTime || !task.endTime) return true;

    if (!(currentGameTime instanceof Date)) {
      console.error(
        "currentGameTime is not a valid Date object:",
        currentGameTime,
      );
      return false;
    }

    return task.startTime <= currentGameTime && currentGameTime <= task.endTime;
  }

  static getCurrentGameHour(time) {
    if (!(time instanceof Date) && typeof time !== "string") {
      throw new Error("Time must be a string or a Date object");
    }

    const dateTime = new Date(time);

    if (isNaN(dateTime.getTime())) {
      throw new Error(`Invalid date format: ${time}`);
    }

    return dateTime.getHours();
  }
}

export default class Day {
  constructor() {
    this.id = Math.random().toString(36).substring(2, 15); // Generate random ID
    this.notifications = []; // Stores the list of notification class objects
    // Stores the list of task class objects ACTUALLY ON CALENDAR
    this.tasks = [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    this.unplannedTasks = []; // Stores the list of task class objects with completed == false

    this.completedTasks = []; // Stores the list of task class objects with completed == true
    this.rollover = []; // Movable but uncompleted tasks

    // JS equivalent of an enumerator
    this.DaysOfWeek = Object.freeze({
      SUNDAY: 0,
      MONDAY: 1,
      TUESDAY: 2,
      WEDNESDAY: 3,
      THURSDAY: 4,
      FRIDAY: 5,
      SATURDAY: 6,
    });

    // Stores the change in attributes from day to day
    this.attributeChanges = {
      academics: 0,
      socialLife: 0,
      energy: 0,
      mentalHealth: 0,
    };

    this.isCompleted = false;
  }

  // Adds a notification to the notification list of the day
  addNotification(notification) {
    if (!(notification instanceof Notification)) {
      console.error(
        "Invalid Notification. Must be an instance of Notification.",
      );
      return;
    }

    this.notifications.push(notification);
  }

  getCurrentGameHour(time) {
    return DayUtils.getCurrentGameHour(time);
  }

  addTask(task) {
    if (!(task instanceof Task)) {
      console.error("Invalid task. Must be an instance of Task.");
      return;
    }

    if (!task.startTime) {
      this.unplannedTasks.push(task);
      return;
    }

    console.log(`Task "${task.name}" start time:`, task.startTime);
    const index = this.getCurrentGameHour(task.startTime);

    if (isNaN(index) || index < 0 || index >= this.tasks.length) {
      console.error(`Invalid task index for "${task.name}":`, index);
      return;
    }

    if (this.tasks[index] !== null) {
      console.error(
        `Task conflict: "${task.name}" overlaps with an existing task at index ${index}.`,
      );
      return;
    }

    console.log(`Task "${task.name}" scheduled at index ${index}.`);
    this.tasks[index] = task;
  }

  // THIS GETS CALLED BY LOGIC ONLY
  planTask(task, index, date) {
    let taskToSchedule = task;
    if (!(task instanceof Task)) {
      console.error("Invalid task. Must be an instance of Task.");
      return false;
    }

    if (index < 0 || index >= this.tasks.length) {
      console.error(`Invalid task index for "${task.name}":`, index);
      return false;
    }

    if (this.tasks[index] !== null) {
      console.error(
        `Task conflict: "${task.name}" overlaps with an existing task at index ${index}.`,
      );
      return false;
    }

    if (task.reusable) {
      taskToSchedule = new Task(task.name);
      taskToSchedule.initializeFromData(task.toJSON());
      taskToSchedule.id = `${task.id}-${Date.now()}`; // Unique ID
      taskToSchedule.reusable = false; // The copy isn't reusable
    }

    // Create a new startTime based on the given index and date
    const plannedStartTime = new Date(date);
    plannedStartTime.setHours(index, 0, 0, 0); // Set hour to match index, reset minutes/seconds

    // Set task time values
    taskToSchedule.setStartTime(plannedStartTime);
    taskToSchedule.setEndTime(); // Auto-calculates end time based on duration

    // Move task to planned tasks
    this.tasks[index] = taskToSchedule;

    if (!task.reusable) {
      this.unplannedTasks = this.unplannedTasks.filter((t) => t.id !== task.id);
    }
    return true;
  }

  // DONT CALL THIS
  movePlannedTask(task, index, date) {
    console.log("entering movePlannedTask");
    if (!(task instanceof Task)) {
      console.error("Invalid task. Must be an instance of Task.");
      return;
    }

    if (index < 0 || index >= this.tasks.length) {
      console.error(`Invalid task index for "${task.name}":`, index);
      return;
    }

    if (this.tasks[index] !== null) {
      console.error(
        `Task conflict: "${task.name}" overlaps with an existing task at index ${index}.`,
      );
      return;
    }

    // Create a new startTime based on the given index and date
    const plannedStartTime = new Date(date);
    plannedStartTime.setHours(index, 0, 0, 0); // Set hour to match index, reset minutes/seconds

    // Set task time values
    task.setStartTime(plannedStartTime);
    task.setEndTime(); // Auto-calculates end time based on duration

    // Move task to planned tasks
    const oldIndex = this.tasks.findIndex((t) => t === task);
    this.tasks[oldIndex] = null;
    console.log("index", index);
    console.log("oldIndex", oldIndex);
    this.tasks[index] = task;
  }

  // Removes a task from the task list of the day
  deleteTask(taskName) {
    const index = this.tasks.findIndex((task) => task.name === taskName);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  // Updates the list of completed tasks (ideally at the end of the day)
  updateCompleted() {
    this.completedTasks = [];
    for (let task of this.tasks) {
      if (task && task.completed) {
        this.completedTasks.push(task);
      }
    }

    this.isCompleted = true;
  }

  removeCompletedNotifications() {
    this.notifications = this.notifications.filter(
      (notification) => !notification.getCompleted(),
    );
  }

  // Updates the tasks that will rollover to the next day
  updateRollover() {
    this.rollover = [];
    for (let task of this.tasks) {
      if (!(task.completed && task.movable)) {
        this.rollover.push(task);
      }
    }
  }
}
