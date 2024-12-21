<template>
  <WithSlotDragAndDrop
    #="dragAndDrop"
    class="relative rounded-lg bg-neutral text-neutral-content"
    @drop.prevent="onDrop"
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
        <span class="select-none opacity-50">{{ index + 1 }}</span>
      </span>
      <game-card v-if="attackCard" v-bind="attackCard" class="absolute" />
      <game-card
        v-if="defendCard"
        v-bind="defendCard"
        class="absolute z-10 translate-x-2.5 xxs:translate-x-3 lg:translate-x-3.5"
      />
    </div>
    <WithSlotFocus>
      <mini-card
        v-for="card of selfStore.self.cards"
        :key="`${card.rank}${card.suit}`"
        v-bind="card"
      />
    </WithSlotFocus>
  </WithSlotDragAndDrop>
</template>
<script setup lang="ts">
import { ref } from "vue";
import WithSlotFocus from "../desk/with-game-desk-slot-focus.vue";
import WithSlotDragAndDrop from "../desk/with-game-desk-slot-drag-and-drop.vue";
import GameCard from "$/card-game/layers/card/game-card.vue";
import MiniCard from "$/card-game/layers/card/mini-card.vue";
import type { Card } from "$/card-game/types";
import { useGameSelfStore } from "@/stores/game";
import { useEventListener } from "@vueuse/core";
import { makeDropOnDeskEvent } from "$/card-game/events/self.card.drop-on-desk";

function onDrop(event: DragEvent) {
  console.debug("onDrop", event);
  try {
    event.dataTransfer!.items[0].getAsString((data) => {
      event.target!.dispatchEvent(
        makeDropOnDeskEvent({
          card: JSON.parse(data).card,
          slotIndex: props.index,
        }),
      );
    });
  } catch (reason) {
    console.error("onDrop error", { reason });
    return;
  }
}

const props = defineProps<{
  attackCard?: Card;
  defendCard?: Card;
  index: number;
}>();
</script>
