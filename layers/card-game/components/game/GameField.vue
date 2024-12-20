<template>
  <div
    class="flex h-full w-full max-w-5xl items-center justify-around self-center rounded border-2 border-neutral-900 bg-neutral p-2 max-lg:rounded-t-none"
  >
    <enemy-profile
      v-for="enemy of top"
      :key="enemy.id"
      :enemy="enemy"
    />
  </div>
  <div
    class="flex w-full justify-evenly gap-x-0 xxs:gap-x-2 xs:gap-x-4 xs:px-2"
  >
    <div class="flex flex-col justify-evenly gap-y-4">
      <enemy-profile
        v-for="enemy of left"
        :key="enemy.id"
        :enemy="enemy"
      />
    </div>
    <div class="flex flex-col justify-evenly gap-y-4">
      <enemy-profile
        v-for="enemy of right"
        :key="enemy.id"
        :enemy="enemy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import EnemyProfile from "$/card-game/components/enemy/EnemyProfile.vue";
import type { Enemy } from "@durak-game/durak-dts";

defineProps<{
  top: Enemy[]
  left: Enemy[]
  right: Enemy[]
}>()
</script>
