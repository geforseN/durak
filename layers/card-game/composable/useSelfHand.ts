import { computed, type Ref } from "vue";
import {
  BackendPayloadError,
  UserWrongInputError
} from "@/utils/errors";
import type { CardDTO } from "@durak-game/durak-dts";

export default function useSelfHand(cards: Ref<CardDTO[]>) {
  const isEmpty = computed(() => cards.value.length === 0);

  function hasCard({ suit, rank }: CardDTO) {
    return cards.value.some((card) => card.suit === suit && card.rank === rank);
  }

  function receiveCard(...newCards: CardDTO[]) {
    cards.value.push(...newCards);
  }

  function removeCard({ suit, rank }: CardDTO) {
    const index = cards.value.findIndex(
      (card) => card.suit === suit && card.rank === rank,
    );
    if (index === -1) {
      throw new BackendPayloadError(
        "Self#remove: Backend send wrong card to remove",
      );
    }
    cards.value.splice(index, 1);
  }

  function getCardByIndex(indexToFind: number) {
    ensureValidIndex(indexToFind);
    const card = cards.value.find((_, index) => index === indexToFind);
    if (!card) {
      throw new UserWrongInputError(
        `No such card by index=${indexToFind}, maximal index can be ${
          cards.value.length - 1
        }`,
      );
    }
    return card;
  }

  return {
    cards,
    isEmpty,
    hasCard,
    receiveCard,
    removeCard,
    getCardByIndex,
  };
}

function ensureValidIndex(index: number) {
  if (!Number.isInteger(index)) {
    throw new UserWrongInputError(
      `No such card by index=${index}, index is is integer`,
    );
  }
  if (index < 0) {
    throw new UserWrongInputError(
      `No such card by index=${index}, index is not a negative integer`,
    );
  }
}
