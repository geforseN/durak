<template>
  <div
    class="grid grid-cols-[minmax(250px,330px)] items-start justify-center min-[400px]:grid-cols-2 sm:grid-cols-1"
  >
    <div
      v-for="lobby of lobbiesStore.state"
      :key="lobby.id"
      class="m-2 flex flex-col gap-2 rounded-lg border-4 p-1 shadow-xl sm:m-2 sm:w-[572px] md:w-[704px] lg:w-[836px]"
      :class="
        userStore.user.state.currentLobbyId === lobby.id
          ? '-order-1 border-secondary-focus bg-primary'
          : 'border-primary bg-secondary-focus '
      "
    >
      <game-lobby-top-element
        :lobby="lobby"
        @join-lobby="lobbiesStore.ws.emits.joinLobby(lobby.id, -1)"
        @leave-lobby="lobbiesStore.ws.emits.leaveLobby(lobby.id)"
        @start-game="lobbiesStore.ws.emits.startGame(lobby.id)"
      />
      <game-lobby-slots
        :lobby="lobby"
        @join-lobby="
          (slotIndex) => lobbiesStore.ws.emits.joinLobby(lobby.id, slotIndex)
        "
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useUserStore, useLobbiesStore } from "@/stores";

import GameLobbyTopElement from "./game-lobby-top-element.vue";
import GameLobbySlots from "./game-lobby-slots.vue";

const userStore = useUserStore();
const lobbiesStore = useLobbiesStore();
</script>
