<template>
  <router-link
    v-if="userStore.user.state?.currentGameId"
    :to="`/game/${userStore.user.state.currentGameId}`"
  >
    Your Game
  </router-link>
  <div
    v-else-if="userStore.user.state?.currentLobbyId"
    class="contents"
  >
    <button
      class="btn btn-ghost gap-2 text-xl text-secondary"
      @click="
        lobbiesStore.ws.emits.leaveLobby(userStore.user.state.currentLobbyId)
      "
    >
      <i-material-symbols-light-close />
      Leave Lobby
    </button>
  </div>
  <template v-else>
    <create-game-lobby-button @click="createGameLobbyModal.show()" />
  </template>
</template>
<!-- FIXME: i18n -->
<!-- FIXME: refactor, add responsive -->
<script lang="ts" setup>
import { useLobbiesStore, useUserStore } from "@/stores";
import CreateGameLobbyButton from "$/create-lobby/create-game-lobby-button.vue";
import { injectCreateGameLobbyModalOrThrow } from "$/create-lobby/modal/create-game-lobby-modal-provide-inject";

const createGameLobbyModal = injectCreateGameLobbyModalOrThrow();

const userStore = useUserStore();
const lobbiesStore = useLobbiesStore();
</script>
