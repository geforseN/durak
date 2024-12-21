<template>
  <self-base-card
    ref="selfBaseCard"
    v-bind="baseCardProps"
    class="border-red-600"
    :class="[canBeUsedForAttack && 'outline outline-yellow-500']"
  />
</template>
<!-- NOTE: this component must be used when self is attacker -->
<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import SelfBaseCard, { type SelfBaseCardProps } from "../../card/self-base-card.vue";
// import { injectOrThrow } from "@/utils/vue/inject-or-throw";
import type { Rank } from "@durak-game/durak-dts";

const { rank: _, ...baseCardProps } = defineProps<
  SelfBaseCardProps & { rank: Rank }
>();

// const gameDeskSlots = injectOrThrow<{
//   ranks: ComputedRef<Rank[]>;
// }>("gameDeskSlots");

const canBeUsedForAttack = computed(
  () => false,
  // gameDeskSlots.ranks.value.includes(rank),
);
const baseCardRef = useTemplateRef("selfBaseCard");
const element = computed(() => baseCardRef.value?.element);

defineExpose({ element });
</script>
