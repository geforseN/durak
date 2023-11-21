<template>
  <div class="flex flex-col justify-between gap-1 sm:flex-row">
    <div class="flex items-center gap-2 sm:flex-1">
      <span class="badge badge-lg border-black bg-neutral-700">
        {{ gameTypesDictionary[lobby.settings.type] }}
      </span>
      <span class="badge badge-lg border-black bg-neutral-700">
        {{ lobby.settings.players.count }}
      </span>
    </div>
    <button
      v-if="
        userStore.user.state.id &&
        lobby.hasUserWithId(userStore.user.state.id)
      "
      class="btn btn-sm border-2 border-black bg-error text-black hover:bg-error/75"
      @click="gameLobbiesStore.leaveLobby(lobby.id)"
    >
      Покинуть лобби
    </button>
    <button
      v-if="
        userStore.user.state.id &&
        lobby.hasAdminWithId(userStore.user.state.id) &&
        lobby.isFull
      "
      class="btn btn-sm border-2 border-black bg-info text-black hover:bg-info hover:saturate-[1.3]"
      @click="gameLobbiesStore.createGame(lobby.id)"
    >
      Начать игру
    </button>
    <button
      v-if="
        userStore.user.state.id &&
        !lobby.hasUserWithId(userStore.user.state.id)
      "
      class="btn btn-sm border-2 border-black bg-success text-black hover:bg-success hover:saturate-[1.3]"
      @click="gameLobbiesStore.joinLobby(lobby.id)"
    >
      Присоединиться
    </button>
  </div>
</template>

<script setup lang="ts">
import gameTypesDictionary from "@/utils/dictionary/game-types.dictionary";

import { useUserStore, useGameLobbiesStore } from "@/stores";

import type { ILobby } from "./entity";

const { lobby } = defineProps<{ lobby: ILobby }>();

const userStore = useUserStore();
const gameLobbiesStore = useGameLobbiesStore();
</script>
