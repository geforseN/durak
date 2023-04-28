<template>
  <div
    class="grid grid-cols-[minmax(250px,330px)] min-[400px]:grid-cols-2 sm:grid-cols-1 justify-center items-start">
    <div v-for="lobby of lobbies" :key="lobby.id"
         class="m-2 sm:m-2 flex flex-col gap-2 p-1 rounded-lg border-primary border-4 bg-secondary">
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
gameLobbies.on("startGame", (gameId: string) => {
  const path = `/game/${gameId}`;
  router.replace({ path })
    .then(() => console.log(`Successfully navigate to ${path}`))
    .catch(console.error);
});
</script>
