import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import type { BasePlayer, Enemy } from "@durak-game/durak-dts";
import useEnemies from "@/module/card-game/composable/useEnemies";
import type { PlayerData } from "./self.store";
import useEnemy from "@/module/card-game/composable/useEnemy";

export const useGameEnemiesStore = defineStore("game-enemies", () => {
  const options = { timeout: { timeBeforeError: 5_000 } };
  const state = reactive({
    isLoading: true,
    isErrorHappened: false,
    timeout: {
      id: setTimeout(() => {
        if (state.isLoading) {
          state.isErrorHappened = true;
        }
      }, options.timeout.timeBeforeError),
    },
  });

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
