<template>
  <div
    class="max-w-xs xs:max-w-md lg:max-w-none grid grid-cols-2 lg:grid-cols-[150px_1fr_150px] gap-y-3 place-items-center rounded-xl py-5 p-2 bg-neutral border-neutral-900 border-2"
  >
    <game-discard class="row-start-1 col-start-2 lg:col-start-3" />
    <game-talon class="row-start-1 col-start-1" />
    <game-desk
      class="row-start-2 col-span-full lg:row-start-1 lg:col-start-2 lg:col-span-1"
    />
  </div>
</template>

<script setup lang="ts">
import GameDesk from "@/module/card-game/GameDesk.vue";
import GameTalon from "@/module/card-game/GameTalon.vue";
import GameDiscard from "@/module/card-game/GameDiscard.vue";
</script>
