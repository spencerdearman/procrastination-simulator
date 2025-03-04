import Time from "./Time.js";
import Task from "./Task.js";
import Notification from "./Notification.js";
import Day, { DaysOfWeek, DayUtils } from "./Day.js";
import { ATTRIBUTE_BITS } from "./Player.js";

export default class Logic {
  // Accept an optional timeInstance to ensure a shared reference between logic and UI
  constructor(numDays, timeInstance, player, dayEndCallback) {
    this.days = [];
    Array.from({ length: numDays }).forEach((_, i) => {
      let dayOfWeek =
        i === 0 ? DaysOfWeek.MONDAY : this.days[i - 1].getTomorrow();
      this.days.push(new Day(dayOfWeek));
    });

    this.currentDayIndex = 0;
    this.currentDay = this.days[0];
    this.time = timeInstance || new Time();
    this.tasksCompleted = [];
    this.timeXSpeed = 1;
    this.notificationsQueue = [];
    this.currentNotification = null;
    this.player = player;
    this.availableTasks = [];
    this.dayEndCallback = dayEndCallback;
  }

  getTasks() {
    return [
      ...this.currentDay.tasks.filter(Boolean),
      ...this.currentDay.unplannedTasks,
    ];
  }

  getAttributes() {
    return this.player.getAttributes();
  }

  getCurrentDay() {
    return this.currentDay;
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

  initializeCurrentDay() {
    //filter to the corresponding days/unplanned list and tasks
    this.availableTasks.forEach((task) => {
      if (
        !task.completed &&
        (!task.startTime ||
          DayUtils.isSameDay(this.time.lastGameRecordTime, task.startTime))
      ) {
        this.currentDay.addTask(task);
      }
    });
  }

  startGame(taskDataArray) {
    const parsedTasks = this.parseTasks(taskDataArray);
    this.availableTasks = parsedTasks;
    // now we have all the tasks in a third party list

    this.initializeCurrentDay();
    console.log("Tasks added to Day 1:", this.currentDay.tasks);

    // Subscribe to time updates
    this.timeUnsubscribe = this.time.subscribe((newTime) => {
      this.handleGameTick(this.time, newTime);
      this.time = newTime;
    });

    return parsedTasks;
  }

  endGame() {
    this.time.stopGameLoop();
    this.currentDay = null;
  }

  // CALL THIS FOR MOVING TASKS FROM PLANNED TO UNPLANNED
  logicPlanTask(task, index) {
    const currentGameTime = this.time.getCurrentGameTime();
    let newGameTime = new Date(currentGameTime);

    if (this.currentDay.planTask(task, index, newGameTime) && !task.reusable) {
      this.availableTasks = this.availableTasks.filter((t) => t.id !== task);
    }
  }

  // CALL THIS FOR MOVING PLANNED TASKS
  logicMovePlannedTask(task, index) {
    const currentGameTime = this.time.getCurrentGameTime();
    let newGameTime = new Date(currentGameTime);

    this.currentDay.movePlannedTask(task, index, newGameTime);
  }

  handleGameTick(oldTime, newTime) {
    const currentGameTime = newTime.getCurrentGameTime();
    const currentHourIndex =
      this.currentDay.getCurrentGameHour(currentGameTime);

    const updatedAttributesBitmap = this.handleRunningTask(currentGameTime);
    this.handleTaskStart(currentGameTime, currentHourIndex);
    this.checkAndTriggerNotification();

    // Decrement attributes, passing the bitmap of updated attributes
    const attributes = this.player.decrementAttributes(updatedAttributesBitmap);

    this.checkDayEnd(oldTime, newTime);
    return attributes;
  }

  handleRunningTask(currentGameTime) {
    let updatedAttributesBitmap = 0;
    const playerAttributesBeforeUpdate = this.player.attributes;
    if (
      this.currentRunningTask &&
      currentGameTime >= this.currentRunningTask.endTime
    ) {
      console.log(`Completing Task: ${this.currentRunningTask.name}`);

      // Apply task's attribute impacts and update bitmap
      Object.entries(this.currentRunningTask.attributeImpacts).forEach(
        ([attribute, impact]) => {
          if (impact !== 0) {
            this.player.addPoints(attribute, impact);
            // Update bitmap for non-zero impacts
            updatedAttributesBitmap |= ATTRIBUTE_BITS[attribute];
          }
        },
      );

      if (this.currentRunningTask.completeTask(this.player.attributes)) {
        this.currentDay.logTaskCompleted(
          this.currentRunningTask,
          playerAttributesBeforeUpdate,
        );
      }
      this.currentDay.updateCompleted();
      this.currentRunningTask = null;
      return updatedAttributesBitmap;
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

  checkDayEnd(oldTime, newTime) {
    if (
      !DayUtils.isSameDay(
        oldTime.getCurrentGameTime(),
        newTime.getCurrentGameTime(),
      )
    ) {
      // End the current day
      newTime.stopGameLoop();

      this.completeDay(newTime);
    }
  }

  applyAttributeChanges(changes) {
    for (let [key, value] of Object.entries(changes)) {
      this.player.addPoints(key, value);
    }
  }

  beginDay() {
    this.time.startGameLoop();
  }

  // FOR THE NEXT DAY: call startGameLoop() again
  completeDay(tomorrow) {
    // Move to the next day
    this.currentDayIndex++;
    if (this.currentDayIndex >= this.days.length) {
      this.endGame();
      return;
    }

    const currentDay = this.currentDay;
    const nextDay = this.days[this.currentDayIndex];
    this.currentDay.updateCompleted(this.player.attributes);
    this.currentDay = nextDay;
    this.initializeCurrentDay();

    this.dayEndCallback(
      currentDay,
      nextDay,
      tomorrow.getCurrentGameTime(),
      this.getTasks(),
    );
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
