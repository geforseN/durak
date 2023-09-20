<template>
  <div class="relative rounded-lg">
    <div>
      <div
        class="cursor-auto relative grid place-items-center font-bold text-3xl border sm:border-2 border-primary rounded h-[83px] w-[60px] xxs:h-[116px] xxs:w-[83px] md:h-[132px] md:w-[96px] lg:h-[158px] lg:w-[115px]"
      >
        <span class="w-full h-full bg-secondary-focus grid place-items-center">
          <span class="opacity-50 select-none">{{ props.index + 1 }}</span>
        </span>
        <basic-card
          v-if="props.attackCard"
          v-bind="props.attackCard"
          class="absolute"
        />
        <basic-card
          v-if="props.defendCard"
          v-bind="props.defendCard"
          class="absolute translate-x-2.5 xxs:translate-x-3 lg:translate-x-3.5 z-10"
        />
      </div>
    </div>
    <div
      v-if="isFocused"
      class="flex flex-wrap gap-1 w-full justify-center content-start bg-secondary-focus bottom-0.5 absolute z-10 border-2 border-black content-box"
    >
      <mini-card
        v-for="card of selfStore.self.cards"
        :key="`${card.rank}${card.suit}`"
        v-bind="card"
      />
    </div>
    <input
      type="radio"
      name="game-desk-slot"
      @focus="isFocused = true"
      @blur="isFocused = false"
      class="focus:outline-cyan-400 focus:outline-dashed focus:outline-4 focus:outline-offset-2 z-10 rounded-md w-full h-full appearance-none absolute inset-0"
    />
  </div>
</template>

<script setup lang="ts">
import BasicCard from "@/module/card-game/BasicCard.vue";
import MiniCard from "@/module/card-game/MIniCard.vue";
import type { Card } from "./types";
import { ref } from "vue";
import { useGameSelfStore } from "@/stores/game";
import { useEventListener } from "@vueuse/core";
import { useSharedDurakGame } from "@/module/card-game/composable/useDurakGame";
import { useNotificationStore } from "@/stores/notification.store";

const props = defineProps<{
  attackCard?: Card;
  defendCard?: Card;
  index: number;
}>();

const isFocused = ref(false);

const durakGame = useSharedDurakGame();

const notificationStore = useNotificationStore();
const selfStore = useGameSelfStore();

useEventListener("keyup", async (event) => {
  if (!isFocused.value) {
    return;
  }
  try {
    const cardIndex = getCardIndex(event);
    const card = selfStore.self.hand.getCardByIndex(cardIndex);
    durakGame.handleCardDropOnDesk(card, props.index);
  } catch (error) {
    if (!(error instanceof Error) || error instanceof SilentError) {
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
      throw new SilentError(
        "Pressed key is valid, but should not lead to card put",
      );
    }
    console.log(event.code);
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

class SilentError extends Error {
  isSilent = true;

  constructor(...args: ConstructorParameters<typeof Error>) {
    super(...args);
  }
}
</script>
