<template>
  <div
    class="grid grid-cols-[minmax(250px,330px)] items-start justify-center min-[400px]:grid-cols-2 sm:grid-cols-1"
  >
    <div
      v-for="lobby of gameLobbiesStore.lobbies"
      :key="lobby.id"
      class="m-2 flex flex-col gap-2 rounded-lg border-4 p-1 shadow-xl sm:m-2 sm:w-[572px] md:w-[704px] lg:w-[836px]"
      :class="
        userStore.user.currentLobbyId === lobby.id
          ? '-order-1 border-secondary-focus bg-primary'
          : 'border-primary bg-secondary-focus '
      "
    >
      <game-lobby-top-element :lobby="lobby" />
      <game-lobby-slots :lobby="lobby" />
    </div>
  </div>
</template>
<script setup lang="ts">
import GameLobbyTopElement from "@/module/game-lobbies/game-lobby-top-element.vue";
import GameLobbySlots from "@/module/game-lobbies/game-lobby-slots.vue";
import { useUserStore } from "@/stores/user.store";
import { useGameLobbiesStore } from "@/stores/useGameLobbiesStore";

const userStore = useUserStore();
const gameLobbiesStore = useGameLobbiesStore();
</script>
