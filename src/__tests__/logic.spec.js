import Logic from "classes/Logic";
import Player from "classes/Player";
import Task from "classes/Task";
import Time, { DEFAULT_SPEED } from "classes/Time";
import { expect } from "@jest/globals";

const defaultTask = {
  id: "study-art-history",
  name: "Make Art History Note Cards",
  category: "academic",
  description:
    "Who thought a class about memorizing thousands of artworks was a good idea?",
  icon: "📖",
  startTime: null,
  endTime: null,
  completed: false,
  locked: false,
  current: false,
  duration: 1,
  attributeImpacts: {
    academics: 10,
    socialLife: 0,
    energy: -5,
    mentalHealth: 0,
  },
};

describe("Logic", () => {
  let player;

  beforeEach(() => {
    player = new Player("Matthew", false);
  });

  it("subscribes to time events on construction", () => {
    // Arrange
    const time = new Time();

    // Act
    const logic = new Logic(1, time);

    // Assert
    expect(time.subscribers.length).toBe(1);
    expect(logic.time).toBe(time);
  });

  it("doesn't complete task when a tick doesn't pass the task's end time", () => {
    // Arrange
    const task = new Task(defaultTask.name);
    task.initializeFromData(defaultTask);
    const time = new Time();
    const logic = new Logic(1, time, null, null, []);
    logic.planTask(task, 0);
    expect(logic.currentRunningTask).toBe(task);

    // Act
    time.tick();

    // Assert
    expect(logic.currentRunningTask).toBe(task);
    expect(task.completed).toBeFalsy();
  });

  it("completes task when a tick passes the task's end time", async () => {
    // Arrange
    const task = new Task(defaultTask.name);
    task.initializeFromData(defaultTask);
    const time = new Time(null, DEFAULT_SPEED / 50);
    const logic = new Logic(1, time, null, null, []);
    logic.planTask(task, 0);
    expect(logic.currentRunningTask).toBe(task);

    // Act
    await new Promise((resolve) => setTimeout(resolve, 100));
    time.tick();

    // Assert
    expect(logic.currentRunningTask).toBe(null);
    expect(task.completed).toBeTruthy();
  });

  it("sets the current task when the time has passed the task's start time after tick", async () => {
    // Arrange
    const task = new Task(defaultTask.name);
    task.initializeFromData(defaultTask);
    const time = new Time(null, DEFAULT_SPEED / 50);
    const logic = new Logic(1, time, null, null, []);
    logic.planTask(task, 1);
    expect(logic.currentRunningTask).toBeFalsy();

    // Act
    await new Promise((resolve) => setTimeout(resolve, 100));
    time.tick();

    // Assert
    expect(logic.currentRunningTask).toBe(task);
  });

  it("can complete and set a new running task on the same tick", async () => {
    // Arrange
    const runningTask = new Task(defaultTask.name + " [running]");
    runningTask.initializeFromData(defaultTask);
    runningTask.id += "-running";
    const newStartTask = new Task(defaultTask.name);
    newStartTask.initializeFromData(defaultTask);
    const time = new Time(null, DEFAULT_SPEED / 50);
    const logic = new Logic(1, time, null, null, []);
    logic.planTask(runningTask, 0);
    logic.planTask(newStartTask, 1);
    expect(logic.currentRunningTask).toBe(runningTask);

    // Act
    await new Promise((resolve) => setTimeout(resolve, 100));
    time.tick();

    // Assert
    expect(runningTask.completed).toBeTruthy();
    expect(logic.currentRunningTask).toBe(newStartTask);
  });

  it("sets the current task when the time is equal to the task's start time on plan attempt", () => {
    // Arrange
    const task = new Task(defaultTask.name);
    task.initializeFromData(defaultTask);
    const time = new Time();
    const logic = new Logic(1, time, null, null, []);
    expect(logic.currentRunningTask).toBeFalsy();

    // Act
    logic.planTask(task, 0);

    // Assert
    expect(logic.currentRunningTask).toBe(task);
  });

  it("sets the current task when the time is within the task's time bounds on plan attempt", async () => {
    // Arrange
    const task = new Task(defaultTask.name);
    task.initializeFromData(defaultTask);
    const time = new Time();
    const startTime = time.getCurrentGameTime();
    let endTime;
    const logic = new Logic(1, time, null, null, []);
    expect(logic.currentRunningTask).toBeFalsy();
    await new Promise((resolve) => setTimeout(resolve, 100));
    time.subscribe((newTime) => (endTime = newTime));

    // Act
    time.tick();
    logic.planTask(task, 0);

    // Assert
    expect(logic.currentRunningTask).toBe(task);
    expect(
      startTime.getTime() === endTime.getCurrentGameTime().getTime(),
    ).toBeFalsy();
  });
});
