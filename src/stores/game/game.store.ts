import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useGameEnemiesStore, useGameDeskStore, useGameSelfStore } from "@/stores/game";
import type { Card, GameState, PlayerRole } from "@/module/card-game/types";
import { useTimeoutPoll } from "@vueuse/core";

type OmittedGameState = Omit<GameState, "self" | "enemies" | "deskSlots">

const defaultGameState: OmittedGameState = {
  roundNumber: 0,
  isDiscardEmpty: true,
  isTalonEmpty: false,
  isTalonHasOneCard: false,
  isDefenderGaveUp: false,
  playersCount: 0,
};

export const useGameStateStore = defineStore("game", () => {
  const gameState: OmittedGameState = reactive({ ...defaultGameState });

  const enemiesStore = useGameEnemiesStore();
  const selfStore = useGameSelfStore();
  const deskStore = useGameDeskStore();

  const restore = (newState: GameState) => {
    selfStore.self = newState.self;
    enemiesStore.enemies = newState.enemies;
    deskStore.deskSlots = newState.deskSlots;
    gameState.trumpCard = newState.trumpCard;
    gameState.allowedPlayerId = newState.allowedPlayerId;
    gameState.isDiscardEmpty = newState.isDiscardEmpty;
    gameState.isTalonEmpty = newState.isTalonEmpty;
    gameState.isTalonHasOneCard = newState.isTalonHasOneCard;
    gameState.isDefenderGaveUp = newState.isDefenderGaveUp;
    gameState.playersCount = newState.playersCount;
    gameState.roundNumber = newState.roundNumber;
    gameState.settings = newState.settings.userCount;
  };

  const moveTime = ref(gameState.settings?.moveTime ?? 0);
  const endTime = ref<number>();
  const timer = useTimeoutPoll(() => {
    const timeDiffInMS = (endTime.value ?? Date.now()) - Date.now()
    // console.log(timeDiff)
    moveTime.value = timeDiffInMS / 1000;
  }, 100);

  const changeRole = (role: PlayerRole, accname: string) => {
    const enemy = enemiesStore.findBy({ accname });
    if (enemy) enemy.kind = role;
    else selfStore.changeRole(role, accname);
  };

  const setTrumpCard = (card: Card) => gameState.trumpCard = card;

  const allowedPlayerId = computed(() => gameState.allowedPlayerId);

  return { gameState, restore, setTrumpCard, changeRole, allowedPlayerId, timer, count: moveTime, endTime };
});
