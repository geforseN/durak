import { defineStore } from "pinia";
import { computed } from "vue";
import { useGameEnemiesStore, useGameSelfStore } from "./index";
import type { BasePlayer, Card as CardDTO } from "@durak-game/durak-dts";
export const usePlayersStore = defineStore(
  "players-store",
  () => {
  const enemiesStore = useGameEnemiesStore();
  const selfStore = useGameSelfStore();

    const me = computed(() => "TODO");
    const changeRole = () => "TODO";

    const allowedPlayer = computed(() => {});

    const restore = (
      selfDTO: BasePlayer & { cards: CardDTO[] },
      enemyDTOs: (BasePlayer & { cardCount: number })[],
    ) => {
      selfStore.restore(selfDTO);
      enemiesStore.restore(enemyDTOs);
    };
    
    return {
      restore,
    };
    ` 
has

findBy


__findSideEnemies__
leftEnemies
topEnemies
rightEnemies
`;
  },
);
