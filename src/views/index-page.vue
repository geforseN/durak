<template>
  <div class="flex-1 w-full flex flex-col items-center min-h-screen gap-6 bg-gray-700">
    <global-chat class="w-[40rem] h-[20rem]" />
    <create-lobby />
    <game-lobbies class="w-[40rem]" />
  </div>
</template>

<script setup lang="ts">
import GameLobbies from "@/module/game-lobbies/game-lobbies.vue";
import GlobalChat from "@/module/global-chat/global-chat.vue";
import CreateLobby from "@/module/create-lobby/create-lobby.vue";
</script>
