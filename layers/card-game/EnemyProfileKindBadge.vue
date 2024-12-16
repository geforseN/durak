<template>
  <div class="flex gap-x-0.5">
    <i-si-shield-line
      v-if="kind.includes('Defender')"
      class="h-6 w-6 rounded border border-black bg-blue-700"
    />
    <i-material-symbols-light-swords
      v-else-if="kind.includes('Attacker')"
      class="rounded border border-black bg-red-700"
    />
    <div
      v-if="kind.includes('Allowed')"
      class="flex h-6 w-6 items-center justify-center rounded border border-black bg-green-700"
    >
      <i-iconamoon-clock-thin v-if="hasTimer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PlayerKind } from "./types";

const { kind, hasTimer } = defineProps<{
  kind: PlayerKind;
  hasTimer: boolean;
}>();
</script>
