import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useGameEnemiesStore, useGameDeskStore, useGameSelfStore } from "@/stores/game";
import type { Card, GameState, PlayerRole } from "@/module/card-game/types";

export const useGameStateStore = defineStore("game", () => {
  const gameState: { trumpCard?: Card, allowedPlayerId?: string } = reactive({});

  const enemiesStore = useGameEnemiesStore();
  const selfStore = useGameSelfStore();
  const deskStore = useGameDeskStore();

  const restore = (newState: GameState) => {
    selfStore.self = newState.self;
    enemiesStore.enemies = newState.enemies;
    deskStore.deskSlots = newState.deskSlots;
    gameState.trumpCard = newState.trumpCard;
    gameState.allowedPlayerId = newState.allowedPlayerId;
  };

  const changeRole = (role: PlayerRole, accname: string) => {
    const enemy = enemiesStore.findBy({ accname });
    if (enemy) enemy.role = role;
    else selfStore.changeRole(role, accname);
  };

  const setTrumpCard = (card: Card) => gameState.trumpCard = card;

  const allowedPlayerId = computed(() => gameState.allowedPlayerId);

  return { gameState, restore, setTrumpCard, changeRole, allowedPlayerId };
});