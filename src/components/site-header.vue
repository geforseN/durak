<template>
  <header>
    <nav>
      <ul class="navbar bg-neutral-700">
        <list-item-link to="/">
          <home />
          Главная
        </list-item-link>
        <li class="ml-auto"></li>
        <list-item-link
          v-if="userStore.user.isCreatingLobby"
          :to="`/game/${userStore.user.isCreatingLobby}`"
          >Ваша игра</list-item-link
        >
        <button
          v-if="userStore.user.isCreatingLobby && userStore.user.currentLobbyId"
          class="btn-ghost btn gap-2 text-xl text-secondary"
          @click="gameLobbiesStore.removeLobby"
        >
          <x-mark class="h-6 w-6" />
          Выйти из лобби
        </button>
        <button
          v-if="!userStore.user.isCreatingLobby"
          class="btn-ghost btn gap-2 bg-success/40 text-xl text-secondary transition-colors hover:bg-success/60"
          @click="userStore.user.isCreatingLobby = true"
          ref="focused"
          autofocus
        >
          <plus-svg />
          Создать игру
        </button>

        <teleport to="#app" v-if="userStore.user.isCreatingLobby">
          <dialog
            class="absolute left-0 top-1/2 flex h-full w-full -translate-y-1/2 items-center justify-center bg-black/40"
          >
            <lobby-creation-popup
              method="dialog"
              ref="lobbyCreationModal"
              @close="
                () => {
                  userStore.user.isCreatingLobby = false;
                  focused?.focus();
                }
              "
            />
          </dialog>
        </teleport>
        <li class="mr-2"></li>
        <site-header-login-data />
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import ListItemLink from "@/components/list-item-link.vue";
import Home from "@/components/svg/Home.vue";
import { useGameLobbiesStore } from "@/composable/useGameLobbiesStore";
import LobbyCreationPopup from "@/module/create-lobby/lobby-creation-popup.vue";
import { useUserStore } from "@/stores/user.store";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";
import SiteHeaderLoginData from "./site-header-login-data.vue";
import PlusSvg from "./svg/Plus.svg.vue";
import XMark from "./svg/XMark.vue";

// TODO rework
// add button if user has startedGame
// fix button

const gameLobbiesStore = useGameLobbiesStore();
const userStore = useUserStore();
const lobbyCreationModal = ref<HTMLFormElement>();
const focused = ref<HTMLButtonElement>();

onClickOutside(
  lobbyCreationModal,
  () => (userStore.user.isCreatingLobby = false),
);
</script>
