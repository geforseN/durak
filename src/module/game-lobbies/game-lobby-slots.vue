<template>
  <div class="flex flex-col sm:flex-row  justify-center gap-2">
    <template v-for="(user, index) of lobbyUsers">
      <game-lobby-user
        v-if="user"
        :user="user"
        :index="index + 1"
        :is-admin="user.accname === lobby.adminAccname"
        class="sm:w-[86px] sm:h-[137px] md:h-[172px] md:w-[108px] lg:h-[207px] lg:w-[130px]
        flex justify-between items-center gap-2
        sm:grid h-10 sm:h-auto sm:grid-cols-[min-content_1fr] sm:grid-rows-[min-content_min-content_1fr]" />
      <button
        v-else
        class="sm:w-[86px] sm:h-[137px] md:h-[172px] md:w-[108px] lg:h-[207px] lg:w-[130px]
         flex justify-center items-center
         p-0 vertical-squares-pattern hover:scale-[1.01] hover:border-primary hover:bg-success border-4 border-primary rounded-lg">
        <span
          class="text-xs md:text-base lg:text-lg font-bold bg-white w-3/4 border-2 border-primary rounded text-black py-2 px-1">
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

const { lobby } = defineProps<{ lobby: Lobby }>();

const lobbyUsers = computed(() => {
  const length = lobby.settings.maxUserCount;
  return [...Array(length)].map((_, i) => lobby.users[i]);
});
</script>
<style scoped>
.vertical-squares-pattern {
  background-color: #c2a813;
  background-image: repeating-linear-gradient(
    45deg,
    transparent, transparent 5px,
    #fff 5px, #fff 6px
  ),
  repeating-linear-gradient(
    -45deg,
    transparent, transparent 5px,
    #fff 5px, #fff 6px
  );
}
</style>

