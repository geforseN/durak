<template>
  <with-app-drawer>
    <div class="flex min-h-screen flex-col bg-base-100">
      <top-nav :class="isGamePage && 'bg-purple-400'" />
      <router-view />
      <notification-queue />
    </div>
    <create-game-lobby-modal
      v-show="createGameLobbyModal_.mustShow.value"
      ref="createLobbyModalRef"
      @create-lobby="(settings) => lobbiesStore.ws.emits.createLobby(settings)"
    />
  </with-app-drawer>
</template>
<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import { useLobbiesStore } from "@/stores";
import TopNav from "@/components/top-nav/top-nav.vue";
import NotificationQueue from "@/components/notification-queue.vue";
import WithAppDrawer from "$/app-drawer/components/with-app-drawer.vue";
import CreateGameLobbyModal from "$/create-lobby/modal/create-game-lobby-modal.vue";
import useCreateGameLobbyModal from "$/create-lobby/modal/useCreateGameLobbyModal";
import { provideCreateGameLobbyModal } from "$/create-lobby/modal/create-game-lobby-modal-provide-inject";

const lobbiesStore = useLobbiesStore();

const createGameLobbyModal_ = useCreateGameLobbyModal(
  useTemplateRef("createLobbyModalRef"),
);

provideCreateGameLobbyModal(createGameLobbyModal_);

const router = useRouter();
const uuidRegExp =
  /^\/game\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const isGamePage = computed(() =>
  router.currentRoute.value.path.match(uuidRegExp),
);
</script>
