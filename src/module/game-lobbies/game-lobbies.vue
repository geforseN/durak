<template>
  <div>
    <div
      class="flex flex-col gap-y-1 p-1 m-3 border-2 border-orange-500 bg-purple-100"
      v-for="lobby of lobbies"
      :key="lobby.id"
    >
      <div class="flex justify-between">
        <span class="flex items-center px-2 bg-purple-400 rounded-xl">
          {{ gameTypesDictionary[lobby.settings.gameType] }}
        </span>
        <button
          v-if="lobby.adminAccName === userStore.accName"
          class="bg-green-600 focus:bg-green-500 border-2 border-black px-2 py-[1px] justify-self-center"
          @click="startGame(lobby.id)"
        >
          Начать игру
        </button>
        <button
          class="bg-blue-600 focus:bg-blue-500 border-2 border-black px-2 py-[1px]"
          @click="joinLobby(lobby.id)"
        >
          Присоединиться
        </button>
      </div>
      <div class="flex border-r-4 border-black">
        <template v-for="userIndex of lobby.settings.maxUserCount">
          <div
            v-if="lobby.users[userIndex - 1]"
            class="grid grid-rows-[1fr_fit-content] flex-1 border-r-0 border-4 justify-center border-black bg-purple-200 relative"
          >
            <img
              :src="lobby.users[userIndex - 1].photoUrl"
              :alt="`${lobby.users[userIndex - 1].nickname} profile picture`"
              class="max-h-28 max-w-[28rem] block"
            />
            <router-link
              class="underline text-lg font-bold font-mono absolute bottom-0 left-[50%] translate-x-[-50%] "
              :class="lobby.users[userIndex - 1].accName === lobby.adminAccName ? 'bg-yellow-300' : 'bg-white'"
              :to="`/profile/${lobby.users[userIndex - 1].urlToProfile}`"
              target="_blank"
            >
              {{ lobby.users[userIndex - 1].nickname }}
            </router-link>
          </div>
          <button
            v-else
            class="bg-purple-300 flex-1 border-r-0 border-4 border-black"
          >
            {{ userIndex }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { gameLobbies } from "@/socket";
import type { User } from "@/module/global-chat/types";
import gameTypesDictionary from "../../utils/game-types-dictionary";
import type { Lobby } from "@/module/game-lobbies/types";
import { useUserStore } from "@/stores/user.store";

const lobbies = ref<Lobby[]>([]);

const userStore = useUserStore();

const joinLobby = (lobbyId: string, cellIndex: number = -1) => {
  gameLobbies.emit("joinLobby", lobbyId, cellIndex);
};

const startGame = (lobbyId: string) => {
  gameLobbies.emit("startGame", lobbyId);
};

function lobbyMatcher(this: { lobbyId: string }, lobby: Lobby) {
  return lobby.id === this.lobbyId;
}

function userMatcher(this: { accName: string }, user: User) {
  return user.accName === this.accName;
}

gameLobbies.on("restoreLobbies", (lobbiesToRestore: Lobby[]) => {
  lobbies.value = lobbiesToRestore;
});

gameLobbies.on("lobbyCreated", (lobby: Lobby) => {
  console.log("lobby", lobby.id);
  lobbies.value.push(lobby);
});

gameLobbies.on("addedUser", (user: User, lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  lobbies.value[lobbyIndex].users.push(user);
});

gameLobbies.on("updateLobbyAdmin", (adminAccName: string, lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  lobbies.value[lobbyIndex].adminAccName = adminAccName;
});

gameLobbies.on("deleteLobby", (lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  lobbies.value.splice(lobbyIndex, 1);
});

gameLobbies.on("removePlayer", (accName: string, lobbyId: string) => {
  const lobbyIndex = lobbies.value.findIndex(lobbyMatcher, { lobbyId });
  const userIndexToRemove = lobbies.value[lobbyIndex].users.findIndex(
    userMatcher,
    { accName },
  );
  lobbies.value[lobbyIndex].users.splice(userIndexToRemove, 1);
});

gameLobbies.on("startGame", (gameUrl: string) => {
  console.log("Not Implemented", gameUrl);
});

</script>
