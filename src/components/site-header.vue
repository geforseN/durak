<template>
  <header class="sticky top-0 z-10">
    <nav class="">
      <ul class="navbar flex border-b border-b-neutral bg-primary/50">
        <list-item-link to="/">
          <home />
        </list-item-link>
        <li class="ml-auto" />
        <list-item-link
          v-if="userStore.user.currentGameId"
          :to="`/game/${userStore.user.currentGameId}`"
        >
          Ваша игра
        </list-item-link>
        <button
          v-if="userStore.user.currentLobbyId"
          class="btn btn-ghost gap-2 text-xl text-secondary"
          @click="gameLobbiesStore.removeLobby"
        >
          <x-mark class="h-6 w-6" />
          Выйти из лобби
        </button>
        <button
          v-if="!userStore.user.currentGameId"
          class="btn btn-primary text-xl transition-colors"
          @click="lobbyCreationModal?.modalRef?.show()"
        >
          <plus-svg />
          Создать игру
        </button>
        <teleport to="#app">
          <lobby-creation-modal ref="lobbyCreationModal" />
        </teleport>
        <li class="mr-2"></li>
        <suspense-user-avatar />
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { ref } from "vue";

import ListItemLink from "@/components/list-item-link.vue";
import Home from "@/components/svg/Home.vue";
import XMark from "./svg/XMark.vue";
import PlusSvg from "./svg/Plus.svg.vue";

import { useGameLobbiesStore } from "@/stores/useGameLobbiesStore";
import { useUserStore } from "@/stores/user.store";
import LobbyCreationModal from "@/module/create-lobby/lobby-creation-modal.vue";
import SuspenseUserAvatar from "./suspense-user-avatar.vue";

const gameLobbiesStore = useGameLobbiesStore();
const userStore = useUserStore();
const lobbyCreationModal = ref<InstanceType<typeof LobbyCreationModal>>();
</script>
