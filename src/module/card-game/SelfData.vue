<template>
  <div class="flex flex-col w-full max-w-5xl">
    <self-interface />
    <self-deck />
  </div>
</template>
<script setup lang="ts">
import SelfDeck from "@/module/card-game/SelfDeck.vue";
import SelfInterface from "@/module/card-game/SelfInteface.vue";
</script>
