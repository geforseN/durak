import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import Enemies from "@/module/card-game/entity/Enemies";
import type { BasePlayer } from "@durak-game/durak-dts";
import Enemy from "@/module/card-game/entity/Enemy";
import useEnemies from "@/module/card-game/composable/useEnemies";
import useEnemy from "@/module/card-game/composable/useEnemy";
import type { PlayerData } from "./self.store";
import type { PlayerCount } from "@durak-game/durak-dts";

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
  // todo ref array of objects where
  // ref player
  // ref cardCount
  const enemiesData = ref<{ asPlayer: PlayerData; cardCount: number }[]>([]);
  const enemies = useEnemies(enemiesData);

  const restore = (enemyDTOs: (BasePlayer & { cardCount: number })[]) => {
    enemiesData.value = enemyDTOs.map((dto) => {
      // TODO use here useEnemies
      return {
        asPlayer: {
          id: dto.id,
          kind: dto.kind,
          info: dto.info,
        },
        cardCount: dto.cardCount,
      };
    });
  };

  return {
    restore,
    enemies,
  };
});
