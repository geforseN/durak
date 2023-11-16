import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useGameEnemiesStore, useGameSelfStore } from "./index";
import { array, enumType, is, number, object, optional, string } from "valibot";
import { playerKinds, ranks, suits } from "@durak-game/durak-dts";
import type {
  BasePlayer,
  Card as CardDTO,
  DurakGameSocket,
} from "@durak-game/durak-dts";
import type Player from "@/module/card-game/entity/Player";
import type { Socket } from "socket.io-client";

const cardType = object({ rank: enumType(ranks), suit: enumType(suits) });
const playerKindType = enumType(playerKinds);

const schemas = {
  "player::receiveCards": [
    object({
      id: string(),
      addedCardsCount: number(),
      handCount: optional(number()),
    }),
    object({
      addedCards: array(cardType),
      handCount: optional(number()),
    }),
  ],
  "player::removeCard": [
    object({
      player: object({ id: string() }),
      newCardsCount: optional(number()),
    }),
    object({
      player: optional(object({ newCardsCount: number() })),
      card: cardType,
    }),
  ],
  "allowedPlayer::defaultBehavior": [
    object({
      allowedPlayer: object({ id: string() }),
      defaultBehavior: object({
        callTime: object({ UTC: number() }),
      }),
    }),
    object({
      defaultBehavior: object({
        callTime: object({ UTC: number() }),
      }),
    }),
  ],
  "player::changedKind": [
    object({
      id: string(),
      newKind: playerKindType,
    }),
    object({
      newKind: playerKindType,
    }),
  ],
} as const;

export const useGamePlayersStore = defineStore("players-store", () => {
  const enemiesStore = useGameEnemiesStore();
  const selfStore = useGameSelfStore();

  const __allowedPlayer__ = computed<Player>(
    () => {
      if (selfStore.self.isAllowed) {
        return selfStore.self;
      }
      if (enemiesStore.enemies.hasAllowedPlayer) {
        return enemiesStore.enemies.allowedPlayer;
      }
      throw new Error("No allowed player was found");
    },
    {
      onTrigger(event) {
        console.log("__allowedPlayer__", event);
      },
    },
  );
  const timerId = ref();

  // TODO - wont work
  const hasSurrenderedDefender = computed(() => {
    return (
      selfStore.self.isSurrendered ||
      enemiesStore.enemies.hasSurrenderedDefender
    );
  });

  const putCardsToPlayer = ({ player }: { player: unknown }) => {
    const [enemy, self] = schemas["player::receiveCards"];
    if (is(enemy, player)) {
      return enemiesStore.enemies
        .getById(player.id)
        .increaseCardCount(player.addedCardsCount);
    }
    if (is(self, player)) {
      return selfStore.self.receiveCard(...player.addedCards);
    }
    throw new Error(`player::receiveCards incorrect payload:${player}`);
  };

  const changePlayerKind = ({ player }: { player: unknown }) => {
    const [enemy, self] = schemas["player::changedKind"];
    if (is(enemy, player)) {
      return enemiesStore.enemies
        .getById(player.id)
        .updateKindWithTimer(player.newKind);
    }
    if (is(self, player)) {
      return selfStore.self.updateKind(player.newKind);
      // return selfStore.self.updateKindWithTimer(player.newKind);
    }
    throw new Error(`player::changedKind incorrect payload:${player}`);
  };

  const restore = (
    selfDTO: BasePlayer & { cards: CardDTO[] },
    enemyDTOs: (BasePlayer & { cardCount: number })[],
    gameSocket: Socket<
      DurakGameSocket.ServerToClientEvents,
      DurakGameSocket.ClientToServerEvents
    >,
  ) => {
    selfStore.restore(selfDTO, gameSocket);
    enemiesStore.restore(enemyDTOs);
    addTimer();
    1;
  };

  const removeCardFromPlayer = (payload: object) => {
    const [enemy, self] = schemas["player::removeCard"];
    if (is(self, payload)) {
      return selfStore.self.removeCard(payload.card);
    }
    if (is(enemy, payload)) {
      return enemiesStore.enemies
        .getById(payload.player.id)
        .decrementCardCount();
    }
  };

  const updateTimerForNewAllowedPlayer = (payload: object) => {
    const [enemy, self] = schemas["allowedPlayer::defaultBehavior"];

    if (!is(self, payload) && !is(enemy, payload)) {
      throw new Error("Invalid payload allowedPlayer::defaultBehavior");
    }
    clearInterval(timerId.value);

    __allowedPlayer__.value.timer = {
      endTime: payload.defaultBehavior.callTime,
    };

    addTimer();
  };

  function addTimer() {
    timerId.value = setInterval(() => {
      console.log(__allowedPlayer__.value.id);
      // console.log(__allowedPlayer__.value.timer);
      // console.log(
      //   (__allowedPlayer__.value.timer.endTime.UTC - Date.now()) / 1_000,
      // );
      // if (__allowedPlayer__.value.timer.endTime.UTC) {
      //   return;
      // }
      //   __allowedPlayer__.value.timer.remainedTime.milliseconds =
      //     __allowedPlayer__.value.timer.endTime.UTC - Date.now();
      // __allowedPlayer__.value.timer.remainedTime.seconds =
      //   __allowedPlayer__.value.timer.remainedTime.milliseconds / 1_000;

      // __allowedPlayer__.value.timer.remainedTime.positiveTimeAsString =
      //   Math.max(
      //     __allowedPlayer__.value.timer.remainedTime.seconds,
      //     0,
      //   ).toExponential(2);
      // selfStore.timer.remainedTime.timeAsString =
      //   __allowedPlayer__.value.timer.remainedTime.seconds.toExponential(2);
    }, 1_000);
  }

  const isPlayerAllowed = (player: Player) => {
    return player.id === __allowedPlayer__.value?.id;
  };

  return {
    hasSurrenderedDefender,
    __allowedPlayer__,
    isPlayerAllowed,
    putCardsToPlayer,
    changePlayerKind,
    removeCardFromPlayer,
    updateTimerForNewAllowedPlayer,
    restore,
  };
});
