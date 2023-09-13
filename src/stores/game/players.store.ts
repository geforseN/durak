import { defineStore } from "pinia";
import { computed } from "vue";
import { useGameEnemiesStore, useGameSelfStore } from "./index";
import { array, enumType, is, number, object, optional, string } from "valibot";
import { playerKinds, ranks, suits } from "@durak-game/durak-dts";
import type { BasePlayer, Card as CardDTO } from "@durak-game/durak-dts";

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

  const me = computed(() => selfStore.self);

  const allowedPlayer = computed(() => {
    if (selfStore.self.canMakeMove) {
      return selfStore.self;
    }
    if (enemiesStore.enemies.hasAllowedPlayer) {
      return enemiesStore.enemies.allowedPlayer;
    }
    throw new Error();
  });

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
      return selfStore.self.receive(...player.addedCards);
    }
    throw new Error(`player::receiveCards incorrect payload:${player}`);
  };

  const changePlayerKind = ({ player }: { player: unknown }) => {
    const [enemy, self] = schemas["player::changedKind"];
    if (is(enemy, player)) {
      return void (enemiesStore.enemies.getById(player.id).kind =
        player.newKind);
    }
    if (is(self, player)) {
      return void (selfStore.self.kind = player.newKind);
    }
  };

  const restore = (
    selfDTO: BasePlayer & { cards: CardDTO[] },
    enemyDTOs: (BasePlayer & { cardCount: number })[],
  ) => {
    selfStore.restore(selfDTO);
    enemiesStore.restore(enemyDTOs);
  };

  const removeCardFromPlayer = (payload: object) => {
    const [enemy, self] = schemas["player::removeCard"];
    if (is(self, payload)) {
      return selfStore.self.remove(payload.card);
    }
    if (is(enemy, payload)) {
      return enemiesStore.enemies
        .getById(payload.player.id)
        .decrementCardCount();
    }
  };

  const timerHolder = computed(() => {
    if (selfStore.self.hasActiveTimer()) {
      return selfStore.self;
    }
    if (enemiesStore.enemies.hasTimerHolder) {
      return enemiesStore.enemies.timerHolder;
    }
  });

  function removeTimerFromTimerHolder() {
    if (selfStore.self.hasActiveTimer()) {
      return selfStore.self.timer.makeInactive();
    }
    if (enemiesStore.enemies.hasTimerHolder) {
      return enemiesStore.enemies.timerHolder.timer?.makeInactive();
    }
    const holder = timerHolder.value;
    if (!holder) {
      return console.log(
        "Could not remove timer from timer holder: no timer holder was found",
      );
    }
    return holder.timer.makeInactive();
  }

  function setTimerForNewHolder(payload: object) {
    const [enemy, self] = schemas["allowedPlayer::defaultBehavior"];
    if (is(enemy, payload)) {
      // NOTE: SO, if assert below will never logged, 
      // THEN code can be -> allowedPlayer.value.timer.add(payload.defaultBehavior.callTime)
      console.assert(payload.allowedPlayer.id === allowedPlayer.value.id);
      return enemiesStore.enemies
        .getById(payload.allowedPlayer.id)
        .timer.makeActive(payload.defaultBehavior.callTime);
    }
    if (is(self, payload)) {
      return selfStore.self.timer.makeActive(payload.defaultBehavior.callTime);
    }
  }

  const updateTimerForNewAllowedPlayer = (payload: object) => {
    removeTimerFromTimerHolder();
    setTimerForNewHolder(payload);
  };

  return {
    hasSurrenderedDefender,
    timerHolder,
    allowedPlayer,
    putCardsToPlayer,
    changePlayerKind,
    removeCardFromPlayer,
    updateTimerForNewAllowedPlayer,
    restore,
  };
});
