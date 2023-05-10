<template>
  <main class="min-h-[90vh] flex flex-col justify-evenly bg-secondary gap-y-2">
    <div
      class="w-full h-full flex justify-around items-center self-center bg-neutral rounded max-lg:rounded-t-none max-w-5xl p-2 border-2 border-neutral-900">
      <template v-for="(enemy, index) of enemiesStore.topEnemies">
        <component :is="index % 2 ? EnemyProfile.TopRight : EnemyProfile.TopLeft" :enemy="enemy"
          :is-allowed-to-move="enemy.id === gameStateStore.allowedPlayerId" />
      </template>
    </div>
    <div class="w-full flex justify-evenly gap-x-0 xxs:gap-x-2 xs:gap-x-4 xs:px-2">
      <div class="flex flex-col justify-evenly gap-y-4">
        <EnemyProfile.Left v-for="enemy of enemiesStore.leftEnemies" :key="enemy.id" :enemy="enemy"
          :is-allowed-to-move="enemy.id === gameStateStore.allowedPlayerId" />
      </div>
      <div
        class="w-full max-w-xs xs:max-w-md py-5 rounded-xl p-2 flex gap-y-3 flex-col items-center bg-neutral border-neutral-900 border-2">
        <div class="self-end flex w-full justify-around">
          <div :style="{ '--x': 2.7 }" v-if="!gameStateStore.gameState.isDiscardEmpty" class="relative left-3 card-bg border-2 border-black rounded bg-cover bg-indigo-600
              h-[77px] w-[55px] xxs:h-[96px] xxs:w-[69px] md:h-[105px] md:w-[75px] lg:h-[127px] lg:w-[91px]">
          </div>
          <div class="relative">
            <div :style="{ '--x': 2.7 }"
              v-if="!gameStateStore.gameState.isTalonHasOneCard && !gameStateStore.gameState.isTalonEmpty"
              class="relative z-10 card-bg border-2 border-black rounded bg-cover bg-indigo-600 h-[77px] w-[55px] xxs:h-[96px] xxs:w-[69px] md:h-[105px] md:w-[75px] lg:h-[127px] lg:w-[91px]">
            </div>
            <basic-card v-if="gameStateStore.gameState.trumpCard" class="absolute top-0 right-6 rotate-90"
              v-bind="gameStateStore.gameState.trumpCard" />
          </div>
        </div>
        <game-desk :desk-slots="deskStore.deskSlots" @drop-card-on-desk="handleCardDropOnDesk" />
      </div>
      <div class="flex flex-col justify-evenly gap-y-4">
        <EnemyProfile.Right v-for="enemy of enemiesStore.rightEnemies" :key="enemy.id" :enemy="enemy"
          :is-allowed-to-move="enemy.id === gameStateStore.allowedPlayerId" />
      </div>
    </div>
    <div class="flex flex-col items-center">
      <div v-if="selfStore.self.id === gameStateStore.allowedPlayerId" class="mb-4 text-xl">
        <span class="flex gap-x-2 justify-center items-center">
          <emoji-happy /> Время твоего хода <emoji-happy />
        </span>
        <span>У тебя есть XX секунд на ход</span>
      </div>
      <super-user-interface @stop-move="stopMove" />
      <self-deck @card-drag="handleCardDrag" @card-drag-end="handleCardDragEnd" />
    </div>
  </main>
  <div class="flex justify-center items-center gap-x-2">
    <span>{{ gameStateStore.gameState.roundNumber }} раунд </span>
    <span>{{ selfStore.self.role }}</span>
    <span>{{ selfStore.self.info.nickname }} </span>
    <img class="w-6 h-6" :src="selfStore.self.info.photoUrl" alt="Your profile picture">
  </div>
</template>
<script setup lang="ts">
import * as EnemyProfile from "@/module/card-game/enemy-profile"
import BasicCard from "@/module/card-game/BasicCard.vue";
import SelfDeck from "@/module/card-game/SelfDeck.vue";
import GameDesk from "@/module/card-game/Desk.vue";
import SuperUserInterface from "@/module/card-game/SuperUserInteface.vue";
import EmojiHappy from "@/components/svg/EmojiHappy.vue";
import { useDurakGame } from "@/composable/useDurakGame"
import {
  useGameStateStore,
  useGameDeskStore,
  useGameSelfStore,
  useGameEnemiesStore,
} from "@/stores/game";

const enemiesStore = useGameEnemiesStore();
const selfStore = useGameSelfStore();
const deskStore = useGameDeskStore();
const gameStateStore = useGameStateStore();

const { handleCardDrag, handleCardDragEnd, handleCardDropOnDesk, stopMove } = useDurakGame({ debug: true });

</script>
