<template>
  <div
    class="flex w-full flex-1 flex-col items-center gap-6 p-1 sm:p-2"
  >
    <global-chat class="h-[20rem] w-full max-w-md sm:max-w-xl" />
    <game-lobbies class="w-full sm:w-auto" />
  </div>
</template>

<script setup lang="ts">
import GameLobbies from "$/game-lobbies/game-lobbies.vue";
import GlobalChat from "$/global-chat/global-chat.vue";
</script>
<style>
html,
body {
  scrollbar-gutter: stable;
}
</style>
