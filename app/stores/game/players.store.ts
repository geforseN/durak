import { defineStore } from "pinia";
import { computed } from "vue";
import { array, enumType, is, number, object, optional, string } from "valibot";
import type { Socket } from "socket.io-client";
import {
  playerKinds,
  ranks,
  suits,
  type BasePlayer,
  type CardDTO,
  type DurakGameSocket,
} from "@durak-game/durak-dts";

import { useGameEnemiesStore, useGameSelfStore } from "./index";

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

  // NOTE: it might now work, (idk why, must prev comment here was not helpful with that)
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
      return enemiesStore.enemies.getById(player.id).updateKind(player.newKind);
    }
    if (is(self, player)) {
      return selfStore.self.updateKind(player.newKind);
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
  };

  return {
    restore,
    hasSurrenderedDefender,
    putCardsToPlayer,
    changePlayerKind,
    removeCardFromPlayer,
    updateTimerForNewAllowedPlayer,
  };
});
