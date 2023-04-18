<template>
  <div class="flex-1 w-full flex flex-col items-center min-h-screen gap-6 bg-secondary
  sm:bg-yellow-500 md:bg-green-500 lg:bg-red-500 xl:bg-purple-500 2xl:bg-amber-500">
<!--    <global-chat class="w-[40rem] h-[20rem] m-4" />-->
    <create-lobby />
    <game-lobbies />
  </div>
</template>

<script setup lang="ts">
import GameLobbies from "@/module/game-lobbies/game-lobbies.vue";
import GlobalChat from "@/module/global-chat/global-chat.vue";
import CreateLobby from "@/module/create-lobby/create-lobby.vue";
</script>
