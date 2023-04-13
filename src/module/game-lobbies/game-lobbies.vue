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
import { ref } from "vue";
import { useRouter } from "vue-router";
import GameLobbyUser from "@/module/game-lobbies/game-lobby-user.vue";
import GameLobbyTopElement from "@/module/game-lobbies/game-lobby-top-element.vue";
import { gameLobbies } from "@/socket";
import { lobbyMatcher, userMatcher } from "@/utils/matchers";

const lobbies = ref<any>([]);
const router = useRouter();
const range = (len: number) => {
  return [...new Array(len)].map((_, i) => i) as number[]
}
gameLobbies.on("restoreLobbies", (lobbiesToRestore) => {
  lobbies.value = lobbiesToRestore;
});

gameLobbies.on("startGame", (gameUrl: string) => {
  router.push(`/game/${gameUrl}`);
});

gameLobbies.on("lobbyCreated", (lobby) => {
  lobbies.value.push(lobby);
});

gameLobbies.on("addedUser", (user, lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  lobbies.value[lobbyIndex].users.push(user);
});

gameLobbies.on("removeUser", (accname: string, lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  const userIndexToRemove = lobbies.value[lobbyIndex].users.findIndex(
    userMatcher, { accname },
  );
  lobbies.value[lobbyIndex].users.splice(userIndexToRemove, 1);
});

gameLobbies.on("updateLobbyAdmin", (adminAccname: string, lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  lobbies.value[lobbyIndex].adminAccname = adminAccname;
});

gameLobbies.on("deleteLobby", (lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  lobbies.value.splice(lobbyIndex, 1);
});
</script>
