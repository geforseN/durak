import { computed, ref } from "vue";
import { defineStore } from "pinia";
import type { Enemy } from "@/module/card-game/types";

type EnemiesSideIndexes = {
  top: number[]
  left?: number[]
  right?: number[]
}

const enemiesSides: Record<number, EnemiesSideIndexes> = {
  1: {
    top: [0]
  },
  2: {
    top: [0, 1]
  },
  3: {
    left: [0],
    top: [1],
    right: [2]
  },
  4: {
    left: [0],
    top: [1, 2],
    right: [3]
  },
  5: {
    left: [0, 1],
    top: [2],
    right: [3, 4]
  }
}

export const useGameEnemiesStore = defineStore("gameEnemies", () => {
  const enemies = ref<Enemy[]>([]);

  const findBy = ({ accname }: { accname: string }) => {
    return enemies.value.find((enemy) => enemy.id === accname);
  };

  const has = ({ accname }: { accname: string }) => {
    return enemies.value.some((enemy) => enemy.id === accname);
  };

  const changeEnemyCardCount = (accname: string, cardCount: number) => {
    const enemy = findBy({ accname });
    if (!enemy) throw new Error("No such enemy");
    enemy.cardCount = cardCount;
  };

  const __findSideEnemies__ = (side: keyof EnemiesSideIndexes) => {
    const allowedIndexes = enemiesSides[enemies.value.length][side];
    return enemies.value.filter((_, index) => {
      return allowedIndexes?.includes(index);
    })
  }

  const leftEnemies = computed(() => {
    return __findSideEnemies__("left")
  })
  const topEnemies = computed(() => {
    return __findSideEnemies__("top")
  })
  const rightEnemies = computed(() => {
    return __findSideEnemies__("right")
  })

  return { enemies, findBy, changeEnemyCardCount, has, leftEnemies, topEnemies, rightEnemies };
});