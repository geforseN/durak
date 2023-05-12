<template>
  <div :style="{ 'backgroundImage': `url(https://deckofcardsapi.com/static/img/${id}.png)` }" :class="[
    canBeUsedForDefense && !isTrump && 'outline outline-blue-500',
    canBeUsedForDefense && isTrump && 'outline outline-purple-500 outline-4',
    canBeUsedForTransferMove && 'outline outline-red-500 rotate-2',
    canBeUsedForAttack && 'outline outline-yellow-500',
  ]" draggable="true" @dragstart="emit('cardDrag', $event, { rank, suit })"
       @dragend.prevent="emit('cardDragEnd', $event, { rank, suit })"
       class="h-[116px] w-[83px] border-2 border-black rounded bg-cover bg-black"></div>
</template>

<script setup lang="ts">
import type { Card } from "@/module/card-game/types";
import { useGameCard } from "@/module/card-game/composable/useGameCard";

const props = defineProps<Card>();
const emit = defineEmits<{
  (e: "cardDrag", $event: Event, card: Card): void
  (e: "cardDragEnd", $event: Event, card: Card): void
}>();

const { id, isTrump, canBeUsedForAttack, canBeUsedForDefense, canBeUsedForTransferMove } = useGameCard(props);
</script>
