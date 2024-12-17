<template>
  <main
    class="min-h-[90vh] flex flex-col justify-evenly items-center bg-secondary dark:bg-secondary-content gap-y-2"
  >
    <game-field />
    <self-interface />
  </main>
</template>
<script setup lang="ts">
import GameField from "$/card-game/components/game/GameField.vue";
import SelfInterface from "$/card-game/SelfInterface.vue";
</script>
