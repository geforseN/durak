<template>
  <div class="flex flex-col justify-between gap-1 sm:flex-row">
    <div class="flex items-center gap-2 sm:flex-1">
      <span class="badge badge-lg border-black bg-neutral-700">
        {{ gameTypesDictionary[lobby.settings.gameType] }}
      </span>
      <span class="badge badge-lg border-black bg-neutral-700">
        {{ lobby.settings.cardCount }}
      </span>
    </div>
    <button
      v-if="lobby.users.some((user) => user.accname === userStore.accname)"
      class="btn-sm btn border-2 border-black bg-error text-black hover:bg-error/75"
      @click="leaveLobby()"
    >
      Покинуть лобби
    </button>
    <button
      v-if="lobby.adminAccname === userStore.accname && lobby.settings.maxUserCount === lobby.users.length"
      class="btn-sm btn border-2 border-black bg-info text-black hover:bg-info hover:saturate-[1.3]"
      @click="createGame(lobby.id)"
    >
      Начать игру
    </button>
    <button
      v-if="lobby.users.every(({ accname }) => accname !== userStore.accname)"
      class="btn-sm btn border-2 border-black bg-success text-black hover:bg-success hover:saturate-[1.3]"
      @click="joinLobby(lobby.id)"
    >
      Присоединиться
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import gameTypesDictionary from "../../utils/dictionary/game-types.dictionary";
import type { Lobby } from "@/module/game-lobbies/types";
import { useGameLobbiesStore } from "@/composable/useGameLobbiesStore";

const userStore = useUserStore();

const { lobby } = defineProps<{ lobby: Lobby }>();
const { joinLobby, leaveLobby, createGame } = useGameLobbiesStore();
</script>
