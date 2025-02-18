import Time from "./Time.js";
import Day from "./Day.js";
import Player from "./Player.js";
import Task from "./Task.js";

export default class Logic {
  constructor(player, days) {
    this.player = player; // Player object
    this.days = days; // List of Day objects
    this.currentDayIndex = 0; // Start at day 0
    this.currentDay = days[0]; // Current day object
    this.time = new Time(); // Time object to manage game time
    this.tasksCompleted = [];
  }

  // Seeds the player attributes at the start
  seedPlayer(playerAttributes) {
    Object.assign(this.player.attributes, playerAttributes);
  }

  // Inits all basic components for Logic object
  seedGame() {
    let play = Player("Test");
    let sun = Day();
    this.seedTask(sun);
    let mon = Day();
    this.seedTask(mon);
    let tue = Day();
    this.seedTask(tue);
    let wed = Day();
    this.seedTask(wed);
    let thu = Day();
    this.seedTask(thu);
    let fri = Day();
    this.seedTask(fri);
    let sat = Day();
    this.seedTask(sat);
    let days = [sun, mon, tue, wed, thu, fri, sat];
    let gameLogic = Logic(play, days);

    return gameLogic;
  }

  seedTask(day) {
    const task1 = new Task("Study for Exam");
    task1.setCategory("academic");
    task1.setAttributeImpacts("academics", 10);
    day.addTask(task1);

    const task2 = new Task("Social Meetup");
    task2.setCategory("social");
    task2.setAttributeImpacts("socialLife", 15);
    day.addTask(task2);
  }

  // Starts a new day and applies rollover tasks from the previous day
  startNewDay() {
    if (this.currentDayIndex < this.days.length - 1) {
      const previousDay = this.currentDay;

      // Handle rollover tasks
      previousDay.updateRollover();
      const rolloverTasks = previousDay.rollover;

      // Increment day
      this.currentDayIndex++;
      this.currentDay = this.days[this.currentDayIndex];

      // Add rollover tasks to the new day
      rolloverTasks.forEach((task) => this.currentDay.addTask(task));

      // Apply attribute changes from the previous day
      this.applyAttributeChanges(previousDay.attributeChanges);

      console.log(`Day ${this.currentDayIndex + 1} started.`);
    } else {
      console.log("All days completed. Game over!");
    }
  }

  // Ends the current day by updating completed tasks
  endDay() {
    this.currentDay.updateCompleted();
    console.log(`Day ${this.currentDayIndex + 1} ended.`);
  }

  // Applies the attribute changes (from tasks and day events) to the player
  applyAttributeChanges(changes) {
    for (let [key, value] of Object.entries(changes)) {
      this.player.addPoints(key, value);
    }
  }

  // Adds a task to the current day
  addTaskToCurrentDay(task) {
    if (!(task instanceof Task)) {
      console.error("Invalid Task object.");
      return;
    }
    this.currentDay.addTask(task);
    console.log(
      `Task "${task.name}" added to Day ${this.currentDayIndex + 1}.`,
    );
  }

  // Deletes a task from the current day
  deleteTaskFromCurrentDay(taskName) {
    this.currentDay.deleteTask(taskName);
    console.log(
      `Task "${taskName}" removed from Day ${this.currentDayIndex + 1}.`,
    );
  }

  // Completes a task and applies its effects to the player
  completeTask(taskName) {
    const task = this.currentDay.tasks.find((t) => t.name === taskName);
    if (!task) {
      console.error(`Task "${taskName}" not found.`);
      return;
    }
    task.completeTask(this.player.attributes);
    this.currentDay.updateCompleted();
  }

  // Displays current in-game time
  showGameTime() {
    const gameTime = this.time.getCurrentGameTime();
    console.log(`Current Game Time: ${gameTime.toLocaleTimeString()}`);
  }

  // Checks all days for completed tasks to self assign
  totalTasksCompleted() {
    for (let day of this.days) {
      let tList = day.completedTasks;
      for (let task of tList) {
        this.tasksCompleted.push(task);
      }
    }
  }

  // Skips time by a certain number of hours (useful for fast-forwarding)
  skipTime(hours) {
    const newTime = new Date(this.time.currentTime.getTime());
    newTime.setHours(newTime.getHours() + hours);
    this.time.setCurrentTime(newTime);
    console.log(
      `Time skipped. Current Time: ${this.time.currentTime.toLocaleTimeString()}`,
    );
  }

  // Displays all tasks for the current day
  listTasks() {
    console.log(`Tasks for Day ${this.currentDayIndex + 1}:`);
    this.currentDay.tasks.forEach((task) => {
      console.log(
        `- ${task.name} (Status: ${task.getStatus()}, Completed: ${task.getCompleted() ? "Yes" : "No"})`,
      );
    });
  }

  // Displays the player's attributes
  showPlayerAttributes() {
    console.log("Player Attributes:", this.player.getAllAttributes());
  }
}
