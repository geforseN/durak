<template>
  <div class="flex flex-col sm:flex-row gap-1 justify-between">
    <div class="flex sm:flex-1 gap-2 items-center">
      <span class="badge badge-lg bg-neutral-700 border-black">
        {{ gameTypesDictionary[props.lobby.settings.gameType] }}
      </span>
      <span class="badge badge-lg bg-neutral-700 border-black">
        {{ props.lobby.settings.cardCount }}
      </span>
    </div>
    <button
      v-if="props.lobby.adminAccname === userStore.accname"
      class="btn btn-sm text-black bg-info hover:bg-info hover:saturate-[1.3] border-2 border-black"
      @click="createGame()">
      Начать игру
    </button>
    <button
      v-if="props.lobby.users.every(({ accname }) => accname !== userStore.accname)"
      class="btn btn-sm text-black bg-success hover:bg-success hover:saturate-[1.3] border-black border-2"
      @click="joinLobby()">
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

const props = defineProps<{ lobby: Lobby }>();

const joinLobby = (cellIndex: number = -1) => {
  gameLobbies.emit("joinLobby", props.lobby.id, cellIndex);
};

const createGame = () => {
  gameLobbies.emit("createGame", userStore.accname, props.lobby.id);
};
</script>
