<template>
  <div
    v-if="isLoading"
    data-testid="durak-game-loading-skeleton"
    :class="
      isLoading &&
        'flex h-[92.5dvh] w-full animate-pulse items-center justify-center bg-base-300'
    "
  >
    <div
      class="size-12 animate-spin rounded-full border-2 border-dashed border-base-content bg-base-100"
    />
  </div>
  <div v-else-if="gameState">
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
    <div class="h-8" />
    {{ gameId }}
    <JsonViewer
      :data="gameState"
    />
  </pre>
  </div>
</template>
<script setup lang="ts">
import { computed, provide, ref } from "vue";
import type { Card, Enemy } from "@durak-game/durak-dts";
import JsonViewer from "./json-viewer.vue";
import DurakGame from "./_durak-game.vue";
import type { GameRestoreStateEventPayload } from "@@/server/src/utils/durak-game-state-restore-schema";
import { parseWebSocketEventData } from "@@/shared/src/websocket";
import { useWebSocket } from "@/api/websocket";

const { gameId } = defineProps<{
  gameId: string;
}>();

const isLoading = ref(true);
const gameState = ref<GameRestoreStateEventPayload>();

const websocket = useWebSocket(`games/${gameId}`, {
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

provide("self", {
  isDefender: false,
  isAttacker: false,
});

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
