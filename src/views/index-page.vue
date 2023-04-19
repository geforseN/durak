<template>
  <div class="p-1 sm:p-2 w-full flex-1 flex flex-col items-center gap-6 bg-secondary">
    <global-chat class="w-full max-w-md sm:max-w-xl h-[20rem]" />
    <create-lobby class="w-full max-w-md sm:max-w-xl" />
    <game-lobbies class="w-full sm:w-auto" />
  </div>
</template>

<script setup lang="ts">
import GameLobbies from "@/module/game-lobbies/game-lobbies.vue";
import GlobalChat from "@/module/global-chat/global-chat.vue";
import CreateLobby from "@/module/create-lobby/create-lobby.vue";
</script>
