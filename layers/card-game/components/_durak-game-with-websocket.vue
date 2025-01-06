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

const websocket = useWebSocket(`ws://localhost:10000/games/${gameId}`, {
  onMessage(_ws, event) {
    const data = parseWebSocketEventData(event.data);
    if (data.event === "game::state::restore") {
      isLoading.value = false;
      gameState.value = data.payload as GameRestoreStateEventPayload;
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
    websocket.send(
      JSON.stringify({
        event: "game::card::drop",
        payload: {
          card,
          slotIndex,
        },
      }),
    );
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
</script>
