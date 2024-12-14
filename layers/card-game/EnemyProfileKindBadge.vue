<template>
  <div class="flex gap-x-0.5">
    <shield-svg
      v-if="kind.includes('Defender')"
      class="w-6 h-6 border border-black rounded bg-blue-700"
    />
    <swords-svg
      v-else-if="kind.includes('Attacker')"
      class="w-6 h-6 border border-black rounded bg-red-700"
    />
    <div
      v-if="kind.includes('Allowed')"
      class="w-6 h-6 border border-black rounded bg-green-700 flex justify-center items-center"
    >
      <clock-svg
        v-if="hasTimer"
        class="w-6 h-6"
      />
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
