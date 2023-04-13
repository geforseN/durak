import { ref } from "vue";
import { defineStore } from "pinia";
import type { DeskSlot, Card } from "@/module/card-game/types";

export const useGameDeskStore = defineStore("gameDesk", () => {
  const deskSlots = ref<DeskSlot[]>([]);

  const clear = () => {
    deskSlots.value = deskSlots.value.map(() => ({ attackCard: null, defendCard: null }));
  };

  const insertDefendCard = (card: Card, index: number) => {
    deskSlots.value[index].defendCard = card;
  };

  const insertAttackCard = (card: Card, index: number) => {
    deskSlots.value[index].attackCard = card;
  };

  const insertCard = (card: Card, index: number, inserterId: string) => {
    console.log(card, index, inserterId);
    if (!deskSlots.value[index].defendCard) {
      insertDefendCard(card, index);
    } else {
      insertAttackCard(card, index);
    }
  };

  return { clear, insertAttackCard, insertDefendCard, insertCard, deskSlots };
});