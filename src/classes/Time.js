export default class Time {
  constructor(scale = 60) {
    this.realSecondsPerGameHour = scale; /* Note, 60 real seconds = 1 game hr */
    this.startTime = Date.now(); // Store the real-world start time
    this.gameStartTime = new Date(2025, 0, 1, 0, 0, 0); // Arbitrary in-game start time
  }

  /* Getting the current game time based on the elapsed real time and scale */
  getCurrentGameTime() {
    let realElapsedSeconds = (Date.now() - this.startTime) / 1000;
    let gameMinutesElapsed =
      (realElapsedSeconds / this.realSecondsPerGameHour) * 60;

    let newGameTime = new Date(this.gameStartTime);

    newGameTime.setMinutes(newGameTime.getMinutes() + gameMinutesElapsed);

    return newGameTime;
  }
}
