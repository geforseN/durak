import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { DeskSlot, Card } from "@/module/card-game/types";
import { useGameStateStore } from "./game.state.store";
import type { DurakGameSocket } from "@durak-game/durak-dts";
import BackendPayloadError from "@/error/BackendPayloadError";

export const useGameDeskStore = defineStore("game-desk", () => {
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

  const insertCard = ({
    card,
    slot: { index },
  }: Parameters<
    DurakGameSocket.ServerToClientEvents["desk::receivedCard"]
  >["0"]) => {
    if (slots.value[index].defendCard) {
      throw new BackendPayloadError();
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

  const hasUnbeatenBasicSlots = computed(
    () => unbeatenBasicSlots.value.length !== 0,
  );

  const unbeatenSlotsWithSuit = (suit: Card["suit"]) => {
    return unbeatenSlots.value.filter((slot) => slot.attackCard.suit === suit);
  };

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
    hasUnbeatenBasicSlots,
    unbeatenSlotsWithSuit,
  };
});
