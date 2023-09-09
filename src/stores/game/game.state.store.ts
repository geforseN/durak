import { computed, reactive, type ComputedRef } from "vue";
import { defineStore } from "pinia";
import {
  useGameEnemiesStore,
  useGameDeskStore,
  useGameSelfStore,
} from "@/stores/game";
import type { GameState } from "@/module/card-game/types";
import { useTimeoutPoll } from "@vueuse/core";
// import { type BetterDurakGameState } from "@/../../durak-server/src/module/DurakGame/DTO/DurakGameState.dto";

const defaultGameState: Omit<GameState, "desk" | "enemies" | "self"> = {
  discard: { isEmpty: true },
  isGameEnded: false,
  round: {
    currentMove: { allowedPlayer: { id: "" }, endTime: { UTC: 0 }, name: "" },
    number: 0,
  },
  talon: {
    hasOneCard: false,
    isEmpty: true,
    trumpCard: { rank: "A", suit: "♠" },
  },
  // desk: { slots: [] },
  // enemies: [
  //   {
  //     cardCount: 0,
  //     id: "qwe",
  //     info: {
  //       id: "qwe",
  //       isAdmin: false,
  //       profile: {
  //         connectStatus: "ONLINE",
  //         nickname: "QWEn",
  //         personalLink: "123",
  //         photoUrl:
  //           "https://cdn.7tv.app/emote/60b14a737a157a7f3360fb32/4x.webp",
  //         userId: "qwe",
  //       },
  //     },
  //     kind: "Player",
  //   },
  // ],
  // self: {
  //   cards: [],
  //   id: "asd",
  //   info: {
  //     id: "asd",
  //     isAdmin: false,
  //     profile: {
  //       connectStatus: "ONLINE",
  //       nickname: "ASDn",
  //       personalLink: "456",
  //       photoUrl: "https://cdn.7tv.app/emote/6306876cbe8c19d70f9d6b22/4x.webp",
  //       userId: "asd",
  //     },
  //   },
  //   kind: "Player",
  // },
  settings: {
    cardCount: 36,
    desk: { allowedFilledSlotCount: 6, slotCount: 6 },
    gameType: "basic",
    initialDistribution: { cardCountPerIteration: 2, finalCardCount: 6 },
    moveTime: 15_000,
    userCount: 2,
  },
};

export const useGameStateStore = defineStore("game", () => {
  const gameState: Omit<GameState, "desk" | "enemies" | "self"> = reactive({
    ...defaultGameState,
  });
  const enemiesStore = useGameEnemiesStore();
  const selfStore = useGameSelfStore();
  const deskStore = useGameDeskStore();
  const desk = computed(() => ({ slots: deskStore.slots }));
  const me = computed(() => selfStore.self);
  const enemies = computed(() => enemiesStore.enemies);

  const restore = ({ state }: { state: GameState }) => {
    // TODO add isDefenderGaveUp related property (maybe add in state.enemies)
    selfStore.self = state.self;
    enemiesStore.enemies = state.enemies.map((enemy) => {
      console.log({ typeofEnemyInfo: typeof enemy.info === "string" });
      return {
        ...enemy,
        info:
          typeof enemy.info === "string" ? JSON.parse(enemy.info) : enemy.info,
      };
    });
    deskStore.slots = state.desk.slots;
    // TODO add state.talon.trumpCardOwnerId;
    gameState.isGameEnded = state.isGameEnded;
    gameState.round = state.round;
    gameState.settings = state.settings;
    gameState.talon = state.talon;
    gameState.discard = state.discard;
  };

  const remainedTime: {
    seconds: ComputedRef<number>;
    milliseconds: ComputedRef<number>;
    updateIntervale: ComputedRef<number>;
  } = {
    milliseconds: computed(
      () => gameState.round.currentMove.endTime.UTC - Date.now(),
    ),
    seconds: computed(() => remainedTime.milliseconds.value / 1000),
    updateIntervale: computed(() =>
      remainedTime.seconds.value > 11 ? 1000 : 100,
    ),
  };

  useTimeoutPoll(() => {
    remainedTime.seconds.effect.run();
  }, remainedTime.updateIntervale);

  return {
    trumpSuit: computed(() => gameState.talon.trumpCard.suit),
    remainedTime,
    gameState,
    restore,
  };
});
