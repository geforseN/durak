<template>
  <div class="flex flex-col items-center">
    <div v-if="selfStore.self.id === gameStateStore.allowedPlayerId" class="flex mb-4 text-xl gap-2">
      <span class="flex gap-2 justify-center items-center dark:text-white">
        Время твоего хода
      </span>
      <emoji-happy class="dark:fill-white"/>
      <span class="dark:text-white">У тебя есть XX секунд на ход</span>
    </div>
    <self-interface @stop-move="props.stopMove" />
    <self-deck @card-drag="props.handleCardDrag" @card-drag-end="props.handleCardDragEnd" />
  </div>
</template>
<script setup lang="ts">
import EmojiHappy from "@/components/svg/EmojiHappy.vue";
import SelfDeck from "@/module/card-game/SelfDeck.vue";
import SelfInterface from "@/module/card-game/SelfInteface.vue";
import { useGameSelfStore, useGameStateStore } from "@/stores/game";

const props = defineProps<{
  handleCardDrag: Function,
  handleCardDragEnd: Function,
  stopMove: Function,
}>();

const selfStore = useGameSelfStore();
const gameStateStore = useGameStateStore();
</script>
