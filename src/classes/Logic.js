import Time from "./Time.js";
import Day from "./Day.js";
import Player from "./Player.js";
import Task from "./Task.js";
import Notification from "./Notification.js";

export default class Logic {
  // Accept an optional timeInstance to ensure a shared reference between logic and UI
  constructor(player, days, timeInstance) {
    this.player = player;
    this.days = days;
    this.currentDayIndex = 0;
    this.currentDay = days[0];
    this.time = timeInstance || new Time();
    this.tasksCompleted = [];
    this.timeXSpeed = 1;
    this.notificationsQueue = [];
    this.currentNotification = null;
  }

  seedPlayer(playerAttributes) {
    Object.assign(this.player.attributes, playerAttributes);
  }

  parseTasks(taskDataArray) {
    return taskDataArray.map((data) => {
      const task = new Task(data.name);
      task.setCategory(data.category);
      task.description = data.description;
      task.icon = data.icon;
      task.duration = data.duration;

      task.startTime = new Date(data.startTime);
      task.endTime = new Date(data.endTime);

      if (isNaN(task.startTime) || isNaN(task.endTime)) {
        console.error(
          `Invalid time for task "${task.name}":`,
          data.startTime,
          data.endTime,
        );
      }

      for (let key in data.attributeImpacts) {
        task.setAttributeImpacts(key, data.attributeImpacts[key]);
      }
      task.difficulty = data.difficulty;
      return task;
    });
  }

  isWithinTimeWindow(task, currentGameTime) {
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

  startGame(taskDataArray) {
    this.seedPlayer({
      academics: 100,
      socialLife: 100,
      energy: 100,
      mentalHealth: 100,
    });
    console.log("Initial Player Attributes:", this.player.getAllAttributes());

    const tasks = this.parseTasks(taskDataArray);
    tasks.forEach((task) => this.currentDay.addTask(task));

    this.startGameLoop();
  }

  startGameLoop() {
    // Prevent multiple intervals from running
    if (this.gameLoopInterval) {
      console.warn("Game loop already running. Skipping reinitialization.");
      return;
    }

    this.gameLoopInterval = setInterval(() => {
      const currentGameTime = this.time.getCurrentGameTime();
      console.log(
        `Checking game time: ${currentGameTime.toLocaleTimeString()}`,
      );

      if (this.currentRunningTask) {
        if (currentGameTime >= this.currentRunningTask.endTime) {
          console.log(`Completing Task: ${this.currentRunningTask.name}`);
          this.currentRunningTask.completeTask(this.player.attributes);
          this.currentDay.updateCompleted();
          this.currentRunningTask = null;
        }
      } else {
        for (let task of this.currentDay.tasks) {
          if (
            !task.completed &&
            this.isWithinTimeWindow(task, currentGameTime)
          ) {
            console.log(
              `Starting Task: ${task.name} at ${currentGameTime.toLocaleTimeString()}`,
            );
            task.startTask();
            this.currentRunningTask = task;
            break;
          }
        }
      }
    }, 1000);
  }

  stopGameLoop() {
    if (this.gameLoopInterval) {
      clearInterval(this.gameLoopInterval);
      this.gameLoopInterval = null;
    }
  }

  endDay() {
    this.stopGameLoop();
    this.currentDay.updateCompleted();
    console.log(`Day ${this.currentDayIndex + 1} ended.`);
  }

  startNewDay() {
    if (this.currentDayIndex < this.days.length - 1) {
      const previousDay = this.currentDay;
      previousDay.updateRollover();
      const rolloverTasks = previousDay.rollover;

      this.currentDayIndex++;
      this.currentDay = this.days[this.currentDayIndex];

      rolloverTasks.forEach((task) => this.currentDay.addTask(task));
      this.applyAttributeChanges(previousDay.attributeChanges);
      console.log(`Day ${this.currentDayIndex + 1} started.`);
    } else {
      console.log("All days completed. Game over!");
    }
  }

  applyAttributeChanges(changes) {
    for (let [key, value] of Object.entries(changes)) {
      this.player.addPoints(key, value);
    }
  }

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

  deleteTaskFromCurrentDay(taskName) {
    this.currentDay.deleteTask(taskName);
    console.log(
      `Task "${taskName}" removed from Day ${this.currentDayIndex + 1}.`,
    );
  }

  completeTask(taskName) {
    const task = this.currentDay.tasks.find((t) => t.name === taskName);
    if (!task) {
      console.error(`Task "${taskName}" not found.`);
      return;
    }

    console.log(`Completing Task: ${task.name}`);
    // Calculate the new game time after task completion.
    const currentGameTime = this.time.getCurrentGameTime();
    let newGameTime = new Date(currentGameTime);
    newGameTime.setMinutes(newGameTime.getMinutes() + task.duration * 60); // task.duration is in hours

    // Update the shared Time instance so that both logic and UI reflect the new time.
    this.time.setCurrentGameTime(newGameTime);

    task.completeTask(this.player.attributes);
    this.currentDay.updateCompleted();

    console.log(`Updated Game Time after completing task: ${newGameTime}`);
  }

  // Load notifications from a JSON array
  loadNotifications(notificationDataArray) {
    this.notificationsQueue = notificationDataArray.map((data) => {
      const notification = new Notification(
        data.header,
        data.notificationDuration,
        data.forced,
      );
      notification.setDescription(data.description);
      notification.setOptions(data.option1, data.option2);
      notification.setImpacts(
        data.impacts.option1Impact,
        data.impacts.option2Impact,
      );
      notification.setNarrative(data.narrativeOutcome);

      // Randomize the notification time (between 6 AM to 8 PM in-game time)
      const randomHour = Math.floor(Math.random() * (20 - 6) + 6);
      const randomMinute = Math.floor(Math.random() * 60);
      const randomTime = new Date(
        this.time.gameStartTime.getFullYear(),
        this.time.gameStartTime.getMonth(),
        this.time.gameStartTime.getDate(),
        randomHour,
        randomMinute,
      );
      notification.setNotificationTime(randomTime);

      return notification;
    });
  }

  // Check if it's time to trigger a notification
  checkAndTriggerNotification(currentGameTime) {
    if (this.currentNotification) return; // Wait until the current notification is resolved

    for (let notification of this.notificationsQueue) {
      if (
        !notification.getCompleted() &&
        notification.getNotificationTime() <= currentGameTime
      ) {
        console.log(`🔔 Notification triggered: ${notification.getHeader()}`);
        this.triggerNotification(notification);
        break;
      }
    }
  }

  // Handle the notification logic (pause tasks if forced)
  triggerNotification(notification) {
    if (notification.getForced() && this.currentRunningTask) {
      notification.overrideActivity(this.currentRunningTask);
    }
    this.currentNotification = notification;
    console.log(`📝 Description: ${notification.getDescription()}`);
  }

  // Accept the notification decision
  acceptNotification() {
    if (!this.currentNotification) return;
    console.log(`✅ Accepted: ${this.currentNotification.getHeader()}`);
    this.currentNotification.handleDecision(
      this.currentNotification.getOptions().option1,
      this.player.attributes,
    );
    this.resolveNotification();
  }

  // Reject the notification decision
  rejectNotification() {
    if (!this.currentNotification) return;
    console.log(`❌ Rejected: ${this.currentNotification.getHeader()}`);
    this.currentNotification.handleDecision(
      this.currentNotification.getOptions().option2,
      this.player.attributes,
    );
    this.resolveNotification();
  }

  // Reset notification and resume previous activity if forced
  resolveNotification() {
    if (this.currentNotification.getForced()) {
      this.currentNotification.resumePreviousActivity();
    }
    console.log(`🎬 Resolved: ${this.currentNotification.getHeader()}`);
    this.currentNotification = null;
  }
}
