<template>
  <div class="flex flex-wrap sm:flex-nowrap sm:flex-col">
    <div v-for="lobby of lobbies" :key="lobby.id"
         class="sm:max-w-none max-w-[260px] min-w-[200px] my-3 ml-3 mr-auto sm:mx-3
           flex flex-grow flex-col gap-2 p-1 rounded-lg border-primary border-4 bg-secondary">
      <game-lobby-top-element :lobby="lobby" />
      <game-lobby-slots :lobby="lobby" />
    </div>
  </div>
</template>
<script setup lang="ts">
import GameLobbyTopElement from "@/module/game-lobbies/game-lobby-top-element.vue";
import GameLobbySlots from "@/module/game-lobbies/game-lobby-slots.vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { gameLobbies } from "@/socket";
import { useLobbiesStore } from "@/stores/lobbies.store";

const lobbiesStore = useLobbiesStore();
const { lobbies } = storeToRefs(lobbiesStore);
const router = useRouter();

gameLobbies.on("restoreLobbies", lobbiesStore.restoreLobbies);
gameLobbies.on("lobbyCreated", lobbiesStore.addLobby);
gameLobbies.on("addedUser", lobbiesStore.addUserInLobby);
gameLobbies.on("removeUser", lobbiesStore.removeUser);
gameLobbies.on("updateLobbyAdmin", lobbiesStore.updateLobbyAdmin);
gameLobbies.on("deleteLobby", lobbiesStore.deleteLobby);
gameLobbies.on("startGame", async (gameUrl: string) => {
  await router.push(`/game/${gameUrl}`);
});
</script>
