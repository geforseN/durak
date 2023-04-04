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

  return { clear, insertAttackCard, insertDefendCard, deskSlots };
});