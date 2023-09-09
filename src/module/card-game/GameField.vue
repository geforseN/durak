<template>
  <div
    class="w-full h-full flex justify-around items-center self-center bg-neutral rounded max-lg:rounded-t-none max-w-5xl p-2 border-2 border-neutral-900"
  >
    <EnemyProfile
      v-for="enemy of enemiesStore.topEnemies"
      :key="enemy.id"
      :enemy="enemy"
    />
  </div>
  <div
    class="w-full flex justify-evenly gap-x-0 xxs:gap-x-2 xs:gap-x-4 xs:px-2"
  >
    <div class="flex flex-col justify-evenly gap-y-4">
      <EnemyProfile
        v-for="enemy of enemiesStore.leftEnemies"
        :key="enemy.id"
        :enemy="enemy"
      />
    </div>
    <game-board />
    <div class="flex flex-col justify-evenly gap-y-4">
      <EnemyProfile
        v-for="enemy of enemiesStore.rightEnemies"
        :key="enemy.id"
        :enemy="enemy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameEnemiesStore } from "@/stores/game";
import { TopLeft as EnemyProfile } from "@/module/card-game/enemy-profile";
import GameBoard from "@/module/card-game/GameBoard.vue";

const enemiesStore = useGameEnemiesStore();
</script>
