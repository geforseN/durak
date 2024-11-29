import { defineStore } from "pinia";
import { computed } from "vue";
import * as v from 'valibot';
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

const cardType = v.object({ rank: v.picklist(ranks), suit: v.picklist(suits) });
const playerKindType = v.picklist(playerKinds);

const schemas = {
  "player::receiveCards": [
    v.object({
      id: v.string(),
      addedCardsCount: v.number(),
      handCount: v.optional(v.number()),
    }),
    v.object({
      addedCards: v.array(cardType),
      handCount: v.optional(v.number()),
    }),
  ],
  "player::removeCard": [
    v.object({
      player: v.object({ id: v.string() }),
      newCardsCount: v.optional(v.number()),
    }),
    v.object({
      player: v.optional(v.object({ newCardsCount: v.number() })),
      card: cardType,
    }),
  ],
  "allowedPlayer::defaultBehavior": [
    v.object({
      allowedPlayer: v.object({ id: v.string() }),
      defaultBehavior: v.object({
        callTime: v.object({ UTC: v.number() }),
      }),
    }),
    v.object({
      defaultBehavior: v.object({
        callTime: v.object({ UTC: v.number() }),
      }),
    }),
  ],
  "player::changedKind": [
    v.object({
      id: v.string(),
      newKind: playerKindType,
    }),
    v.object({
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
    if (v.is(enemy, player)) {
      return enemiesStore.enemies
        .getById(player.id)
        .increaseCardCount(player.addedCardsCount);
    }
    if (v.is(self, player)) {
      return selfStore.self.receiveCard(...player.addedCards);
    }
    throw new Error(`player::receiveCards incorrect payload:${player}`);
  };

  const changePlayerKind = ({ player }: { player: unknown }) => {
    const [enemy, self] = schemas["player::changedKind"];
    if (v.is(enemy, player)) {
      return enemiesStore.enemies.getById(player.id).updateKind(player.newKind);
    }
    if (v.is(self, player)) {
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
    if (v.is(self, payload)) {
      return selfStore.self.removeCard(payload.card);
    }
    if (v.is(enemy, payload)) {
      return enemiesStore.enemies
        .getById(payload.player.id)
        .decrementCardCount();
    }
  };

  const updateTimerForNewAllowedPlayer = (payload: object) => {
    const [enemy, self] = schemas["allowedPlayer::defaultBehavior"];

    if (!v.is(self, payload) && !v.is(enemy, payload)) {
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
