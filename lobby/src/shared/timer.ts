const RunService = game.GetService("RunService");

/**
 * Represents a timer that can be started, stopped, and queried for elapsed time and remaining time.
 *
 * The timer can be configured with a duration and an optional callback function to be executed when the timer completes.
 * The timer can be started automatically or manually, and can be paused and resumed.
 *
 * @param _duration The duration of the timer in seconds.
 * @param _onComplete An optional callback function to be executed when the timer completes.
 * @param _elapsed The initial elapsed time of the timer in seconds.
 * @param autoStart Whether the timer should start automatically upon creation.
 */
export class Timer {
  constructor(
    private _duration: number,
    private _onComplete?: () => void,
    private _elapsed = 0,
    autoStart = true,
  ) {
    if (autoStart) {
      spawn(() => this.start());
    }
  }

  private _paused: boolean = true;
  private _startTime: number = 0;
  private _connection: RBXScriptConnection | undefined = undefined;

  start(duration = this._duration) {
    if (!this._paused || this._connection) {
      return;
    }
    this._duration = math.max(0, duration);
    this._startTime = os.clock() - this._elapsed;
    this._paused = false;

    this._connection = RunService.Heartbeat.Connect(() => {
      this._update();
    });
  }

  stop() {
    this._update();
    this._paused = true;
    if (this._connection) {
      this._connection.Disconnect();
      this._connection = undefined;
    }
  }

  getPercentComplete(): number {
    if (this._duration <= 0 || this._elapsed <= 0) {
      return 0;
    }
    if (this._elapsed >= this._duration) {
      return 1;
    }
    return this._elapsed / this._duration;
  }

  getRemainingTime(): number {
    return math.max(0, this._duration - this._elapsed);
  }

  private _update() {
    if (this._paused) {
      return;
    }
    const stamp = os.clock();
    const elapsed = stamp - this._startTime;
    if (elapsed >= this._duration) {
      this._paused = true;
      this._elapsed = this._duration;
      if (this._connection) {
        this._connection.Disconnect();
        this._connection = undefined;
      }
      if (this._onComplete !== undefined) {
        this._onComplete();
      }
    } else {
      this._elapsed = elapsed;
    }
  }
}
