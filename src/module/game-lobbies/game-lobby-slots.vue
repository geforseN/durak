<template>
  <div class="flex flex-col justify-center gap-2 sm:flex-row">
    <template v-for="(slot, index) of lobby.slots" :key="slot?.id">
      <game-lobby-user
        v-if="slot"
        :user="slot"
        :index="index + 1"
        class="sm:h-[137px] sm:w-[86px] md:h-[172px] md:w-[108px] lg:h-[207px] lg:w-[130px]"
      />
      <button
        v-else
        class="card-bg flex items-center justify-center rounded-lg border-4 border-primary p-0 hover:scale-[1.01] hover:border-primary hover:bg-success sm:h-[137px] sm:w-[86px] md:h-[172px] md:w-[108px] lg:h-[207px] lg:w-[130px]"
        @click="emit('join-lobby', index)"
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
import GameLobbyUser from "./game-lobby-user.vue";
import type { ILobby } from "./entity";

const { lobby } = defineProps<{ lobby: ILobby }>();
const emit = defineEmits<{ "join-lobby": [number] }>();
</script>
