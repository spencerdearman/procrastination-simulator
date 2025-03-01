import Time from "./Time.js";
import Task from "./Task.js";
import Notification from "./Notification.js";
import { DayUtils } from "./Day.js";

export default class Logic {
  // Accept an optional timeInstance to ensure a shared reference between logic and UI
  constructor(days, timeInstance) {
    this.days = days;
    this.currentDayIndex = 0;
    this.currentDay = days[0];
    this.time = timeInstance || new Time();
    this.tasksCompleted = [];
    this.timeXSpeed = 1;
    this.notificationsQueue = [];
    this.currentNotification = null;
  }

  parseTasks(taskDataArray) {
    return taskDataArray.map((data) => {
      const task = new Task(data.name).initializeFromData(data);

      // Set start and end time conditionally
      if (data.locked && data.startTime && data.endTime) {
        task.startTime = new Date(data.startTime);
        task.endTime = new Date(data.endTime);
        if (isNaN(task.startTime) || isNaN(task.endTime)) {
          console.error(
            `Invalid time for locked task "${task.name}":`,
            data.startTime,
            data.endTime,
          );
        }
      } else {
        task.startTime = null;
        task.endTime = null;
      }

      // Set attribute impacts
      for (let key in data.attributeImpacts) {
        task.setAttributeImpacts(key, data.attributeImpacts[key]);
      }

      return task;
    });
  }

  isWithinTimeWindow(task, currentGameTime) {
    return DayUtils.isWithinTimeWindow(task, currentGameTime);
  }

  startGame(taskDataArray) {
    const parsedTasks = this.parseTasks(taskDataArray);
    // now we have all the tasks in a third party list

    //filter to the corresponding days/unplanned list and tasks
    parsedTasks.forEach((task) => {
      if (
        !task.startTime ||
        DayUtils.isSameDay(this.time.lastGameRecordTime, task.startTime)
      ) {
        this.currentDay.addTask(task);
      }
    });
    console.log("Tasks added to Day 1:", this.currentDay.tasks);

    this.startGameLoop();
  }

  // CALL THIS FOR MOVING TASKS FROM PLANNED TO UNPLANNED
  logicPlanTask(task, index) {
    const currentGameTime = this.time.getCurrentGameTime();
    let newGameTime = new Date(currentGameTime);

    this.currentDay.planTask(task, index, newGameTime);
  }

  // CALL THIS FOR MOVING PLANNED TASKS
  logicMovePlannedTask(task, index) {
    const currentGameTime = this.time.getCurrentGameTime();
    let newGameTime = new Date(currentGameTime);

    this.currentDay.movePlannedTask(task, index, newGameTime);
  }

  startGameLoop() {
    // Subscribe to time updates
    this.timeUnsubscribe = this.time.subscribe((newTime) => {
      this.time = newTime;
      this.handleGameTick(newTime);
    });

    // Start the game loop
    this.time.startGameLoop();
  }

  handleGameTick() {
    const currentGameTime = this.time.getCurrentGameTime();
    const currentHourIndex =
      this.currentDay.getCurrentGameHour(currentGameTime);

    this.attributesUpdatedThisTick = false;
    this.handleRunningTask(currentGameTime);
    this.handleTaskStart(currentGameTime, currentHourIndex);
    this.checkAndTriggerNotification();

    // Only decrement attributes if no task was completed this tick
    if (!this.attributesUpdatedThisTick) {
      return this.player.decrementAttributes();
    }

    this.checkDayEnd(currentGameTime);
    return this.player.getAttributes();
  }

  getAttributes() {
    return this.player.getAttributes();
  }

  handleRunningTask(currentGameTime) {
    if (
      this.currentRunningTask &&
      currentGameTime >= this.currentRunningTask.endTime
    ) {
      console.log(`Completing Task: ${this.currentRunningTask.name}`);

      // Apply task's attribute impacts
      Object.entries(this.currentRunningTask.attributeImpacts).forEach(
        ([attribute, impact]) => {
          this.player.addPoints(attribute, impact);
        },
      );

      this.currentRunningTask.completeTask(this.player.attributes);
      this.currentDay.updateCompleted();
      this.currentRunningTask = null;
      this.attributesUpdatedThisTick = true;
    }
  }

  handleTaskStart(currentGameTime, currentHourIndex) {
    if (
      !this.currentRunningTask &&
      currentHourIndex >= 0 &&
      currentHourIndex < this.currentDay.tasks.length
    ) {
      const task = this.currentDay.tasks[currentHourIndex];

      if (
        task &&
        !task.completed &&
        this.isWithinTimeWindow(task, currentGameTime)
      ) {
        console.log(
          `Starting Task: ${task.name} at ${currentGameTime.toLocaleTimeString()}`,
        );
        task.startTask();
        this.currentRunningTask = task;
      }
    }
  }

  checkDayEnd(currentGameTime) {
    if (currentGameTime >= new Date("2025-01-01T23:59:59")) {
      this.completeDay();
    }
  }

  applyAttributeChanges(changes) {
    for (let [key, value] of Object.entries(changes)) {
      this.player.addPoints(key, value);
    }
  }

  // FOR THE NEXT DAY: call startGameLoop() again
  completeDay() {
    // End the current day
    clearInterval(this.gameLoopInterval);
    this.gameLoopInterval = null;

    // Move to the next day
    this.currentDayIndex++;
    if (this.currentDayIndex >= this.days.length) {
      console.log("Game Over!");
      return;
    }

    this.currentDay = this.days[this.currentDayIndex];
    this.currentDay.updateCompleted();
    this.time.stopTimer();
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

      // Dynamic random time based on the current game day
      const baseTime = this.time.getCurrentGameTime();
      const randomHour = Math.floor(Math.random() * (20 - 6) + 6);
      const randomMinute = Math.floor(Math.random() * 60);
      const randomTime = new Date(
        baseTime.getFullYear(),
        baseTime.getMonth(),
        baseTime.getDate(),
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
