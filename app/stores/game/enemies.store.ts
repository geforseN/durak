import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { Enemy } from "@durak-game/durak-dts";
import useEnemies from "$/card-game/composable/useEnemies";
import useEnemy from "$/card-game/composable/useEnemy";

export const useGameEnemiesStore = defineStore("game-enemies", () => {
  const enemiesData = ref<ReturnType<typeof useEnemy>[]>([]);
  // @ts-expect-error cardCount has wrong type, do not know how to fix it
  const enemies = useEnemies(enemiesData);

  const restore = (enemyDTOs: Enemy[]) => {
    // @ts-expect-error cardCount has wrong type, do not know how to fix it
    enemiesData.value = enemyDTOs.map((dto) => {
      const { isAllowedToMove: _, cardCount, ...player } = dto;
      return useEnemy(ref(player), ref(cardCount));
    });
  };

  return {
    restore,
    enemies,
  };
});
