import Time from "./Time.js";
import Day from "./Day.js";
import Player from "./Player.js";

export default class Logic {
  constructor(player, days) {
    this.player = player;
    this.days = days; //List of day objects
    this.currentDayIndex = 0;
    this.currentDay = days[0];
    this.time = Time();
    this.tasksCompleted = [];
  }

  seedGame() {
    let play = Player("Test");
    let sun = Day();
    let mon = Day();
    let tue = Day();
    let wed = Day();
    let thu = Day();
    let fri = Day();
    let sat = Day();
    let days = [sun, mon, tue, wed, thu, fri, sat];
    let gameLogic = Logic(play, days);
  }

  nextDay() {
    this.currentDayIndex++;
    this.currentDay = this.days[this.currentDayIndex];
  }

  totalTasksComlpeted() {
    for (let day of this.days) {
      let tList = day.completedTasks;
      for (let task of tList) {
        this.tasksCompleted.push(task);
      }
    }
  }
}
