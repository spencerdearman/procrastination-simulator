const DEFAULT_SPEED = 60;

export default class Time {
  constructor(time = null) {
    if (time) {
      this.realSecondsPerGameHour = time.realSecondsPerGameHour;
      this.startTime = time.startTime;
      this.lastGameRecordTime = time.lastGameRecordTime;
      this.lastRealWorldCheckTime = time.lastRealWorldCheckTime;
      this.playerDefinedSpeed = time.playerDefinedSpeed;
      this.subscribers = [...time.subscribers];
    } else {
      this.realSecondsPerGameHour = DEFAULT_SPEED;
      this.startTime = Date.now();
      this.lastGameRecordTime = new Date(2025, 0, 1, 0, 0, 0);
      this.lastRealWorldCheckTime = Date.now();
      this.playerDefinedSpeed = 1;
      this.subscribers = [];
    }
    this.gameLoopInterval = null;
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

  getCurrentGameTime() {
    return this.lastGameRecordTime;
  }

  // Calculate current game time based on elapsed real seconds and the speed multiplier.
  tick() {
    const newTimeInstance = new Time(this);
    let realElapsedSeconds = (Date.now() - this.lastRealWorldCheckTime) / 1000;

    newTimeInstance.lastRealWorldCheckTime = Date.now();

    let newGameTime = new Date(
      this.lastGameRecordTime.getTime() +
        (realElapsedSeconds / this.realSecondsPerGameHour) *
          (60 * this.playerDefinedSpeed) *
          60 *
          1000,
    );

    newTimeInstance.lastGameRecordTime = newGameTime;

    return newTimeInstance;
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

  subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((cb) => cb !== callback);
    };
  }

  startGameLoop() {
    if (this.gameLoopInterval) return;

    this.gameLoopInterval = setInterval(() => {
      const newTime = this.tick();
      this.subscribers.forEach((callback) => callback(newTime));
    }, 1000);
  }

  stopGameLoop() {
    if (this.gameLoopInterval) {
      clearInterval(this.gameLoopInterval);
      this.gameLoopInterval = null;
    }
  }
}
