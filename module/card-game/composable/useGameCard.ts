import { computed } from "vue";
import type { Card } from "@/module/card-game/types";
import cardPowerDictionary from "@/utils/dictionary/card-power.dictionary";
import suitsDictionary from "@/utils/dictionary/suits.dictionary";
import {
  useGameDeskStore,
  useGameSelfStore,
  useGameStateStore,
} from "@/stores/game";
import type { CardDTO } from "@durak-game/durak-dts";

function powerOfCard(card: CardDTO) {
  return cardPowerDictionary[card.rank];
}

export function useGameCard(card: Card) {
  const { rank, suit } = card;
  const selfStore = useGameSelfStore();
  const gameDeskStore = useGameDeskStore();
  const gameStateStore = useGameStateStore();

  const power = powerOfCard(card);
  const id = `${rank === "10" ? "0" : rank}${suitsDictionary[suit]}`;
  const isTrump = computed(() => gameStateStore.trumpSuit === suit);

  const canBeUsedForTransferMove = computed(() => {
    return (
      gameDeskStore.allowsTransferMove &&
      selfStore.self.isDefender &&
      gameDeskStore.ranks[0] === rank
    );
  });

  const canBeUsedForAttack = computed(() => {
    return selfStore.self.isAttacker && gameDeskStore.ranks.includes(rank);
  });

  const canBeUsedForDefense = computed(() => {
    if (!selfStore.self.isDefender) {
      return false;
    }
    if (isTrump.value) {
      return (
        gameDeskStore.hasUnbeatenBasicSlots ||
        gameDeskStore.unbeatenTrumpSlots.some(
          (slot) => powerOfCard(slot.attackCard) < power,
        )
      );
    }
    return gameDeskStore
      .unbeatenSlotsWithSuit(suit)
      .some((slot) => powerOfCard(slot.attackCard) < power);
  });

  return {
    id,
    isTrump,
    canBeUsedForAttack,
    canBeUsedForDefense,
    canBeUsedForTransferMove,
  };
}
