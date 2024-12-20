<template>
  <div
    class="relative"
    draggable="true"
    @dragstart="
      durakGame.selfDraggedCard.onDrag({ rank, suit })
    "
    @dragend.prevent="durakGame.selfDraggedCard.onDragEnd()"
  >
    <div
      :style="{
        backgroundImage: `url(https://deckofcardsapi.com/static/img/${id}.png)`,
      }"
      :class="[
        isFocused &&
          '-translate-y-10 outline outline-4 outline-offset-2 outline-green-500',
        canBeUsedForDefense && !isTrump && 'outline outline-blue-500',
        canBeUsedForDefense &&
          isTrump &&
          'outline outline-4 outline-purple-500',
        canBeUsedForTransferMove && 'rotate-2 outline outline-red-500',
        canBeUsedForAttack && 'outline outline-yellow-500',
      ]"
      class="h-[116px] w-[83px] cursor-pointer rounded border-2 border-black bg-black bg-cover transition-all ease-out"
    />
    <input
      type="radio"
      name="self-card"
      class="absolute inset-0 z-10 h-full w-full appearance-none rounded-md outline-none"
      @focus="handleCardFocus"
      @blur="handleCardBlur"
    >
  </div>
</template>

<script setup lang="ts">
import type { Card as CardDTO } from "@durak-game/durak-dts";
import { useGameCard } from "$/card-game/composable/useGameCard";
import { ref } from "vue";
import { useEventListener } from "@vueuse/core";

const props = defineProps<CardDTO & { index: number }>();

const {
  id,
  isTrump,
  canBeUsedForAttack,
  canBeUsedForDefense,
  canBeUsedForTransferMove,
} = useGameCard(props);

const isFocused = ref(false);

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
