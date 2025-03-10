import Logic from "classes/Logic";
import Player from "classes/Player";
import Task from "classes/Task";
import Time, { DEFAULT_SPEED } from "classes/Time";
import { expect } from "@jest/globals";
import { DayUtils } from "classes/Day";

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

const waitAndTick = async (duration, time) => {
  await new Promise((resolve) => setTimeout(resolve, duration));
  time.tick();
};

describe("Logic", () => {
  let player;
  let task;
  let time;
  let logic;

  beforeEach(() => {
    player = new Player("Matthew", false);
    task = new Task(defaultTask.name);
    task.initializeFromData(defaultTask);
    time = new Time(null, DEFAULT_SPEED / 51);
    logic = new Logic(1, time, player, null, []);
    logic.isDayRunning = true;
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

  it("doesn't set the current running task when current time is not in task range", () => {
    // Arrange & Act
    logic.planTask(task, 10);

    // Assert
    expect(logic.currentRunningTask).toBeFalsy();
    expect(task.startTime).toBeTruthy();
    expect(task.endTime).toBeTruthy();
  });

  it("doesn't complete task when a tick doesn't pass the task's end time", async () => {
    // Arrange
    logic.planTask(task, 0);
    expect(logic.currentRunningTask).toBe(task);

    // Act
    await waitAndTick(20, time);

    // Assert
    expect(logic.currentRunningTask).toBe(task);
    expect(task.completed).toBeFalsy();
  });

  it("completes task when a tick passes the task's end time", async () => {
    // Arrange
    let endTime;
    time.subscribe((newTime) => (endTime = newTime));

    logic.planTask(task, 0);
    expect(logic.currentRunningTask).toBe(task);

    // Act
    await waitAndTick(110, time);

    // Assert
    expect(logic.currentRunningTask).toBe(null);
    expect(task.completed).toBeTruthy();
    expect(endTime.getCurrentGameTime().getTime()).toBeGreaterThanOrEqual(
      task.startTime.getTime(),
    );
  });

  it("sets the current task when the time has passed the task's start time after tick", async () => {
    // Arrange
    let endTime;
    time.subscribe((newTime) => (endTime = newTime));
    logic.planTask(task, 1);
    expect(logic.currentRunningTask).toBeFalsy();

    // Act
    await waitAndTick(100, time);

    // Assert
    expect(
      DayUtils.isWithinTimeWindow(task, endTime.getCurrentGameTime()),
    ).toBeTruthy();
    expect(logic.currentRunningTask).toBe(task);
  });

  it("can complete and set a new running task on the same tick", async () => {
    // Arrange
    const runningTask = new Task(defaultTask.name + " [running]");
    runningTask.initializeFromData(defaultTask);
    runningTask.id += "-running";
    const newStartTask = new Task(defaultTask.name);
    newStartTask.initializeFromData(defaultTask);
    logic.planTask(runningTask, 0);
    logic.planTask(newStartTask, 1);
    expect(logic.currentRunningTask).toBe(runningTask);

    // Act
    await waitAndTick(100, time);
    time.tick();

    // Assert
    expect(runningTask.completed).toBeTruthy();
    expect(logic.currentRunningTask).toBe(newStartTask);
  });

  it("doesn't set the current task when the time is equal to the task's start time on plan attempt while day isn't running", () => {
    // Arrange
    logic.isDayRunning = false;
    expect(logic.currentRunningTask).toBeFalsy();

    // Act
    logic.planTask(task, 0);

    // Assert
    expect(logic.currentRunningTask).toBeFalsy();
  });

  it("sets the current task when the time is equal to the task's start time on plan attempt while day is running", () => {
    // Arrange
    expect(logic.currentRunningTask).toBeFalsy();

    // Act
    logic.planTask(task, 0);

    // Assert
    expect(logic.currentRunningTask).toBe(task);
  });

  it("sets the current task when the time is within the task's time bounds on plan attempt", async () => {
    // Arrange
    let endTime;
    time.subscribe((newTime) => (endTime = newTime));
    expect(logic.currentRunningTask).toBeFalsy();

    // Act
    await waitAndTick(20, time);
    logic.planTask(task, 0);

    // Assert
    expect(
      DayUtils.isWithinTimeWindow(task, endTime.getCurrentGameTime()),
    ).toBeTruthy();
    expect(logic.currentRunningTask).toBe(task);
  });

  it("increments attributes multiple times during task", async () => {
    // Arrange
    logic.planTask(task, 0);
    player.attributes = {
      academics: 50,
      socialLife: 50,
      energy: 50,
      mentalHealth: 50,
    };
    let currentStats = player.getAttributes();
    let endTime;
    time.subscribe((newTime) => (endTime = newTime));

    // Ensure no weirdness with object equivalency
    expect(currentStats).toEqual(player.getAttributes());

    // Act - should increment stats three times, then complete the task
    for (let i = 0; i < 3; i++) {
      await waitAndTick(40, time);

      const newAttributes = player.getAttributes();
      expect(newAttributes).not.toEqual(currentStats);
      currentStats = newAttributes;
    }

    // Assert
    expect(task.completed).toBeTruthy();
  });

  it("prevents moving the currently-running task", () => {
    // Arrange
    logic.planTask(task, 0);
    const startTime1 = task.startTime;
    expect(logic.currentRunningTask).toBe(task);

    // Act
    logic.planTask(task, 4);
    const startTime2 = task.startTime;

    // Expect
    expect(task.completed).toBeFalsy();
    expect(logic.currentRunningTask).toBe(task);
    expect(logic.getTasks().length).toBe(1);
    expect(startTime1).toEqual(startTime2);
  });
});
