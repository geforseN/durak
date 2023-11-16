import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type {
  BasePlayer,
  CardDTO,
  DurakGameSocket,
  PlayerInfo,
  PlayerKind,
} from "@durak-game/durak-dts";
import type { Socket } from "socket.io-client";
import useSelf from "@/module/card-game/composable/useSelf";

export type PlayerData = {
  info: PlayerInfo;
  kind: PlayerKind;
  id: string;
} | null;

export const useGameSelfStore = defineStore("game-self", () => {
  const options = { timeout: { timeBeforeError: 5_000 } };
  const state = reactive({
    isLoading: true,
    isErrorHappened: false,
    timeout: {
      id: setTimeout(() => {
        if (state.isLoading) {
          state.isErrorHappened = true;
        }
      }, options.timeout.timeBeforeError),
    },
  });
  const playerData = ref<PlayerData>(null);
  const cards = ref<CardDTO[]>([]);
  const self = useSelf(playerData, cards);

  function restore(
    selfDTO: BasePlayer & { cards: CardDTO[] },
    gameSocket: Socket<
      DurakGameSocket.ServerToClientEvents,
      DurakGameSocket.ClientToServerEvents
    >,
  ) {
    playerData.value = {
      id: selfDTO.id,
      info: selfDTO.info,
      kind: selfDTO.kind,
    };
    cards.value = selfDTO.cards;
    state.isLoading = false;
    clearTimeout(state.timeout.id);
  }

  return {
    playerData,
    cards,
    self,
    restore,
    state,
  };
});
