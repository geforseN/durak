<template>
  <div class="indicator avatar">
    <div
      class="relative h-10 w-10 rounded-xl border border-neutral-800 min-[400px]:h-16 min-[400px]:w-16 sm:h-20 sm:w-20"
    >
      <img
        :src="props.info.photoUrl"
        :alt="`${props.info.nickname} profile picture`"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserInfo } from "@/module/card-game/types";

const props = defineProps<{
  info: UserInfo;
}>();
</script>
