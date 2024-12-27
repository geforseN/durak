<template>
  <div
    ref="element"
    :style="{
      backgroundImage: `url(https://deckofcardsapi.com/static/img/${id}.png)`,
    }"
    :class="
      twMerge(
        'h-[116px] w-[83px] rounded border border-base-content bg-base-100 bg-cover text-base-content',
        isFocused && '-translate-y-10 transition-all ease-out',
      )
    "
  >
    {{ suit }}
    {{ rank }}
  </div>
</template>
<script lang="ts">
import type { Card } from "@durak-game/durak-dts";

export type SelfBaseCardProps = Card & {
  id: string;
  isFocused: boolean;
};
</script>
<script setup lang="ts">
import { twMerge } from "tailwind-merge";
import { useTemplateRef } from "vue";

defineProps<SelfBaseCardProps>();

const element = useTemplateRef("element");

defineExpose({ element });
</script>
