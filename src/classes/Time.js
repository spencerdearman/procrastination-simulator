export default class Time {
  constructor(scale = 60) {
    this.realSecondsPerGameHour = scale; /* Note, 60 real seconds = 1 game hr */
    this.startTime = Date.now(); // Store the real-world start time
    this.gameStartTime = new Date(2025, 0, 1, 0, 0, 0); // Arbitrary in-game start time
    this.currentTime = new Date(this.gameStartTime.getTime()); // Initialize currentTime
    this.minuteSpeed = scale / 60; // Speed of game minutes in real seconds
  }

  /* Getting the current game time based on the elapsed real time and scale */
  getCurrentGameTime() {
    let realElapsedSeconds = (Date.now() - this.startTime) / 1000;
    let gameHoursElapsed = realElapsedSeconds / this.realSecondsPerGameHour;
    let newGameTime = new Date(this.gameStartTime.getTime());
    newGameTime.setHours(newGameTime.getHours() + gameHoursElapsed);
    this.currentTime = newGameTime; // Update currentTime
    return newGameTime;
  }

  /* Setting the current game time */
  setCurrentTime(newTime) {
    this.currentTime = new Date(newTime);
  }

  /* Comparing the current game time with another time */
  compareTime(otherTime) {
    let otherDate = new Date(otherTime);
    return this.currentTime.getTime() - otherDate.getTime();
  }
}
