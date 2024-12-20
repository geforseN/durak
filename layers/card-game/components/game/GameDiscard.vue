<template>
  <card-background v-if="!isEmpty" />
</template>
<script setup lang="ts">
import CardBackground from "$/card-game/components/card/CardBackground.vue";

defineProps<{
  isEmpty: boolean;
}>();
</script>
