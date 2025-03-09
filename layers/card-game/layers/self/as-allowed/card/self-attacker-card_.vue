<template>
  <self-base-card
    ref="selfBaseCard"
    v-bind="$props"
    class="border-red-600"
    :class="[canBeUsedForAttack && 'outline outline-yellow-500']"
  />
</template>
<!-- NOTE: this component must be used when self is attacker -->
<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import SelfBaseCard, {
  type SelfBaseCardProps,
} from "../../card/self-base-card.vue";

defineProps<SelfBaseCardProps>();

const canBeUsedForAttack = computed(() => false);

const baseCardRef = useTemplateRef("selfBaseCard");
const element = computed(() => baseCardRef.value?.element);

defineExpose({ element });
</script>
