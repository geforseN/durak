<template>
  <shield-svg class="w-6 h-6 z-10 border border-black rounded bg-blue-700" v-if="props.role === 'Defender'" />
  <swords-svg class="w-6 h-6 z-10 border border-black rounded bg-red-700" v-else-if="props.role === 'Attacker'" />
</template>

<script setup lang="ts">
import type { PlayerRole } from "./types";
import ShieldSvg from "@/components/svg/Shield.vue";
import SwordsSvg from "@/components/svg/Swords.vue";
const props = defineProps<{ role: PlayerRole }>();
</script>
