import { reactive } from "vue";
import { defineStore } from "pinia";
import { useGameEnemiesStore, useGameDeskStore, useGameSelfStore } from "@/stores/game";
import type { Card, GameState, PlayerRole } from "@/module/card-game/types";

export const useGameStateStore = defineStore("game", () => {
  const gameState = reactive<{ trumpCard?: Card, allowedPlayerAccname?: string }>({});

  const enemiesStore = useGameEnemiesStore();
  const selfStore = useGameSelfStore();
  const deskStore = useGameDeskStore();

  const restore = (newState: GameState) => {
    selfStore.self = newState.self;
    enemiesStore.enemies = newState.enemies;
    deskStore.deskSlots = newState.deskSlots;
    setTrumpCard(newState.trumpCard);
    gameState.allowedPlayerAccname = newState.allowedPlayerAccname;
  };

  const changeRole = (role: PlayerRole, accname: string) => {
    const enemy = enemiesStore.findBy({ accname });
    if (enemy) return enemy.role = role;
    selfStore.changeRole(accname, role);
  };

  const setTrumpCard = (card: Card) => gameState.trumpCard = card;

  return { gameState, restore, setTrumpCard, changeRole };
});