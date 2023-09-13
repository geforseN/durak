import BackendPayloadError from "../error/BackendPayloadError";
import type { Card as CardDTO } from "@durak-game/durak-dts";

export class Hand {
  cards: CardDTO[];
  constructor(cards: CardDTO[] = []) {
    this.cards = cards;
  }

  get hasCards() {
    return !!this.cards.length;
  }

  has({ suit, rank }: CardDTO) {
    return this.cards.some((card) => card.suit === suit && card.rank === rank);
  }

  receive(...cards: CardDTO[]) {
    this.cards.push(...cards);
  }

  remove({ suit, rank }: CardDTO) {
    const index = this.cards.findIndex(
      (card) => card.suit === suit && card.rank === rank
    );
    if (index === -1) {
      throw new BackendPayloadError(
        "Self#remove: Backend send wrong card to remove"
      );
    }
    this.cards.splice(index, 1);
  }

  getCardByIndex(indexToFind: number) {
    const card = this.cards.find((_, index) => index === indexToFind);
    if (!card) {
      const error = new Error(
        `No such card, index equal to ${indexToFind} is too big, maximal index can be ${this.cards.length - 1}`
      );
      error.shouldNotifyUser = true;
      throw error;
    }
    return card;
  }
}
