import Time from "./Time.js";
import Task from "./Task.js";
import Notification from "./Notification.js";
import Day, { DaysOfWeek, DayUtils } from "./Day.js";
import { ATTRIBUTE_BITS } from "./Player.js";
import Player from "./Player.js";

export class GameEvent {
  constructor() {}

  notificationAvailable = (notification) => {};
  dayEnd = (currentDay, nextDay, startTime, tasks) => {};
}

export default class Logic {
  // Accept an optional timeInstance to ensure a shared reference between logic and UI
  constructor(numDays, timeInstance, player, notificationData) {
    this.days = [];
    Array.from({ length: numDays }).forEach((_, i) => {
      let dayOfWeek =
        i === 0 ? DaysOfWeek.MONDAY : this.days[i - 1].getTomorrow();
      this.days.push(new Day(dayOfWeek));
    });

    this.currentDayIndex = 0;
    this.currentDay = this.days[0];
    this.time = timeInstance || new Time();

    // Subscribe to time updates
    this.timeUnsubscribe = this.time.subscribe((newTime) => {
      this.handleGameTick(this.time, newTime);
      this.time = newTime;
    });

    this.tasksCompleted = [];
    this.timeXSpeed = 1;
    this.notificationsQueue = [];
    this.currentNotification = null;
    this.player = player instanceof Player ? player : new Player();
    this.availableTasks = [];
    this.notificationData = notificationData;
    this.eventHooks = new GameEvent();
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

    return parsedTasks;
  }

  endGame() {
    this.time.stopGameLoop();
    console.log("Game ended, but currentDay is retained for debugging.");
  }

  canPlanTask(index) {
    const currentGameTime = this.time.getCurrentGameTime();
    let newGameTime = new Date(currentGameTime);
    return this.currentDay.canPlanTask(index, newGameTime);
  }

  // CALL THIS FOR MOVING TASKS FROM PLANNED TO UNPLANNED
  planTask(task, index) {
    const currentGameTime = this.time.getCurrentGameTime();
    let newGameTime = new Date(currentGameTime);

    // You can't move the current task
    if (this.currentRunningTask === task) return;

    if (this.currentDay.planTask(task, index, newGameTime)) {
      if (!task.reusable) {
        this.availableTasks = this.availableTasks.filter((t) => t.id !== task);
      }

      // If the task was added during the current hour, ensure to set
      // the currentRunningTask to it
      if (DayUtils.isWithinTimeWindow(task, currentGameTime)) {
        this.currentRunningTask = task;
      }
    }
  }

  // CALL THIS FOR MOVING PLANNED TASKS
  movePlannedTask(task, index) {
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
    this.checkAndTriggerNotification(currentGameTime);

    // Decrement attributes, passing the bitmap of updated attributes
    const attributes = this.player.decrementAttributes(updatedAttributesBitmap);

    this.checkDayEnd(oldTime, newTime);
    return attributes;
  }

  handleRunningTask(currentGameTime) {
    const playerAttributesBeforeUpdate = this.player.attributes;
    let bitmap = 0;

    if (this.currentRunningTask) {
      bitmap = this.addPointsToPlayer(this.currentRunningTask.attributeImpacts);
      if (
        currentGameTime >= this.currentRunningTask.endTime &&
        this.currentRunningTask.completeTask()
      ) {
        this.currentDay.logTaskCompleted(
          this.currentRunningTask,
          playerAttributesBeforeUpdate,
        );
        this.currentDay.updateCompleted();
        this.currentRunningTask = null;
      }
    }
    return bitmap;
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
        DayUtils.isWithinTimeWindow(task, currentGameTime)
      ) {
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

  addPointsToPlayer(changes) {
    let updatedAttributesBitmap = 0;
    const tickIncrementFactor = 5;

    Object.entries(changes).forEach(([attribute, impact]) => {
      if (impact !== 0) {
        this.player.addPoints(
          attribute,
          Math.ceil(impact / tickIncrementFactor),
        );
        // Update bitmap for non-zero impacts
        updatedAttributesBitmap |= ATTRIBUTE_BITS[attribute];
      }
    });
    return updatedAttributesBitmap;
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

    this.loadNotifications(this.notificationData);

    this.eventHooks?.dayEnd(
      currentDay,
      nextDay,
      tomorrow.getCurrentGameTime(),
      this.getTasks(),
    );
  }

  // Load notifications from a JSON array
  loadNotifications(notificationDataArray) {
    if (!notificationDataArray || !Array.isArray(notificationDataArray)) {
      console.error("❌ Invalid notificationDataArray in Logic.js");
      return;
    }

    // Determine the active hours for notifications (e.g., 6AM to 10PM)
    const startHour = 2;
    const endHour = 22;
    const activeHours = endHour - startHour;
    const count = 4 + Math.floor(Math.random() * 5); // random value: 4, 5, 6, 7, or 8

    // Use only a subset of notifications for scheduling
    const notificationsToSchedule = notificationDataArray.slice(0, count);

    this.notificationsQueue = notificationsToSchedule.map((data, index) => {
      const notification = new Notification(
        data.header,
        data.notificationDuration,
        data.category,
        data.forced,
      );
      notification.setDescription(data.description);
      notification.setOptions(data.option1, data.option2);
      notification.setImpacts(
        data.impacts.option1Impact,
        data.impacts.option2Impact,
      );
      notification.setNarrative(data.narrativeOutcome);

      // Calculate start of this notification's interval
      const intervalStart = startHour + (activeHours / count) * index;

      // Calculate end of this notification's interval
      const intervalEnd = startHour + (activeHours / count) * (index + 1);

      // Choose a random hour within the interval
      const randomHour = Math.floor(
        intervalStart + Math.random() * (intervalEnd - intervalStart),
      );
      const randomMinute = Math.floor(Math.random() * 60);

      // Ensure notifications are always scheduled in the future
      let baseTime = new Date(this.time.getCurrentGameTime().getTime());
      baseTime.setHours(randomHour, randomMinute, 0, 0);

      // If the time is still before the game's start time, push it forward
      if (baseTime <= this.time.getCurrentGameTime()) {
        baseTime.setDate(baseTime.getDate() + 1);
      }

      notification.setNotificationTime(baseTime);
      return notification;
    });
    console.log(`📢 Loaded ${this.notificationsQueue.length} notifications.`);
  }

  // Check if it's time to trigger a notification
  checkAndTriggerNotification(currentGameTime) {
    if (this.currentNotification) return; // Wait until current one is resolved

    for (let notification of this.notificationsQueue) {
      const notificationTime = notification.getNotificationTime();
      const diff = currentGameTime - notificationTime; // difference in milliseconds

      // If overdue by more than 5 minutes, reschedule
      if (!notification.getCompleted() && diff > 5 * 60 * 1000) {
        const delayMinutes = 10 + Math.floor(Math.random() * 11); // 10 to 20 minutes
        const newTime = new Date(currentGameTime.getTime());
        newTime.setMinutes(newTime.getMinutes() + delayMinutes);
        notification.setNotificationTime(newTime);
        console.log(
          `Rescheduled notification "${notification.getHeader()}" to: ${newTime}`,
        );
        // Continue to next notification after rescheduling
        continue;
      }

      // Now, if the notification is due, trigger it
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

    // If the notification has a follow-up task, schedule it upon acceptance
    if (notification.getFollowUp()) {
      console.log(
        `📌 Follow-up task will be scheduled: ${notification.getFollowUp()}`,
      );
    }
  }

  resolveNotification() {
    console.log("🛑 Resolving notification...");
    // Remove the current notification from the queue and clear it immediately
    this.notificationsQueue.shift();
    this.currentNotification = null; // Clear immediately for UI update

    // Schedule the next notification after the cooldown period
    const cooldownInMilliseconds = 5 * 60 * 1000; // 5 minutes cooldown (adjust as needed)
    setTimeout(() => {
      if (this.notificationsQueue.length > 0) {
        this.currentNotification = this.notificationsQueue[0];
      }
      // Optionally, resume any paused activity here if needed
      if (!this.currentNotification && this.currentRunningTask) {
        console.log(
          "▶ Resuming previous task:",
          this.currentRunningTask.header,
        );
        this.currentRunningTask.resumePreviousActivity();
      }
    }, cooldownInMilliseconds);
  }

  // Accept the notification decision
  acceptNotification() {
    if (!this.currentNotification) return;

    console.log(`✅ Accepted: ${this.currentNotification.header}`);

    this.currentNotification.handleDecision(
      this.currentNotification.getOptions().option1,
      this.player.attributes,
    );

    // If the notification has a follow-up task, add it to the current day's schedule
    if (this.currentNotification.getFollowUp()) {
      const newTask = new Task(this.currentNotification.getFollowUp());
      newTask.setStartTime(this.time.getCurrentGameTime());
      newTask.setDuration(1); // Default to 1 hour for follow-ups
      this.currentDay.addTask(newTask);
      console.log(`📌 New Task Added: ${newTask.name}`);
    }

    this.resolveNotification();
  }

  // Reject the notification decision
  rejectNotification() {
    if (!this.currentNotification) return;
    console.log(`❌ Rejected: ${this.currentNotification.header}`);
    this.currentNotification.handleDecision(
      this.currentNotification.getOptions().option2,
      this.player.attributes,
    );
    this.resolveNotification();
  }
}
