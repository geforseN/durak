import { computed } from "vue";
import type { BasePlayer } from "@durak-game/durak-dts";
import type { PlayerInfo, PlayerKind } from "@durak-game/durak-dts";

export default abstract class Player {
  info: PlayerInfo;
  kind: PlayerKind;
  id: string;
  timer: { endTime: { UTC: number } };

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
    // basePlayer.timer ??= { endTime: { UTC: 0 } };
    console.log({ basePlayer });

    this.info = basePlayer.info;
    this.kind = basePlayer.kind;
    this.id = basePlayer.id;
    this.timer = { endTime: { UTC: 0 } };
  }

  hasTimer = computed(() => {
    console.log("HAS TIMER", this.timer.endTime.UTC);
    return this.timer.endTime.UTC > 0;
  });

  updateKindWithTimer(newKind: PlayerKind) {
    const isWereAllowed = this.isAllowed;
    this.kind = newKind;
    if (isWereAllowed && !this.isAllowed) {
      this.timer = { endTime: { UTC: 0 } };
    }
  }

  get canMakeMove() {
    return this.kind.includes("Allowed");
  }

  get isAllowed() {
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
