<template>
  <div
    class="relative"
    draggable="true"
    @dragstart="
      durakGame.handleCardDrag($event, { rank: props.rank, suit: props.suit })
    "
    @dragend.prevent="
      durakGame.handleCardDragEnd($event, {
        rank: props.rank,
        suit: props.suit,
      })
    "
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
      class="cursor-pointer h-[116px] w-[83px] border-2 border-black rounded bg-cover bg-black transition-all ease-out"
    ></div>
    <!-- TODO -->
    <!-- TODO -->
    <!-- TODO -->
    <!-- TODO remove commented code -->
    <!-- <div v-if="isFocused"
      class="pointer-events-none select-none absolute top-8 right-1/2 translate-x-1/2 flex justify-center border-red-500 border bg-slate-300 w-max h-max">
      Card <br /> index: <br /> {{ index }}</div> -->
    <!-- TODO -->
    <!-- TODO -->
    <!-- TODO -->
    <!-- TODO -->
    <input
      type="radio"
      name="self-card"
      @focus="handleCardFocus"
      @blur="handleCardBlur"
      class="z-10 rounded-md w-full h-full appearance-none absolute inset-0 outline-none"
    />
  </div>
</template>

<script setup lang="ts">
import type { Card as CardDTO } from "@durak-game/durak-dts";
import { useGameCard } from "@/module/card-game/composable/useGameCard";
import { ref } from "vue";
import { useEventListener } from "@vueuse/core";
import { useSharedDurakGame } from "@/module/card-game/composable/useDurakGame";

const props = defineProps<CardDTO & { index: number }>();

const durakGame = useSharedDurakGame();
const {
  id,
  isTrump,
  canBeUsedForAttack,
  canBeUsedForDefense,
  canBeUsedForTransferMove,
} = useGameCard(props);

const isFocused = ref(false);

// TODO add logic for card event listeners (if it even needed)
const handleFocus = () => {};
const handleBlur = () => {};
const handlePointOver = () => {};

const handleCardFocus = () => {
  isFocused.value = true;
};

const handleCardBlur = () => {
  isFocused.value = false;
};

const deskSlotsKeys = [1, 2, 3, 4, 5, 6];

useEventListener("keyup", (event: KeyboardEvent) => {
  if (!isFocused.value) {
    return;
  }
  const pressedKey = Number(event.key);
  if (!deskSlotsKeys.includes(pressedKey)) {
    return;
  }
  const slotIndex = pressedKey - 1;
  durakGame.handleCardDropOnDesk(props, slotIndex);
});
</script>
