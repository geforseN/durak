<template>
  <nav
    class="navbar sticky top-0 z-10 flex max-h-16 items-end border-b border-b-neutral bg-primary/50"
  >
    <ul class="contents">
      <list-item-link to="/">
        <icons-home />
      </list-item-link>
      <li class="ml-auto" />
      <list-item-link
        v-if="userStore.user.state.currentGameId"
        :to="`/game/${userStore.user.state.currentGameId}`"
      >
        Ваша игра
      </list-item-link>
      <li v-else-if="userStore.user.state.currentLobbyId" class="contents">
        <button
          class="btn btn-ghost gap-2 text-xl text-secondary"
          @click="
            lobbiesStore.ws.emits.leaveLobby(
              userStore.user.state.currentLobbyId,
            )
          "
        >
          <icons-xmark class="h-6 w-6" />
          Покинуть лобби
        </button>
      </li>
      <template v-else>
        <button
          class="btn btn-primary text-xl transition-colors"
          @click="lobbyCreationModal?.modalRef?.show()"
        >
          <icons-plus />
          Создать игру
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
      <li class="mr-2" />
      <user-avatar />
    </ul>
  </nav>
</template>
<script setup lang="ts">
import { ref } from "vue";

import ListItemLink from "@/components/top-nav/list-item-link.vue";
import UserAvatar from "@/components/top-nav/user-avatar.vue";

import IconsHome from "@/components/svg/Home.vue";
import IconsXmark from "@/components/svg/XMark.vue";
import IconsPlus from "@/components/svg/Plus.vue";

import { useUserStore, useLobbiesStore } from "@/stores";
import LobbyCreationModal from "@/module/create-lobby/lobby-creation-modal.vue";

const lobbyCreationModal = ref<InstanceType<typeof LobbyCreationModal>>();

const lobbiesStore = useLobbiesStore();
const userStore = useUserStore();
</script>
