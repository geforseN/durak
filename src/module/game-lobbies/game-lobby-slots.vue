<template>
  <div class="flex flex-col justify-center gap-2 sm:flex-row">
    <template v-for="(user, index) of lobbyUsers" :key="user?.accname">
      <game-lobby-user
        v-if="user"
        :user="user"
        :index="index + 1"
        :is-admin="user.accname === lobby.adminAccname"
        class="sm:h-[137px] sm:w-[86px] md:h-[172px] md:w-[108px] lg:h-[207px] lg:w-[130px]"
      />
      <button
        v-else
        class="card-bg flex items-center justify-center rounded-lg border-4 border-primary p-0 hover:scale-[1.01] hover:border-primary hover:bg-success sm:h-[137px] sm:w-[86px] md:h-[172px] md:w-[108px] lg:h-[207px] lg:w-[130px]"
        @click="joinLobby(lobby.id, index)"
      >
        <span
          class="w-3/4 rounded bg-white px-1 py-2 text-xs font-bold text-black sm:border-2 sm:border-primary md:text-base lg:text-lg"
        >
          Войти в лобби
        </span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Lobby } from "@/module/game-lobbies/types";
import GameLobbyUser from "@/module/game-lobbies/game-lobby-user.vue";
import { useGameLobbiesStore } from "@/composable/useGameLobbiesStore";

const { lobby } = defineProps<{ lobby: Lobby }>();

const lobbyUsers = computed(() => {
  const length = lobby.settings.maxUserCount;
  return [...Array(length)].map((_, i) => lobby.users[i]);
});
const { joinLobby } = useGameLobbiesStore();
</script>
