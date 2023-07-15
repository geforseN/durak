<template>
  <header>
    <nav>
      <ul class="navbar bg-neutral-700">
        <list-item-link to="/">
          <home />
          Главная
        </list-item-link>
        <li class="ml-auto"></li>
        <list-item-link v-if="currentGameId" :to="`/game/${currentGameId}`">Ваша игра</list-item-link>
        <template v-else>
          <button
            v-if="gameLobbiesStore.currentLobbyId"
            class="btn-ghost btn gap-2 text-xl text-secondary"
            @click="gameLobbiesStore.leaveLobby"
          >
            <x-mark class="h-6 w-6" />
            Выйти из лобби
          </button>
          <button
            v-else
            class="btn-ghost btn gap-2 bg-success/40 text-xl text-secondary transition-colors hover:bg-success/60"
            @click="gameLobbiesStore.isCreatingLobby = true"
            ref="focused"
            autofocus
          >
            <plus-svg />
            Создать игру
          </button>
          <teleport to="#app" v-if="gameLobbiesStore.isCreatingLobby">
            <dialog
              class="absolute left-0 top-1/2 flex h-full w-full -translate-y-1/2 items-center justify-center bg-black/40"
            >
              <lobby-creation-popup
                method="dialog"
                ref="lobbyCreationModal"
                @close="
                    () => {
                      gameLobbiesStore.isCreatingLobby = false;
                      focused?.focus();
                    }
                  "
              />
            </dialog>
          </teleport>
        </template>
        <li class="mr-2"></li>
        <site-header-login-data v-bind="user" />
      </ul>
    </nav>
  </header>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { onClickOutside } from "@vueuse/core";
import { useUserStore } from "@/stores/user.store";
import Home from "@/components/svg/Home.vue";
import LobbyCreationPopup from "@/module/create-lobby/lobby-creation-popup.vue";
import PlusSvg from "./svg/Plus.svg.vue";
import XMark from "./svg/XMark.vue";
import { useGameLobbiesStore } from "@/composable/useGameLobbiesStore";
import SiteHeaderLoginData from "./site-header-login-data.vue";
import ListItemLink from "@/components/list-item-link.vue";

const gameLobbiesStore = useGameLobbiesStore();
const userStore = useUserStore();
const { currentGameId, user } =
  storeToRefs(userStore);
const lobbyCreationModal = ref<HTMLFormElement>();
const focused = ref<HTMLButtonElement>();

onClickOutside(
  lobbyCreationModal,
  () => (gameLobbiesStore.isCreatingLobby = false),
);
</script>
