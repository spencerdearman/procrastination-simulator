import { v4 as uuid } from "uuid";
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
    if (!task.startTime || !task.endTime) return false;

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

export const DaysOfWeek = Object.freeze({
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
});

const uuidRegex =
  /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

export default class Day {
  constructor(dayOfWeek) {
    this.id = uuid(); // Generate random ID
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

    // Stores the change in attributes from day to day
    this.attributeChanges = {
      academics: 0,
      socialLife: 0,
      energy: 0,
      mentalHealth: 0,
    };

    this.isCompleted = false;
    this.logs = [];
    this.dayOfWeek = dayOfWeek;
  }

  getTomorrow() {
    return this.dayOfWeek + (1 % 7);
  }

  getDayOfWeek() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[this.dayOfWeek];
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

  unplanTask(task) {
    if (!(task instanceof Task)) {
      console.error("Invalid task. Must be an instance of Task.");
      return;
    }

    if (
      this.unplannedTasks.find((t) => t.id === task.id) ||
      task.completed ||
      task.current ||
      uuidRegex.test(task.id)
    ) {
      return;
    }

    task.startTime = null;
    task.endTime = null;
    this.tasks = this.tasks.map((t) => (t?.id === task.id ? null : t));
    this.unplannedTasks.unshift(task);
    return;
  }

  logTaskPlanning(task) {
    if (!this.logs || !Array.isArray(this.logs)) {
      console.error("logs not available");
      return;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      taskName: task.name,
      taskDescription: task.description,
      taskStartTime: task.startTime.toISOString(),
    };

    this.logs.push(logEntry);
  }

  // Intended to be called after the task is completed
  logTaskCompleted(task, playerAttributes) {
    if (!this.logs || !Array.isArray(this.logs)) {
      console.error("logs not available");
      return;
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      taskName: task.name,
      taskDescription: task.description,
      taskAttributes: task.attributeImpacts,
      playerStatsBeforeUpdate: playerAttributes,
    };

    this.logs.push(logEntry);
  }

  static createReusableTaskId(task) {
    if (!(task instanceof Task)) {
      console.error("Invalid task. Must be an instance of Task.");
      return;
    }

    const id = `${task.id}-${uuid()}`;
    if (!uuidRegex.test(id)) {
      console.error("Improper reusable ID structure. Something went wrong");
      return;
    }
    return id;
  }

  canPlanTask(index, gameTime, task = null) {
    if (
      index < 0 ||
      index >= this.tasks.length ||
      index < gameTime?.getHours() ||
      this.tasks[index] !== null ||
      task?.completed
    ) {
      return false;
    }
    return true;
  }

  // THIS GETS CALLED BY LOGIC ONLY
  planTask(task, index, date) {
    if (!(task instanceof Task)) {
      return false;
    }

    if (!this.canPlanTask(index, date, task)) return false;

    let taskToSchedule = task;

    if (task.reusable) {
      taskToSchedule = new Task(task.name);
      taskToSchedule.initializeFromData(task);
      taskToSchedule.id = Day.createReusableTaskId(task);
      taskToSchedule.reusable = false; // The copy isn't reusable
    }

    // Create a new startTime based on the given index and date
    const plannedStartTime = new Date(date);
    plannedStartTime.setHours(index, 0, 0, 0); // Set hour to match index, reset minutes/seconds

    // Set task time values
    taskToSchedule.setStartTime(plannedStartTime);
    taskToSchedule.setEndTime(); // Auto-calculates end time based on duration

    // If this is a move attempt (task was on the calendar previously),
    // remove it from its previous location
    const oldIndex = this.tasks.findIndex(
      (t) => t && t.id === taskToSchedule.id,
    );
    if (oldIndex !== -1) {
      this.tasks[oldIndex] = null;
    }

    // Move task to planned tasks
    this.tasks[index] = taskToSchedule;

    if (!task.reusable) {
      this.unplannedTasks = this.unplannedTasks.filter((t) => t.id !== task.id);
    }

    // Log the successful task planning
    this.logTaskPlanning(taskToSchedule);

    return true;
  }

  // Removes a task from the task list of the day
  deleteTask(taskName) {
    const index = this.tasks.findIndex((task) => task.name === taskName);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }

  // Updates the list of completed tasks (ideally at the end of the day)
  updateCompleted(endAttributes) {
    this.completedTasks = [];
    for (let task of this.tasks) {
      if (task && task.completed) {
        this.completedTasks.push(task);
      }
    }

    const logEntry = {
      timestamp: new Date().toISOString(),
      endingAttributes: endAttributes,
    };
    this.logs.push(logEntry);
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
