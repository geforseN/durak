import type { Enemy, Self } from "@/module/card-game/types";
import { defineStore } from "pinia";
import { computed } from "vue";

export const playersStore = defineStore(
  "players-store",
  ({ enemies, me }: { enemies: Enemy[]; me: Self }) => {
    console.log(enemies, me);

    const me = computed(() => "TODO");
    const changeRole = () => "TODO";
    ` 
has

findBy

changeEnemyCardCount

__findSideEnemies__
leftEnemies
topEnemies
rightEnemies
`;
  },
);
