<template>
  <div
    class="grid grid-cols-2 xs:grid-cols-3 grid-flow-row bg-primary justify-items-center"
  >
    <template v-for="(slot, index) of deskStore.slots" :key="index">
      <game-desk-slot
        :attack-card="slot.attackCard"
        :defend-card="slot.defendCard"
        :index="index"
        @dragenter.prevent
        @dragover.prevent
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import GameDeskSlot from "@/module/card-game/GameDeskSlot.vue";
import { useGameDeskStore } from "@/stores/game";

const deskStore = useGameDeskStore();
</script>
