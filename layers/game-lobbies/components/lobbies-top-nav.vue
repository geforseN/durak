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
      <icons-xmark class="h-6 w-6" />
      Leave Lobby
    </button>
  </div>
  <template v-else>
    <button
      class="btn btn-primary text-xl transition-colors"
      @click="lobbyCreationModalRef?.modalRef?.show()"
    >
      <icons-plus />
      Create Game
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
import IconsXmark from "@/components/svg/XMark.vue";
import IconsPlus from "@/components/svg/Plus.vue";
import LobbyCreationModal from "$/create-lobby/lobby-creation-modal.vue";
import { useLobbiesStore, useUserStore } from "@/stores";

const lobbyCreationModalRef = useTemplateRef("lobbyCreationModal");

const userStore = useUserStore();
const lobbiesStore = useLobbiesStore();
</script>
