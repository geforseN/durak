import { Hand } from "./Hand";
import Player from "./Player";
import type { Card as CardDTO } from "@durak-game/durak-dts";
import type { BasePlayer } from "@durak-game/durak-dts";

export default class Self extends Player {
  private _hand: Hand;

  constructor(selfDTO: Partial<BasePlayer & { cards: CardDTO[] }> = {}) {
    super(selfDTO);
    this._hand = new Hand(selfDTO.cards);
  }

  get hand() {
    return this._hand;
  }

  get cards() {
    return this._hand.cards;
  }

  get hasCards() {
    return this._hand.hasCards;
  }

  get canMakeDefenseMove() {
    return this.canMakeMove && this.isDefender;
  }

  get canMakeAttackMove() {
    return this.canMakeMove && this.isAttacker;
  }

  has({ suit, rank }: CardDTO) {
    return this._hand.has({ suit, rank });
  }

  receive(...cards: CardDTO[]) {
    this._hand.receive(...cards);
  }

  remove({ suit, rank }: CardDTO) {
    return this._hand.remove({ suit, rank });
  }
}
