import { ref } from "vue";
import { defineStore } from "pinia";
import Enemies from "@/module/card-game/entity/Enemies";
import type { BasePlayer } from "@durak-game/durak-dts";
import Enemy from "@/module/card-game/entity/Enemy";

export const useGameEnemiesStore = defineStore("game-enemies", () => {
  const enemies = ref(new Enemies());

  const restore = (enemyDTOs: (BasePlayer & { cardCount: number })[]) => {
    enemies.value = new Enemies(enemyDTOs.map((dto) => new Enemy(dto)));
  };

  return {
    restore,
    enemies,
  };
});
