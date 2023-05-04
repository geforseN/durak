<template>
  <div class="avatar indicator">
    <div class="rounded-xl relative border border-neutral-800
      w-10 h-10  min-[400px]:w-16 min-[400px]:h-16 sm:w-20 sm:h-20">
      <img :src="props.info.photoUrl" :alt="`${props.info.nickname} profile picture`">
    </div>
  </div>
</template>
<script setup lang="ts">
import type { UserInfo } from "@/module/card-game/types";

const props = defineProps<{
  info: UserInfo
}>();
</script>
