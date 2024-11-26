import { BackendPayloadError } from "@/utils/errors";
import { computed, type Ref } from "vue";
import type useEnemy from "./useEnemy";

type GroupedEnemies = Partial<{
  top: { start: number; end: number };
  left: { start: number; end: number };
  right: { start: number; end: number };
}>;

const _groupedEnemiesBySide: Record<0 | 1 | 2 | 3 | 4 | 5, GroupedEnemies> = {
  0: {},
  1: {
    top: { start: 0, end: 0 },
  },
  2: {
    top: { start: 0, end: 1 },
  },
  3: {
    left: { start: 0, end: 0 },
    top: { start: 1, end: 1 },
    right: { start: 2, end: 2 },
  },
  4: {
    left: { start: 0, end: 0 },
    top: { start: 1, end: 2 },
    right: { start: 3, end: 3 },
  },
  5: {
    left: { start: 0, end: 1 },
    top: { start: 2, end: 2 },
    right: { start: 3, end: 4 },
  },
} as const;

export default function useEnemies(
  enemies: Ref<ReturnType<typeof useEnemy>[]>,
) {
  function getById(id: string) {
    const enemy = enemies.value.find((enemy) => enemy.id === id);
    if (!enemy) {
      throw new BackendPayloadError();
    }
    return enemy;
  }

  const groupedEnemiesBySide = computed(() => {
    return _groupedEnemiesBySide[enemies.value.length];
  });

  function getGroupedBySide(side: keyof Required<GroupedEnemies>) {
    const indexes = groupedEnemiesBySide.value[side];
    if (typeof indexes?.start === "undefined") {
      return [];
    }
    return enemies.value.slice(indexes.start, indexes.end + 1);
  }

  const hasAllowedPlayer = computed(() => {
    return enemies.value.some((enemy) => enemy.canMakeMove);
  });

  function allowedPlayer() {
    const allowed = enemies.value.find((enemy) => enemy.canMakeMove);
    if (!allowed) {
      throw new Error();
    }
    return allowed;
  }

  function hasSurrenderedDefender() {
    return enemies.value.some((enemy) => enemy.isSurrendered);
  }

  return {
    groupedEnemiesBySide,
    getGroupedBySide,
    getById,
    hasAllowedPlayer,
    allowedPlayer,
    hasSurrenderedDefender,
  };
}
