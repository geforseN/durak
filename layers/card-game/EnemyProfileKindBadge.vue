<template>
  <div class="flex gap-x-0.5">
    <shield-svg
      class="w-6 h-6 border border-black rounded bg-blue-700"
      v-if="kind.includes('Defender')"
    />
    <swords-svg
      class="w-6 h-6 border border-black rounded bg-red-700"
      v-else-if="kind.includes('Attacker')"
    />
    <div
      class="w-6 h-6 border border-black rounded bg-green-700 flex justify-center items-center"
      v-if="kind.includes('Allowed')"
    >
      <clock-svg v-if="hasTimer" class="w-6 h-6" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ShieldSvg from "@/components/svg/Shield.vue";
import SwordsSvg from "@/components/svg/Swords.vue";
import ClockSvg from "@/components/svg/Clock.vue";
import type { PlayerKind } from "./types";

const { kind, hasTimer } = defineProps<{
  kind: PlayerKind;
  hasTimer: boolean;
}>();
</script>
