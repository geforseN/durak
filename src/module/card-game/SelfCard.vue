<template>
  <div
    class="relative"
    draggable="true"
    @dragstart="handleCardDrag($event, { rank, suit })"
    @dragend.prevent="handleCardDragEnd($event, { rank, suit })"
    @focus="handleFocus"
    @blur="handleBlur"
    @pointerover="handlePointOver"
  >
    <div
      :style="{
        backgroundImage: `url(https://deckofcardsapi.com/static/img/${id}.png)`,
      }"
      :class="[
        isFocused &&
          '-translate-y-10 outline outline-green-500 outline-4 outline-offset-2',
        canBeUsedForDefense && !isTrump && 'outline outline-blue-500',
        canBeUsedForDefense &&
          isTrump &&
          'outline outline-purple-500 outline-4',
        canBeUsedForTransferMove && 'outline outline-red-500 rotate-2',
        canBeUsedForAttack && 'outline outline-yellow-500',
      ]"
      class="cursor-pointer h-[116px] w-[83px] border-2 border-black rounded bg-cover bg-blacktransition-all ease-out"
    ></div>
    <!-- <div v-if="isFocused"
      class="pointer-events-none select-none absolute top-8 right-1/2 translate-x-1/2 flex justify-center border-red-500 border bg-slate-300 w-max h-max">
      Card <br /> index: <br /> {{ index }}</div> -->
    <input
      type="radio"
      name="self-card"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="z-10 rounded-md w-full h-full appearance-none absolute inset-0 outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import type { Card } from "@/module/card-game/types";
import { useGameCard } from "@/module/card-game/composable/useGameCard";
import { ref } from "vue";
import { useEventListener } from "@vueuse/core";
import { useSharedDurakGame } from "@/module/card-game/composable/useDurakGame";

const props = defineProps<Card & { index: number }>();

const { handleCardDrag, handleCardDragEnd, handleCardDropOnDesk } =
  useSharedDurakGame();

const isFocused = ref(false);

const handleFocus = () => {};
const handleBlur = () => {};
const handlePointOver = () => {};

const {
  id,
  isTrump,
  canBeUsedForAttack,
  canBeUsedForDefense,
  canBeUsedForTransferMove,
} = useGameCard(props);

useEventListener("keyup", (event: KeyboardEvent) => {
  if (!isFocused.value) return;
  const deskIndexes = [1, 2, 3, 4, 5, 6];
  const eventKey = Number(event.key);
  if (!deskIndexes.includes(eventKey)) return;
  handleCardDropOnDesk({ rank: props.rank, suit: props.suit }, eventKey - 1);
});
</script>
