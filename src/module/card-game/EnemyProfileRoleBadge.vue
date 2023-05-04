<template>
  <shield-svg class="z-10 border border-black rounded bg-blue-400" v-if="props.role === 'Defender'" />
  <swords-svg class="z-10 border border-black rounded bg-red-400" v-else-if="props.role === 'Attacker'" />
</template>

<script setup lang="ts">
import type { PlayerRole } from "./types";
import ShieldSvg from "@/components/svg/Shield.vue";
import SwordsSvg from "@/components/svg/Swords.vue";
const props = defineProps<{ role: PlayerRole }>();
</script>
