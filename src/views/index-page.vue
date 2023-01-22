<template>
  <div class="w-full flex flex-col items-center gap-6">
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
