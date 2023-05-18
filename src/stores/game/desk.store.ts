import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { DeskSlot, Card } from "@/module/card-game/types";
import { useGameSelfStore } from "@/stores/game/self.store";
import { useGameStateStore } from "./game.store";

export const useGameDeskStore = defineStore("gameDesk", () => {
  const selfStore = useGameSelfStore();
  const gameStateStore = useGameStateStore();
  const deskSlots = ref<DeskSlot[]>([]);

  const clear = () => {
    deskSlots.value = deskSlots.value.map(() => ({}));
  };

  const insertDefendCard = (card: Card, index: number) => {
    deskSlots.value[index].defendCard = card;
  };

  const insertAttackCard = (card: Card, index: number) => {
    deskSlots.value[index].attackCard = card;
  };

  const insertCard = (card: Card, index: number, __inserterId__: string) => {
    if (selfStore.has({ card })) {
      selfStore.remove({ card });
    }
    if (!deskSlots.value[index].attackCard) {
      insertAttackCard(card, index);
    } else {
      insertDefendCard(card, index);
    }
  };

  const ranks = computed(() => {
    const cards = deskSlots.value.flatMap<Card>(Object.values);
    const cardRanks = cards.map((card) => card.rank).filter((value) => value !== undefined);
    return [...new Set(cardRanks)];
  });

  const emptySlots = computed(() => {
    return deskSlots.value.filter((slot) => !slot.attackCard && !slot.defendCard);
  });

  const defendedSlots = computed<(Required<DeskSlot>)[]>(() => {
    return deskSlots.value.filter((slot) => slot.attackCard && slot.defendCard) as { attackCard: Card, defendCard: Card }[];
  });

  const unbeatenSlots = computed<(Required<Pick<DeskSlot, "attackCard">>)[]>(() => {
    return deskSlots.value.filter((slot) => slot.attackCard && !slot.defendCard) as { attackCard: Card }[];
  });

  const unbeatenTrumpSlots = computed(() => {
    return unbeatenSlots.value.filter((unbeatenSlot) => {
      return unbeatenSlot.attackCard.suit === gameStateStore.gameState.trumpCard?.suit;
    });
  });

  const unbeatenBasicSlots = computed(() => {
    return unbeatenSlots.value.filter((unbeatenSlot) => {
      return unbeatenSlot.attackCard?.suit !== gameStateStore.gameState.trumpCard?.suit;
    });
  });

  const isEmpty = computed(() => deskSlots.value.length === emptySlots.value.length);
  const hasDefendedSlot = computed(() => !!defendedSlots.value.length);
  const firstUnbeatenSlotRank = computed(() => unbeatenSlots.value[0].attackCard.rank);
  const allowsTransferMove = computed(() => {
    if (hasDefendedSlot.value || isEmpty.value || !firstUnbeatenSlotRank.value) return false;
    return unbeatenSlots.value.every((slot) => slot.attackCard.rank === firstUnbeatenSlotRank.value);
  });

  return {
    clear,
    insertAttackCard,
    insertDefendCard,
    insertCard,
    isEmpty,
    ranks,
    deskSlots,
    unbeatenSlots,
    unbeatenTrumpSlots,
    unbeatenBasicSlots,
    allowsTransferMove,
    firstUnbeatenSlotRank,
  };
});