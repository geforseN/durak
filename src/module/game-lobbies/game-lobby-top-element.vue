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
      v-if="
        // TODO has Lobby#hasUserWithId OR PERHAPS userStore.lobby === lobby
        lobby.slots.some((slot) => slot?.id === userStore.user.id)
      "
      class="btn-sm btn border-2 border-black bg-error text-black hover:bg-error/75"
      @click="gameLobbiesStore.leaveLobby(lobby.id)"
    >
      Покинуть лобби
    </button>
    <button
      v-if="
        userStore.user.id === lobby.slots.find((slot) => slot?.isAdmin)?.id &&
        // line below ensure then slots all filled
        // TODO add Lobby#isFilled
        lobby.settings.userCount === lobby.slots.filter((slot) => slot).length
      "
      class="btn-sm btn border-2 border-black bg-info text-black hover:bg-info hover:saturate-[1.3]"
      @click="gameLobbiesStore.createGame(lobby.id)"
    >
      Начать игру
    </button>
    <button
      v-if="lobby.slots.every((slot) => slot?.id !== userStore.user.id)"
      class="btn-sm btn border-2 border-black bg-success text-black hover:bg-success hover:saturate-[1.3]"
      @click="gameLobbiesStore.joinLobby(lobby.id)"
    >
      Присоединиться
    </button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user.store";
import gameTypesDictionary from "../../utils/dictionary/game-types.dictionary";
import type { Lobby } from "@/module/game-lobbies/types";
import { useGameLobbiesStore } from "@/stores/useGameLobbiesStore";

const { lobby } = defineProps<{ lobby: Lobby }>();

const userStore = useUserStore();
const gameLobbiesStore = useGameLobbiesStore();
</script>
