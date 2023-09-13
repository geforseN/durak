import type { BasePlayer } from "@durak-game/durak-dts";
import type { PlayerInfo, PlayerKind } from "@durak-game/durak-dts";
import PlayerTimer from "./Timer";

export default abstract class Player {
  info: PlayerInfo;
  kind: PlayerKind;
  id: string;
  timer: PlayerTimer;

  constructor(basePlayer: Partial<BasePlayer> = {}) {
    basePlayer.info ??= {
      id: "",
      isAdmin: false,
      profile: {
        personalLink: "",
        photoUrl: "",
        nickname: "",
        connectStatus: "OFFLINE",
        userId: "",
      },
    };
    basePlayer.kind ??= "Player";
    basePlayer.id ??= "";
    this.info = basePlayer.info;
    this.kind = basePlayer.kind;
    this.id = basePlayer.id;
    this.timer = new PlayerTimer(this);
  }

  hasActiveTimer(): this is {
    timer: {
      remainedTime: {
        milliseconds: number;
        seconds: number;
        positiveTimeAsString: string;
        timeAsString: string;
      };
    };
  } {
    return this.timer.isActive;
  }

  get canMakeMove() {
    return this.kind.includes("Allowed");
  }

  get isAttacker() {
    return this.kind.includes("Attacker");
  }

  get isDefender() {
    return this.kind.includes("Defender");
  }

  get isSurrendered() {
    return this.kind === "SurrenderedDefender";
  }
}
