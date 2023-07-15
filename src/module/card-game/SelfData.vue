<template>
  <div class="flex flex-col w-full max-w-5xl">
    <self-interface @stop-move="props.handlers.stopMove" />
    <self-deck @card-drag="props.handlers.cardDrag" @card-drag-end="props.handlers.cardDragEnd"
      @handle-card-drop-on-desk="props.handlers.cardDeskInsert" />
  </div>
</template>
<script setup lang="ts">
import SelfDeck from "@/module/card-game/SelfDeck.vue";
import SelfInterface from "@/module/card-game/SelfInteface.vue";
import { useGameStateStore } from "@/stores/game";

const props = defineProps<{
  handlers: {
    cardDrag: Function,
    cardDragEnd: Function,
    stopMove: Function,
    cardDeskInsert: Function,
  }
}>();

const gameStateStore = useGameStateStore();
</script>
