<template>
  <div>
    <div
      class="flex flex-col gap-y-1 p-1 m-3 border-2 border-orange-500 bg-purple-100"
      v-for="lobby of lobbies"
      :key="lobby.id"
    >
      <game-lobby-top-element :lobby="lobby" />
      <div class="flex border-r-4 border-black">
        <template v-for="userIndex of range(lobby.settings.maxUserCount)">
          <game-lobby-user
            v-if="lobby.users[userIndex]"
            :user="lobby.users[userIndex]"
            :is-admin="lobby.users[userIndex].accname === lobby.adminAccname" />
          <button
            v-else
            class="bg-purple-300 flex-1 border-r-0 border-4 border-black"
          >
            Слот пуст
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
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
