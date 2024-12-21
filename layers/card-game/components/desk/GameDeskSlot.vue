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
import GameCard from "$/card-game/components/card/game-card.vue";
import MiniCard from "$/card-game/components/card/mini-card.vue";
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

const isFocused = ref(false);

const selfStore = useGameSelfStore();

useEventListener("keyup", async (event) => {
  if (!isFocused.value) {
    return console.debug("DEBUG: not focused");
  }
  try {
    const cardIndex = getCardIndex(event);
    const card = selfStore.self.hand.getCardByIndex(cardIndex);
    durakGame.dropCardOnDesk(card, props.index);
  } catch (error) {
    if (!(error instanceof Error)) {
      return;
    }
    notificationStore.addNotificationInQueue(error);
  }
});

function getCardIndex(event: KeyboardEvent) {
  const digit = getDigitFromKeyboardEvent(event);
  const indexRightSide = digit === 0 ? 10 : digit - 1;
  const indexLeftSide = event.shiftKey ? 1 : 0;
  return Number(`${indexLeftSide}${indexRightSide}`);
}

function getDigitFromKeyboardEvent(event: KeyboardEvent) {
  const digit = Number(event.code.replace("Digit", "").replace("Numpad", ""));
  if (!isDigit(digit)) {
    if (isValidEvent(event)) {
      throw new Error("Pressed key is valid, but should not lead to card put");
    }
    throw new Error("Pressed key must be digit");
  }
  return digit;
}

function isDigit(number: number) {
  return Number.isInteger(number) && number <= 9 && number >= 0;
}

function isValidEvent(event: KeyboardEvent) {
  return (
    event.code === "Tab" ||
    event.code === "ShiftLeft" ||
    event.code.startsWith("Arrow")
  );
}
</script>
