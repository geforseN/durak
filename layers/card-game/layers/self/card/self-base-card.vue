<template>
  <div
    ref="element"
    :style="{
      backgroundImage: `url(https://deckofcardsapi.com/static/img/${id}.png)`,
    }"
    :class="
      twMerge(
        'h-[116px] w-[83px] rounded border border-black bg-black bg-cover outline outline-4 outline-offset-2 outline-green-500',
        isFocused && '-translate-y-10 transition-all ease-out',
      )
    "
  />
</template>
<script lang="ts">
export interface SelfBaseCardProps {
  id: string;
  isFocused: boolean;
}
</script>
<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { useTemplateRef } from "vue";

defineProps<SelfBaseCardProps>();

const element = useTemplateRef("element");

defineExpose({ element });
</script>
