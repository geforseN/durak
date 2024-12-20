import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import { useGameDeskStore } from "@/stores/game";
import type { GameState } from "$/card-game/types";
import { useGamePlayersStore } from "./players.store";
import type { Socket } from "$/card-game/types/socket-io";

const defaultGameState: Omit<GameState, "desk" | "enemies" | "self"> = {
  discard: { isEmpty: true },
  status: "starts",
  round: {
    number: 0,
  },
  talon: {
    hasOneCard: false,
    isEmpty: true,
    trumpCard: { rank: "A", suit: "♠" },
  },
  settings: {
    players: {
      count: 2,
      moveTime: Infinity,
    },
    desk: { allowedFilledSlotCount: 6, slotCount: 6 },
    type: "basic",
    initialDistribution: { cardCountPerIteration: 2, finalCardCount: 6 },
    talon: { count: 36 },
  },
};

export const useGameStateStore = defineStore("game-state", () => {
  const gameState: Omit<GameState, "desk" | "enemies" | "self"> = reactive({
    ...defaultGameState,
  });
  const deskStore = useGameDeskStore();
  const playersStore = useGamePlayersStore();

  const restore = ({
    state,
    gameSocket
  }: {
    state: GameState;
    gameSocket: Socket
  }) => {
    // TODO add isDefenderGaveUp related property (maybe add in state.enemies)
    playersStore.restore(state.self, state.enemies, gameSocket);
    deskStore.slots = state.desk.slots;
    // TODO add state.talon.trumpCardOwnerId;
    gameState.status = state.status;
    gameState.round = state.round;
    gameState.settings = state.settings;
    gameState.talon = state.talon;
    gameState.discard = state.discard;
  };

  return {
    trumpSuit: computed(() => gameState.talon.trumpCard.suit),
    gameState,
    talon: computed(() => gameState.talon),
    discard: computed(() => gameState.discard),
    round: computed(() => gameState.round),
    restore,
  };
});
