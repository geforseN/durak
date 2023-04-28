import { ref } from "vue";
import { defineStore } from "pinia";
import type { Enemy } from "@/module/card-game/types";

export const useGameEnemiesStore = defineStore("gameEnemies", () => {
  const enemies = ref<Enemy[]>([]);

  const findBy = ({ accname }: { accname: string }) => {
    return enemies.value.find((enemy) => enemy.info.accname === accname);
  };

  const has = ({ accname }: { accname: string }) => {
    return enemies.value.some((enemy) => enemy.info.accname === accname);
  };

  const changeEnemyCardCount = (accname: string, cardCount: number) => {
    const enemy = findBy({ accname });
    if (!enemy) return alert("No such enemy");
    enemy.cardCount = cardCount;
  };

  return { enemies, findBy, changeEnemyCardCount, has };
});