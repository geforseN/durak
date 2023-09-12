import type { BasePlayer } from "@durak-game/durak-dts";
import type { PlayerInfo, PlayerKind } from "@durak-game/durak-dts";

export default class Player {
  isAllowedToMove: boolean;
  info: PlayerInfo;
  kind: PlayerKind;
  id: string;

  constructor(basePlayer: Partial<BasePlayer> = {}) {
    basePlayer.isAllowedToMove ??= false;
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
    this.isAllowedToMove = basePlayer.isAllowedToMove;
  }
}
