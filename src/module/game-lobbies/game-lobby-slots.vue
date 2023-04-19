<template>
  <div class="flex flex-col sm:flex-row justify-center gap-2">
    <template v-for="(user, index) of lobbyUsers" :key="user?.accname">
      <game-lobby-user
        v-if="user"
        :user="user"
        :index="index + 1"
        :is-admin="user.accname === lobby.adminAccname"
        class="sm:w-[86px] sm:h-[137px] md:h-[172px] md:w-[108px] lg:h-[207px] lg:w-[130px]" />
      <button
        v-else
        class="sm:w-[86px] sm:h-[137px] md:h-[172px] md:w-[108px] lg:h-[207px] lg:w-[130px]
        flex justify-center items-center
        p-0 vertical-squares-pattern hover:scale-[1.01] hover:border-primary hover:bg-success border-4 border-primary rounded-lg"
        @click="joinLobby(index)">
      <span
        class="text-xs md:text-base lg:text-lg font-bold bg-white w-3/4
         sm:border-2 sm:border-primary rounded text-black py-2 px-1">
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
import { gameLobbies } from "@/socket";

const { lobby } = defineProps<{ lobby: Lobby }>();

const lobbyUsers = computed(() => {
  const length = lobby.settings.maxUserCount;
  return [...Array(length)].map((_, i) => lobby.users[i]);
});

const joinLobby = (cellIndex: number = -1) => {
  gameLobbies.emit("joinLobby", lobby.id, cellIndex);
};
</script>
<style scoped>
.vertical-squares-pattern {
  --first: #c2a813;
  --second: #ffffff;
  background-color: var(--first);
  background-image: repeating-linear-gradient(
    45deg,
    transparent, transparent 5px,
    var(--second) 5px, var(--second) 6px
  ),
  repeating-linear-gradient(
    -45deg,
    transparent, transparent 5px,
    var(--second) 5px, var(--second) 6px
  );
}
</style>

