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
    <button
      class="btn btn-primary text-xl gap-0.5"
      @click="lobbyCreationModalRef?.modalRef?.show()"
    >
      Create Game
      <i-material-symbols-light-playing-cards-sharp />
    </button>

    <teleport to="#app">
      <lobby-creation-modal
        ref="lobbyCreationModal"
        @create-lobby="
          (settings) => lobbiesStore.ws.emits.createLobby(settings)
        "
      />
    </teleport>
  </template>
</template>
<!-- FIXME: i18n -->
<script lang="ts" setup>
import { useTemplateRef } from "vue";
import LobbyCreationModal from "$/create-lobby/lobby-creation-modal.vue";
import { useLobbiesStore, useUserStore } from "@/stores";

const lobbyCreationModalRef = useTemplateRef("lobbyCreationModal");

const userStore = useUserStore();
const lobbiesStore = useLobbiesStore();
</script>
