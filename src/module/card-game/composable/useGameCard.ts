import { computed } from "vue";
import type { Card, DeskSlot, Suit } from "@/module/card-game/types";
import cardPowerDictionary from "@/utils/dictionary/card-power.dictionary";
import suitsDictionary from "@/utils/dictionary/suits.dictionary";
import { useGameDeskStore, useGameSelfStore, useGameStateStore } from "@/stores/game";

export function useGameCard({ rank, suit }: Card) {
  const selfStore = useGameSelfStore();
  const gameDeskStore = useGameDeskStore();
  const gameStateStore = useGameStateStore();

  const power = computed(() => cardPowerDictionary[rank]);
  const id = computed(() => {
    const rankChar = rank === "10" ? "0" : rank;
    return `${rankChar}${suitsDictionary[suit]}`;
  });
  const isTrump = computed(() => gameStateStore.gameState.trumpCard?.suit === suit);

  const canBeUsedForTransferMove = computed(() => {
    if (!selfStore.isDefender || !gameDeskStore.allowsTransferMove) return false;
    return gameDeskStore.firstUnbeatenSlotRank === rank;
  });

  const canBeUsedForAttack = computed(() => {
    if (!selfStore.isAttacker) return false;
    return gameDeskStore.ranks.includes(rank);
  });

  const canBeUsedForDefense = computed(() => {
    if (!selfStore.isDefender || !gameStateStore.gameState.trumpCard) return false;
    if (isTrump.value) {
      return (
        !!gameDeskStore.unbeatenBasicSlots.length
        || gameDeskStore.unbeatenTrumpSlots.some(slotHasLower, { power: power.value })
      );
    }
    return gameDeskStore.unbeatenSlots
      .filter(slotHasSame, { suit })
      .some(slotHasLower, { power: power.value });
  });

  return {
    id,
    isTrump,
    canBeUsedForAttack,
    canBeUsedForDefense,
    canBeUsedForTransferMove,
  };
}


function slotHasSame(this: { suit: Suit }, slot: DeskSlot) {
  return slot.attackCard?.suit === this.suit;
}

function slotHasLower(this: { power: number }, slot: DeskSlot) {
  if (!slot.attackCard?.rank) return false;
  return cardPowerDictionary[slot.attackCard.rank] < this.power;
}