export default class Time {
  constructor(scale = 60) {
    this.realSecondsPerGameHour = scale;
    this.speedMultiplier = 1;
    this.gameStartTime = new Date(2025, 0, 1, 0, 0, 0);
    this.startTime = Date.now();
  }

  // Calculate current game time based on elapsed real seconds and the speed multiplier.
  getCurrentGameTime() {
    const deltaSeconds = (Date.now() - this.startTime) / 1000;
    const effectiveDelta = deltaSeconds * this.speedMultiplier;
    const gameMinutesPassed = Math.floor(
      effectiveDelta * (60 / this.realSecondsPerGameHour),
    );
    return new Date(
      this.gameStartTime.getTime() + gameMinutesPassed * 60 * 1000,
    );
  }

  // Allows external updates to the game time and resets the baseline.
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

  // When the speed multiplier is changed, adjust the baseline so that the transition is smooth.
  setSpeedMultiplier(newSpeed) {
    const currentGameTime = this.getCurrentGameTime();
    this.gameStartTime = currentGameTime;
    this.startTime = Date.now();
    this.speedMultiplier = newSpeed;
  }
}
