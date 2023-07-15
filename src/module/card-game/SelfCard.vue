<template>
  <div class="relative" @pointerover="console.log(props.index)" draggable="true"
    @dragstart="emit('cardDrag', $event, { rank, suit })" @dragend.prevent="emit('cardDragEnd', $event, { rank, suit })"
    @focus="handleFocus($event, props)" @blur="handleBlur">
    <div :style="{ 'backgroundImage': `url(https://deckofcardsapi.com/static/img/${id}.png)` }" :class="[
      isFocused && '-translate-y-10 outline outline-green-500 outline-4 outline-offset-2',
      canBeUsedForDefense && !isTrump && 'outline outline-blue-500',
      canBeUsedForDefense && isTrump && 'outline outline-purple-500 outline-4',
      canBeUsedForTransferMove && 'outline outline-red-500 rotate-2',
      canBeUsedForAttack && 'outline outline-yellow-500',
    ]"
      class="cursor-pointer h-[116px] w-[83px] border-2 border-black rounded bg-cover bg-blacktransition-all ease-out ">
    </div>
    <!-- <div v-if="isFocused"
      class="pointer-events-none select-none absolute top-8 right-1/2 translate-x-1/2 flex justify-center border-red-500 border bg-slate-300 w-max h-max">
      Card <br /> index: <br /> {{ index }}</div> -->
    <input type="radio" name="self-card" @focus="isFocused = true" @blur="isFocused = false"
      class="z-10 rounded-md w-full h-full appearance-none absolute inset-0 outline-none" />
  </div>
</template>

<script setup lang="ts">
import type { Card } from "@/module/card-game/types";
import { useGameCard } from "@/module/card-game/composable/useGameCard";
import { ref } from "vue";
import { useEventListener } from "@vueuse/core";

const props = defineProps<Card & { index: number }>();
const emit = defineEmits<{
  (e: "cardDrag", $event: Event, card: Card): void
  (e: "cardDragEnd", $event: Event, card: Card): void
  (e: "handleCardDropOnDesk", data: { card: Card, slotIndex: number }): void
}>();
const isFocused = ref(false);

const handleFocus = (_event: FocusEvent, data: Card & { index: number }) => {
  // console.log(index)
}

const handleBlur = () => {
}


const { id, isTrump, canBeUsedForAttack, canBeUsedForDefense, canBeUsedForTransferMove } = useGameCard(props);

useEventListener('keyup', (event: KeyboardEvent) => {
  if (!isFocused.value) return;
  const deskIndexes = [1, 2, 3, 4, 5, 6];
  if (!deskIndexes.includes(+event.key)) return;
  const slotIndex = +event.key - 1;
  const card = { rank: props.rank, suit: props.suit }
  emit("handleCardDropOnDesk", { card, slotIndex })
})
</script>
