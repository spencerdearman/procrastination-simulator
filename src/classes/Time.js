export default class Time {
  constructor(scale = 60) {
    this.realSecondsPerGameHour = scale; /* Note, 60 real seconds = 1 game hr */

    this.startTime = Date.now(); // Store the real-world start time

    this.lastGameRecordTime = new Date(2025, 0, 1, 0, 0, 0); // Arbitrary in-game start time

    this.totalMinutesElapsed = 0;

    this.lastRealWorldCheckTime = Date.now();

    this.playerDefinedSpeed = 1;
  }

  // Manually set the current game time
  setCurrentGameTime(newTime) {
    if (!(newTime instanceof Date) || isNaN(newTime.getTime())) {
      console.error("Invalid game time provided. Must be a valid Date object.");
      return;
    }

    this.lastGameRecordTime = newTime;
    this.lastRealWorldCheckTime = Date.now();

    console.log(`Game time manually set to: ${this.lastGameRecordTime}`);
  }

  // Calculate current game time based on elapsed real seconds and the speed multiplier.
  getCurrentGameTime() {
    let realElapsedSeconds = (Date.now() - this.lastRealWorldCheckTime) / 1000;

    this.lastRealWorldCheckTime = Date.now();

    let newGameTime = new Date(
      this.lastGameRecordTime.getTime() +
        (realElapsedSeconds / this.realSecondsPerGameHour) *
          (60 * this.playerDefinedSpeed) *
          60 *
          1000,
    );

    this.lastGameRecordTime = newGameTime;

    return newGameTime;
  }

  compareTwoTime() {}

  isTriggered() {}

  hasEnded() {}

  xSpeed(speed) {
    this.playerDefinedSpeed = speed;
  }

  stopTimer() {
    this.playerDefinedSpeed = 0;
  }

  startTimer() {
    this.playerDefinedSpeed = 1;
  }
}
