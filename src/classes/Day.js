import Task from "./Task.js";
// import Notification from './Notification';

export default class Day {
  constructor() {
    this.notifications = []; // Stores the list of notification class objects
    this.tasks = []; // Stores the list of task class objects

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

  // Adds a task to the task list of the day
  addTask(task) {
    if (!(task instanceof Task)) {
      console.error("Invalid task. Must be an instance of Task.");
      return;
    }

    this.tasks.push(task);
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
      if (task.completed) {
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
