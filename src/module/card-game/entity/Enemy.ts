import type { BasePlayer, PlayerKind } from "@durak-game/durak-dts";
import Player from "./Player";

export default class Enemy {
  #cardCount: number = 0;
  #player: Player = new Player();

  constructor(enemyDTO: BasePlayer & { cardCount: number }) {
    this.#player = new Player(enemyDTO);
    this.#cardCount = enemyDTO.cardCount;
  }

  get id() {
    return this.#player.id;
  }
  
  get canMakeMove() {
    return this.#player.isAllowedToMove;
  }

  get cardCount() {
    return this.#cardCount;
  }

  setKind(kind: PlayerKind) {
    this.#player.kind = kind;
  }

  increaseCardCount(cardCountToAdd: number) {
    this.#cardCount += cardCountToAdd;
  }

  decrementCardCount() {
    this.#cardCount--;
  }
}
