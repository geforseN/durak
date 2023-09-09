import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { DeskSlot, Card } from "@/module/card-game/types";
import { useGameSelfStore } from "@/stores/game/self.store";
import { useGameStateStore } from "./game.state.store";

export const useGameDeskStore = defineStore("gameDesk", () => {
  const selfStore = useGameSelfStore();
  const gameStateStore = useGameStateStore();
  const slots = ref<DeskSlot[]>([]);

  const clear = () => {
    slots.value = slots.value.map(() => ({}));
  };

  const insertDefendCard = (card: Card, index: number) => {
    slots.value[index].defendCard = card;
  };

  const insertAttackCard = (card: Card, index: number) => {
    slots.value[index].attackCard = card;
  };

  const insertCard = ({ card, slot: { index }, source: { id } }) => {
    if (selfStore.has({ card })) {
      selfStore.removeCard(card);
    }
    if (!slots.value[index].attackCard) {
      insertAttackCard(card, index);
    } else {
      insertDefendCard(card, index);
    }
  };

  const ranks = computed(() => {
    const cards = slots.value.flatMap<Card>(Object.values);
    const cardRanks = cards
      .map((card) => card.rank)
      .filter((value) => value !== undefined);
    return [...new Set(cardRanks)];
  });

  const emptySlots = computed(() => {
    return slots.value.filter((slot) => !slot.attackCard && !slot.defendCard);
  });

  const defendedSlots = computed<Required<DeskSlot>[]>(() => {
    return slots.value.filter((slot) => slot.attackCard && slot.defendCard) as {
      attackCard: Card;
      defendCard: Card;
    }[];
  });

  const unbeatenSlots = computed<Required<Pick<DeskSlot, "attackCard">>[]>(
    () => {
      return slots.value.filter(
        (slot) => slot.attackCard && !slot.defendCard,
      ) as { attackCard: Card }[];
    },
  );

  const unbeatenTrumpSlots = computed(() => {
    return unbeatenSlots.value.filter((unbeatenSlot) => {
      return unbeatenSlot.attackCard.suit === gameStateStore.trumpSuit;
    });
  });

  const unbeatenBasicSlots = computed(() => {
    return unbeatenSlots.value.filter((unbeatenSlot) => {
      return unbeatenSlot.attackCard.suit !== gameStateStore.trumpSuit;
    });
  });

  const isEmpty = computed(
    () => slots.value.length === emptySlots.value.length,
  );
  const hasDefendedSlot = computed(() => !!defendedSlots.value.length);
  const firstUnbeatenSlotRank = computed(
    () => unbeatenSlots.value[0].attackCard.rank,
  );
  const allowsTransferMove = computed(() => {
    if (hasDefendedSlot.value || isEmpty.value || !firstUnbeatenSlotRank.value)
      return false;
    return unbeatenSlots.value.every(
      (slot) => slot.attackCard.rank === firstUnbeatenSlotRank.value,
    );
  });

  return {
    clear,
    insertAttackCard,
    insertDefendCard,
    insertCard,
    isEmpty,
    ranks,
    slots,
    unbeatenSlots,
    unbeatenTrumpSlots,
    unbeatenBasicSlots,
    allowsTransferMove,
    firstUnbeatenSlotRank,
  };
});
