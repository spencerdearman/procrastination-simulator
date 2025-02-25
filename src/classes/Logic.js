import Time from "./Time.js";
import Day from "./Day.js";
import Player from "./Player.js";
import Task from "./Task.js";

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
      task.completed = data.completed;
      task.locked = true; // Ensuring all tasks are locked
      task.current = data.current;
      task.duration = data.duration;
  
      // Set start and end time conditionally
      if (data.locked && data.startTime && data.endTime) {
        task.startTime = new Date(data.startTime);
        task.endTime = new Date(data.endTime);
        if (isNaN(task.startTime) || isNaN(task.endTime)) {
          console.error(
            `Invalid time for locked task "${task.name}":`,
            data.startTime,
            data.endTime
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

    const parsedTasks = this.parseTasks(taskDataArray);
    // now we have all the tasks in a third party list

    //filter to the corresponding days/unplanned list and tasks
    // todo: filter for each day
    parsedTasks.forEach((task) => this.currentDay.addTask(task));
    console.log("Tasks added to Day 1:", this.currentDay.tasks);

    this.startGameLoop();
  }

  startGameLoop() {
    if (this.gameLoopInterval) {
      return;
    }
  
    this.gameLoopInterval = setInterval(() => {
      const currentGameTime = this.time.getCurrentGameTime();
      const currentHourIndex = this.currentDay.getCurrentGameHour(currentGameTime);
      
      console.log(`Checking game time: ${currentGameTime.toLocaleTimeString()}, Hour Index: ${currentHourIndex}`);
  
      if (this.currentRunningTask) {
        if (currentGameTime >= this.currentRunningTask.endTime) {
          console.log(`Completing Task: ${this.currentRunningTask.name}`);
          this.currentRunningTask.completeTask(this.player.attributes);
          this.currentDay.updateCompleted();
          this.currentRunningTask = null;
        }
      } else {
        if (currentHourIndex >= 0 && currentHourIndex < this.currentDay.tasks.length) {
          const task = this.currentDay.tasks[currentHourIndex];
  
          if (task && !task.completed && this.isWithinTimeWindow(task, currentGameTime)) {
            console.log(`Starting Task: ${task.name} at ${currentGameTime.toLocaleTimeString()}`);
            task.startTask();
            this.currentRunningTask = task;
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
}
