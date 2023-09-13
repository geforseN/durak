import type Player from "./Player";

export default class PlayerTimer {
  player: Player;
  endTime: { UTC: number };
  isActive: boolean;
  intervalId: number | undefined;
  remainedTime!: {
    milliseconds: number;
    seconds: number;
    positiveTimeAsString: string;
    timeAsString: string;
  } ;

  constructor(player: Player, endTime: { UTC: number } = { UTC: 0 }) {
    this.player = player;
    this.endTime = endTime;
    this.isActive = false;
    this.remainedTime = {};
    this.reevaluateRemainedTime();
  }

  get intervaleTime() {
    return this.remainedTime.seconds > 11 ? 1000 : 100;
  }

  reevaluateRemainedTime() {
    this.remainedTime.milliseconds = this.endTime.UTC - Date.now();
    this.remainedTime.seconds = this.remainedTime.milliseconds / 1_000;
    this.remainedTime.positiveTimeAsString = Math.max(
      this.remainedTime.milliseconds,
      0,
    ).toPrecision(2);
    this.remainedTime.timeAsString =
      this.remainedTime.milliseconds.toPrecision(2);
  }

  makeActive(endTime: { UTC: number }) {
    this.isActive = true;
    this.endTime = endTime;
    this.intervalId = setInterval(() => {
      this.reevaluateRemainedTime();
    }, this.intervaleTime);
  }

  makeInactive() {
    if (this.player.timer !== this) {
      throw new Error();
    }
    clearInterval(this.timeoutId);
    this.isActive = false;
    if (this.player.hasActiveTimer()) {
      throw new Error();
    }
  }
}


// TODO 
class ActivePlayerTimer {}
// TODO 
class InactivePlayerTimer {}
// TODO 
