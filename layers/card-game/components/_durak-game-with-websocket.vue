<template>
  <div v-if="!isLoading && gameState">
    <durak-game
      :discard="gameState.discard"
      :self="gameState.self"
      :talon="gameState.talon"
      :enemies-by-sides="{
        top: gameState.enemies.map(
          (enemy) =>
            ({
              id: enemy.id,
              cardCount: enemy.cardCount,
              info: enemy.info,
              isAllowedToMove: enemy.isAllowedToMove,
              kind: enemy.kind,
            }) satisfies Enemy,
        ),
        left: [],
        right: [],
      }"
      :slots="gameState.desk.slots"
      :allowed="undefined"
      :is-self-allowed="false"
      @card-drop="onCardDrop"
    />
    <pre>
    {{ gameId }}
    <JsonViewer
      :data="gameState"
    />
  </pre>
  </div>
</template>
<script setup lang="ts">
import { computed, provide, ref } from "vue";
import type { Card } from "@durak-game/durak-dts";
import JsonViewer from "./json-viewer.vue";
import { useWebSocket } from "@vueuse/core";
import DurakGame from "./_durak-game.vue";
import type { GameRestoreStateEventPayload } from "../../../server/src/utils/durak-game-state-restore-schema";
import type { Enemy } from "@durak-game/durak-dts";
const { gameId } = defineProps<{
  gameId: string;
}>();

const isLoading = ref(true);
const gameState = ref<GameRestoreStateEventPayload>();

useWebSocket(`ws://localhost:10000/games/${gameId}`, {
  onMessage(_ws, event) {
    console.log(event);
    let json: { event: string; payload: object };
    try {
      json = JSON.parse(event.data);
      if (!json || typeof json !== "object") {
        throw new TypeError("WebSocket event data is not an object");
      }
      if (!("event" in json) || typeof json.event !== "string") {
        throw new Error(
          "WebSocket event data does not have 'event' string property",
        );
      }
      if (!("payload" in json) || typeof json.payload !== "object") {
        throw new Error(
          "WebSocket event data does not have 'payload' object property",
        );
      }
    } catch {
      return;
    }
    if (json.event === "game::state::restore") {
      isLoading.value = false;
      gameState.value = json.payload as GameRestoreStateEventPayload;
    }
  },
});

provide(
  "selfCards",
  computed(() => (gameState.value ? gameState.value.self.cards : [])),
);

provide(
  "deskSlotKeys",
  computed(() =>
    gameState.value
      ? Array.from(gameState.value.desk.slots).map((slot) => slot.index + 1)
      : [],
  ),
);

function onCardDrop(_: DragEvent, card: Card, slotIndex: number) {
  if (!gameState.value) {
    throw new Error("No game state");
  }
  try {
    const slot = gameState.value.desk.slots[slotIndex];
    // TODO: use below code for optimistic update
    // TODO: send websocket event, on error rollback
    if (!("attackCard" in slot)) {
      slot.attackCard = card;
    } else if (!("defendCard" in slot)) {
      slot.defendCard = card;
    }
  } catch (reason) {
    console.error("onCard error", { reason });
    return;
  }
}

// socket.on("connect_error", (err) => {
//   // the reason of the error, for example "xhr poll error"
//   console.log(err.message);

//   // some additional description, for example the status code of the initial HTTP response
//   console.log(err.description);

//   // some additional context, for example the XMLHttpRequest object
//   console.log(err.context);
// });

// socket.on('game::state::restore', (payload) => {
//   console.log({ payload })
//   asyncGameState.resolve(payload.state)
// })
// const gameState = await asyncGameState.promise

// socket.on("talon::madeDistribution")
// const talon = useNoCardCountTalon(gameState.talon);

// desk.on("card::clear", deskStore.clear)
// desk.on("card::receive", deskStore.insertCard)
// discard.on("cards::receive", (discard) => )
// talon.on("distribution::make", )
// self.on("cards::receive", playersStore.putCardsToPlayer)
// self.on("card::drop-attempt", playersStore.putCardsToPlayer)
// enemy.on("cards::receive", playersStore.putCardsToPlayer)
// enemy.on("card::drop-attempt", playersStore.putCardsToPlayer)
// player.on("changedKind", playersStore.changePlayerKind)

//  on game state restore =>
// self must have cards with isTrump
// this can be done through talon.trumpCard
// this should be done on server
</script>
