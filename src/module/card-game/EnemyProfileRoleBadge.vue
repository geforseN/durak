<template>
  <shield-svg v-if="role === 'Defender'" />
  <swords-svg v-else-if="role === 'Attacker'" />
</template>

<script setup lang="ts">
import type { Enemy } from "@/module/card-game/types";
import ShieldSvg from "@/components/svg/Shield.vue";
import SwordsSvg from "@/components/svg/Swords.vue";

const { enemy } = defineProps<{ enemy: Enemy }>();
const { role } = enemy;
</script>
