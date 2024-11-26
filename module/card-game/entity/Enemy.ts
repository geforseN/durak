import type { BasePlayer } from "@durak-game/durak-dts";
import Player from "./Player";

export default class Enemy extends Player {
  private _cardCount: number = 0;

  constructor(enemyDTO: BasePlayer & { cardCount: number }) {
    super(enemyDTO)
    this._cardCount = enemyDTO.cardCount;
  }

  get cardCount() {
    return this._cardCount;
  }
  
  increaseCardCount(cardCountToAdd: number) {
    this._cardCount += cardCountToAdd;
  }

  decrementCardCount() {
    this._cardCount--;
  }
}
