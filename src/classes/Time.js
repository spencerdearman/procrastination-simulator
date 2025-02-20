export default class Time {
  constructor(scale = 60) {
    this.realSecondsPerGameHour = scale;
    // Base time from which to compute game time
    this.gameStartTime = new Date(2025, 0, 1, 0, 0, 0);
    // Real-world reference point for elapsed time
    this.startTime = Date.now();
  }

  // Returns the current game time based on elapsed real seconds
  getCurrentGameTime() {
    const deltaSeconds = (Date.now() - this.startTime) / 1000;
    const gameMinutesPassed = Math.floor(
      deltaSeconds * (60 / this.realSecondsPerGameHour),
    );
    return new Date(
      this.gameStartTime.getTime() + gameMinutesPassed * 60 * 1000,
    );
  }

  // Update the gameStartTime and reset the timer to allow manual adjustments
  setCurrentGameTime(newGameTime) {
    this.gameStartTime = new Date(newGameTime);
    this.startTime = Date.now();
  }

  resetGameTime() {
    this.gameStartTime = new Date(2025, 0, 1, 0, 0, 0);
    this.startTime = Date.now();
  }

  setScale(newScale) {
    this.realSecondsPerGameHour = newScale;
  }
}
