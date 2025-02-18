import Player from "./Player";
import Day from "./Day";
import Time from "./Time";
import Task from "./Task";

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
    play = Player("Test")
    sun = Day();
    mon = Day();
    tue = Day();
    wed = Day();
    thu = Day();
    fri = Day();
    sat = Day();
    days = [sun, mon, tue, wed, thu, fri, sat];
    gameLogic = Logic(play, days);
  }

  nextDay() {
    this.currentDayIndex++;
    this.currentDay = this.days[this.currentDayIndex];
  }

  totalTasksComlpeted() {
    for (let day of this.days) {
        tList = day.completedTasks;
        for (let task of tList) {
            this.tasksCompleted.push(task);
        }
    }
    }

}
