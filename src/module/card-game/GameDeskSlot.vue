<template>
  <div class="relative rounded-lg">
    <div>
      <div class="cursor-auto relative grid place-items-center font-bold text-3xl border sm:border-2 border-primary rounded 
    h-[83px] w-[60px] xxs:h-[116px] xxs:w-[83px] md:h-[132px] md:w-[96px] lg:h-[158px] lg:w-[115px]">
        <span class="w-full h-full bg-secondary-focus grid place-items-center">
          <span class="opacity-50 select-none">{{ props.index + 1 }}</span>
        </span>
        <basic-card v-if="props.attackCard" v-bind="props.attackCard" class="absolute" />
        <basic-card v-if="props.defendCard" v-bind="props.defendCard"
          class="absolute translate-x-2.5 xxs:translate-x-3 lg:translate-x-3.5 z-10" />
      </div>
    </div>
    <div v-if="isFocused"
      class="flex flex-wrap gap-1 w-full justify-center content-start bg-secondary-focus bottom-0.5 absolute z-10 border-2 border-black content-box">
      <mini-card v-for="card of selfStore.self.cards" v-bind="card" />
    </div>
    <input type="radio" name="game-desk-slot" @focus="isFocused = true" @blur="isFocused = false"
      class="focus:outline-cyan-400 focus:outline-dashed focus:outline-4 focus:outline-offset-2 z-10 rounded-md w-full h-full appearance-none absolute inset-0">
  </div>
</template>

<script setup lang="ts">
import BasicCard from "@/module/card-game/BasicCard.vue";
import MiniCard from "@/module/card-game/MIniCard.vue";
import type { Card } from "./types";
import { ref } from "vue";
import { useGameSelfStore } from "@/stores/game";
import { useEventListener } from "@vueuse/core";

const props = defineProps<{
  attackCard?: Card,
  defendCard?: Card,
  index: number,
}>();

const emit = defineEmits<{
  (e: "insertCard", data: { card: Card, slotIndex: number }): void
}>()

const isFocused = ref(false);
const selfStore = useGameSelfStore();

useEventListener('keyup', (event) => {
  if (!isFocused.value || !event.code.startsWith('Digit')) return;
  const digit = Number(event.code.split('Digit')[1]);
  if (digit > selfStore.self.cards.length) return;
  const rightIndex = (digit + 9) % 10;
  const leftIndex = event.shiftKey ? 1 : event.altKey ? 2 : 0;
  const index = leftIndex * 10 + rightIndex;
  if (index > selfStore.self.cards.length - 1) return;
  const card = selfStore.self.cards[index];
  emit("insertCard", { card, slotIndex: props.index });
});
</script>


<!-- 


// const slotStatus = computed(() => {
  //   if (props.defendCard) {
  //     return 'full';
  //   } else if (props.attackCard) {
  //     return 'attacked';
  //   } else return 'empty';
  // })
  
  // const allowedCards = computed(() => {
  //   if (slotStatus.value === 'full') return [];
  //   if (slotStatus.value === 'empty') {
  //     if (deskStore.isEmpty) return deskStore.deskSlots;
  //     selfStore.self.cards.filter(card => deskStore.ranks.includes(card.rank))
  //   };
  
  //   if (isTrump.value) {
  //     return []
  //   }
  //   return []
  // })
  
  // const message = computed(() => {
  //   if (!allowedCards.value.length) {
  //     const status = slotStatus.value;
  //     return status === 'empty'
  //       ? 'Слот полностью занят'
  //       : status === 'attacked'
  //         ? 'Слот нельзя атаковать'
  //         : 'Слот нельзя защищать';
  //   }
  // }) -->