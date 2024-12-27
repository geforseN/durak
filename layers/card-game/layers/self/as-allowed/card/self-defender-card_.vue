<template>
  <self-base-card
    ref="selfBaseCard"
    v-bind="baseCardProps"
    class="border-blue-600"
    :class="[
      canBeUsedForDefense && isTrump
        ? 'outline outline-blue-500'
        : 'outline outline-4 outline-purple-500',
      canBeUsedForTransferMove && 'rotate-2 outline outline-red-500',
      // TODO: card can be used for defense and transfer move at the same time, must add unique class (now they are overlapping)
    ]"
  />
</template>
<!-- NOTE: this component must be used when self is defender -->
<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import SelfBaseCard, {
  type SelfBaseCardProps,
} from "../../card/self-base-card.vue";
import type { Card } from "@durak-game/durak-dts";

const { isTrump, rank, suit, ...props } = defineProps<
  SelfBaseCardProps &
    Card & {
      isTrump: boolean;
    }
>();

const canBeUsedForDefense = computed(() => {
  return false;
});

const baseCardRef = useTemplateRef("selfBaseCard");
const element = computed(() => baseCardRef.value?.element);

defineExpose({ element });

const canBeUsedForTransferMove = computed(() => {
  return false;
});
</script>
