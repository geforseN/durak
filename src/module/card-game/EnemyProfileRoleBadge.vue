<template>
  <shield-svg
    class="w-6 h-6 z-10 border border-black rounded bg-blue-700"
    v-if="kind === 'Defender'"
  />
  <swords-svg
    class="w-6 h-6 z-10 border border-black rounded bg-red-700"
    v-else-if="kind === 'Attacker'"
  />
</template>

<script setup lang="ts">
import ShieldSvg from "@/components/svg/Shield.vue";
import SwordsSvg from "@/components/svg/Swords.vue";
import type { PlayerKind } from "./types";
const { kind } = defineProps<{ kind: PlayerKind }>();
</script>
