import BackendPayloadError from "../error/BackendPayloadError";
import type Enemy from "./Enemy";

type EnemiesCount = number;

type IndexRange = {
  start: number;
  end: number;
};

type GroupedEnemies = Partial<{
  top: IndexRange;
  left: IndexRange;
  right: IndexRange;
}>;

const groupedEnemiesBySide: Record<EnemiesCount, GroupedEnemies> = {
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

export default class Enemies {
  storage: Enemy[];

  constructor(enemies: Enemy[] = []) {
    this.storage = enemies;
  }

  getById(id: string) {
    const enemy = this.storage.find((enemy) => enemy.id === id);
    if (!enemy) {
      throw new BackendPayloadError();
    }
    return enemy;
  }

  get groupedEnemiesBySide() {
    return groupedEnemiesBySide[this.storage.length];
  }

  getGroupedBySide(side: keyof Required<GroupedEnemies>) {
    const indexes = this.groupedEnemiesBySide[side];
    if (typeof indexes?.start === "undefined") {
      return [];
    }
    return this.storage.slice(indexes.start, indexes.end + 1);
  }

  get hasAllowedPlayer() {
    return this.storage.some((enemy) => enemy.canMakeMove);
  }

  get hasTimerHolder() {
    return this.storage.some((enemy) => enemy.hasActiveTimer());
  }

  get allowedPlayer() {
    const allowed = this.storage.find((enemy) => enemy.canMakeMove);
    if (!allowed) {
      throw new Error();
    }
    return allowed;
  }

  get timerHolder() {
    const holder = this.storage.find((enemy) => enemy.hasActiveTimer());
    if (!holder) {
      throw new Error();
    }
    return holder;
  }

  hasSurrenderedDefender() {
    return this.storage.some((enemy) => enemy.isSurrendered);
  }
}
