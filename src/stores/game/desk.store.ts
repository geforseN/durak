import { ref } from "vue";
import { defineStore } from "pinia";
import type { DeskSlot, Card } from "@/module/card-game/types";
import { useGameSelfStore } from "@/stores/game/self.store";


export const useGameDeskStore = defineStore("gameDesk", () => {
  const selfStore = useGameSelfStore();
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

  return { clear, insertAttackCard, insertDefendCard, insertCard, deskSlots };
});