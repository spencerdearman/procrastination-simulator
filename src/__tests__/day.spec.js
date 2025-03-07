import Day, { DayUtils } from "classes/Day";
import Task from "classes/Task";
import { defaultTask } from "setupTests";

describe("Day", () => {
  const startTime = new Date(2025, 0, 0, 0, 0, 0, 0);
  let day;
  let task;

  beforeEach(() => {
    day = new Day(0);
    task = new Task(defaultTask.name);
    task.initializeFromData(defaultTask);
  });

  it("allows you to plan tasks", () => {
    // Arrange & Act
    const didPlan = day.planTask(task, 0, startTime);

    // Arrange
    expect(didPlan).toBeTruthy();
  });

  it("doesn't allow you to plan completed tasks", () => {
    // Arrange
    task.completed = true;

    // Act
    const didPlan = day.planTask(task, 0, startTime);

    // Arrange
    expect(didPlan).toBeFalsy();
  });

  it("allows you to plan a reusable task multiple times", () => {
    // Arrange
    task.reusable = true;

    // Act
    for (let i = 0; i < 3; i++) {
      const didPlan = day.planTask(task, i, startTime);
      expect(didPlan).toBeTruthy();
    }

    expect(day.tasks[0]).toBeTruthy();
    expect(day.tasks[1]).toBeTruthy();
    expect(day.tasks[2]).toBeTruthy();
  });
});

describe("DayUtils", () => {
  let task;

  beforeEach(() => {
    task = new Task(defaultTask.name);
    task.initializeFromData(defaultTask);
  });

  it("returns false when comparing ranges with task ranges which are null", () => {
    // Arrange & Act
    let isWithinRange = DayUtils.isWithinTimeWindow(task, new Date());

    // Assert
    expect(isWithinRange).toBeFalsy();
  });
});
