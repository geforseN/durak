<template>
  <div class="w-full flex flex-col items-center gap-6">
    <global-chat class="w-[40rem] h-[20rem]" />
    <button v-if="!isCreatingLobby" class="mx-auto self-end min-w-[20rem] font-bold w-max bg-blue-600 px-4 py-4"
            @click="isCreatingLobby = true">
      Создать комнату
    </button>
    <button v-if="isCreatingLobby" class="mx-auto self-end min-w-[20rem] font-bold w-max bg-red-600 px-4 py-4"
            @click="isCreatingLobby = false">
      Выйти из создания комнаты
    </button>
    <initiate-lobby-creation v-show="isCreatingLobby" />
    <game-lobbies class="w-[40rem]" />
  </div>
</template>

<script setup lang="ts">
import GameLobbies from "@/module/game-lobbies/game-lobbies.vue";
import GlobalChat from "@/module/global-chat/global-chat.vue";
import InitiateLobbyCreation from "@/components/initiate-lobby-creation.vue";
import { ref } from "vue";

const isCreatingLobby = ref(false);

</script>
