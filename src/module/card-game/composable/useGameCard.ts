import { computed } from "vue";
import type { Card, DeskSlot, Suit } from "@/module/card-game/types";
import cardPowerDictionary from "@/utils/dictionary/card-power.dictionary";
import suitsDictionary from "@/utils/dictionary/suits.dictionary";
import {
  useGameDeskStore,
  useGameSelfStore,
  useGameStateStore,
} from "@/stores/game";

export function useGameCard({ rank, suit }: Card) {
  const selfStore = useGameSelfStore();
  const gameDeskStore = useGameDeskStore();
  const gameStateStore = useGameStateStore();

  const power = cardPowerDictionary[rank];
  const id = `${rank === "10" ? "0" : rank}${suitsDictionary[suit]}`;
  const isTrump = computed(() => gameStateStore.trumpSuit === suit);

  const canBeUsedForTransferMove = computed(() => {
    if (!selfStore.isDefender || !gameDeskStore.allowsTransferMove)
      return false;
    return gameDeskStore.firstUnbeatenSlotRank === rank;
  });

  const canBeUsedForAttack = computed(() => {
    if (!selfStore.isAttacker) return false;
    return gameDeskStore.ranks.includes(rank);
  });

  const canBeUsedForDefense = computed(() => {
    if (!selfStore.isDefender) return false;
    if (isTrump.value) {
      return (
        !!gameDeskStore.unbeatenBasicSlots.length ||
        gameDeskStore.unbeatenTrumpSlots.some(slotHasLowerPower, {
          power,
        })
      );
    }
    return gameDeskStore.unbeatenSlots
      .filter(slotHasSameSuit, { suit })
      .some(slotHasLowerPower, { power });
  });

  return {
    id,
    isTrump,
    canBeUsedForAttack,
    canBeUsedForDefense,
    canBeUsedForTransferMove,
  };
}

function slotHasSameSuit(this: { suit: Suit }, slot: DeskSlot) {
  return slot.attackCard?.suit === this.suit;
}

function slotHasLowerPower(this: { power: number }, slot: DeskSlot) {
  if (!slot.attackCard?.rank) return false;
  return cardPowerDictionary[slot.attackCard.rank] < this.power;
}
