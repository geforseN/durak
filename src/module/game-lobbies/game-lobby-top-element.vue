<template>
  <div class="flex justify-between">
    <span class="flex items-center px-2 bg-purple-400 rounded-xl">
      {{ gameTypesDictionary[lobby.settings.gameType] }}
    </span>
    <button
      v-if="lobby.adminAccname === userStore.accname"
      class="bg-green-600 focus:bg-green-500 border-2 border-black px-2 py-[1px] justify-self-center"
      @click="createGame(lobby.id)"
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
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import gameTypesDictionary from "../../utils/dictionary/game-types.dictionary";
import { gameLobbies } from "@/socket";
import type { Lobby } from "@/module/game-lobbies/types";

const userStore = useUserStore();

const { lobby } = defineProps<{ lobby: Lobby }>();

const joinLobby = (lobbyId: string, cellIndex: number = -1) => {
  gameLobbies.emit("joinLobby", lobbyId, cellIndex);
};

const createGame = (lobbyId: string) => {
  gameLobbies.emit("createGame", userStore.accname, lobbyId);
};
</script>