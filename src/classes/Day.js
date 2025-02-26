import Task from "./Task.js";
import Time from "./Time.js";
// import Notification from './Notification';

export default class Day {
  constructor() {
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
    if (!(time instanceof Date) && typeof time !== "string") {
      throw new Error("Time must be a string or a Date object");
    }

    const dateTime = new Date(time);

    if (isNaN(dateTime.getTime())) {
      throw new Error(`Invalid date format: ${time}`);
    }

    return dateTime.getHours();
  }

  addTask(task) {
    if (!(task instanceof Task)) {
      console.error("Invalid task. Must be an instance of Task.");
      return;
    }

    if (!task.startTime) {
      console.log(`Unplanned task "${task.name}" added to unplannedTasks.`);
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
    this.tasks[index] = task;
    this.unplannedTasks = this.unplannedTasks.filter((t) => t !== task);
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
