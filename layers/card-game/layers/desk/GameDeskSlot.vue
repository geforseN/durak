<template>
  <with-slot-drag-and-drop
    #="dragAndDrop"
    class="relative rounded-lg bg-neutral text-neutral-content"
    @card-drop="onCardDrop"
  >
    <div
      class="relative grid h-[83px] w-[60px] place-items-center rounded text-3xl font-bold xxs:h-[116px] xxs:w-[83px] sm:border-2 md:h-[132px] md:w-[96px] lg:h-[158px] lg:w-[115px]"
      :class="[
        dragAndDrop.type === 'dragenter'
          ? 'border border-accent'
          : 'border border-primary',
      ]"
    >
      <span class="grid h-full w-full place-items-center">
        <span class="select-none opacity-50">{{ number }}</span>
      </span>
      <game-card
        v-if="attackCard"
        v-bind="attackCard"
        class="absolute"
      />
      <game-card
        v-if="defendCard"
        v-bind="defendCard"
        class="absolute z-10 translate-x-2.5 xxs:translate-x-3 lg:translate-x-3.5"
      />
    </div>
    <!-- TODO: implement keyboard listener that will put card on desk when correct keys are pressed -->
    <!-- NOTE: when more than 9 cards instead of just digit  -->
    <!-- then must use letter => A1, A2, ..., B2 -->
    <!-- OR use key modifier => Shift, Control -->
    <!-- must show it to user -->
  </with-slot-drag-and-drop>
</template>
<script setup lang="ts">
import WithSlotDragAndDrop from "./with-game-desk-slot-drag-and-drop.vue";
import { makeDropOnDeskEvent } from "$/card-game/events/self.card.drop-on-desk";
import GameCard from "$/card-game/layers/card/game-card.vue";
import type { Card } from "$/card-game/types";

const { index } = defineProps<{
  attackCard?: Card;
  defendCard?: Card;
  index: number;
  number: number;
}>();

function onCardDrop(event: DragEvent, card: Card) {
  try {
    event.target!.dispatchEvent(
      makeDropOnDeskEvent({
        card,
        slotIndex: index,
      }),
    );
  } catch (reason) {
    console.error("onCard error", { reason });
    return;
  }
}
</script>
