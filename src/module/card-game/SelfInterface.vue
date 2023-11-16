<template>
  <div class="flex flex-col w-full max-w-5xl">
    <self-allowed-interface v-show="selfStore.self.isAllowed" />
    <self-deck
      :cards="selfStore.self.cards"
      :is-empty="selfStore.self.isEmpty"
    />
    <div
      class="absolute bottom-2 right-1/2 translate-x-1/2 bg-primary border-black border-2"
      :class="[
        selfStore.self.isDefender && 'bg-blue-700',
        selfStore.self.isAttacker && 'bg-red-700',
      ]"
    >
      canMakeMove:
      {{ selfStore.self.canMakeMove }}
    </div>
  </div>
</template>
<script setup lang="ts">
import SelfDeck from "@/module/card-game/SelfDeck.vue";
import SelfAllowedInterface from "@/module/card-game/SelfAllowedInterface.vue";
import { useGameSelfStore } from "@/stores/game";

const selfStore = useGameSelfStore();
</script>
