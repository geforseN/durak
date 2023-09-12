import type { PlayerKind } from "@durak-game/durak-dts";
import BackendPayloadError from "../error/BackendPayloadError";
import Player from "./Player";
import type { Card as CardDTO } from "@durak-game/durak-dts";
import type { BasePlayer } from "@durak-game/durak-dts";

export default class Self {
  #hand: CardDTO[];
  #player: Player;

  constructor(selfDTO: Partial<BasePlayer & { cards: CardDTO[] }> = {}) {
    this.#hand = selfDTO.cards || [];
    this.#player = new Player(selfDTO);
  }

  get id() {
    return this.#player.id;
  }

  get canMakeMove() {
    return this.#player.isAllowedToMove;
  }

  has({ suit, rank }: CardDTO) {
    return this.#hand.some((card) => card.suit === suit && card.rank === rank);
  }

  receive(...cards: CardDTO[]) {
    this.#hand.push(...cards);
  }

  remove({ suit, rank }: CardDTO) {
    const index = this.#hand.findIndex(
      (card) => card.suit === suit && card.rank === rank,
    );
    if (index === -1) {
      throw new BackendPayloadError(
        "Self#remove: Backend send wrong card to remove",
      );
    }
    this.#hand.splice(index, 1);
  }

  setKind(kind: PlayerKind) {
    this.#player.kind = kind;
  }
}
