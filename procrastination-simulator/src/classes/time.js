class Time {
  constructor(scale = 60) {
      this.realSecondsPerGameHour = scale; /* Note, 60 real seconds = 1 game hr */
      this.startTime = Date.now(); // Store the real-world start time
      this.gameStartTime = new Date(2025, 0, 1, 0, 0, 0); // Arbitrary in-game start time
  }

  /* This method allows you to change the time scale of the game.
     For example, if you want 1 game hour to pass every 10 real seconds,
     you would call setScale(10).
  */
  setScale(newScale) {
      this.realSecondsPerGameHour = newScale;
  }

  /* Getting the current game time based on the elapsed real time and scale */
  getCurrentGameTime() {
      let realElapsedSeconds = (Date.now() - this.startTime) / 1000;
      let gameHoursElapsed = realElapsedSeconds / this.realSecondsPerGameHour;
      let newGameTime = new Date(this.gameStartTime.getTime());
      newGameTime.setHours(newGameTime.getHours() + gameHoursElapsed);
      return newGameTime;
  }
}

// Example usage:
// const gameClock = new Time(60); // 60 real seconds = 1 game hour
// console.log("Initial Game Time:", gameClock.getCurrentGameTime());

// setTimeout(() => {
//   console.log("Game Time After 30 Real Seconds:", gameClock.getCurrentGameTime());
// }, 30000); // Wait 30 real seconds

// setTimeout(() => {
//   gameClock.setScale(10); // Speed up time, 10 real seconds = 1 game hour
//   console.log("New Time Scale Set to 10 Seconds per Game Hour");
//   console.log("Game Time After Speed Change:", gameClock.getCurrentGameTime());
// }, 60000); // Change scale after 60 real seconds