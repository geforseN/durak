<template>
  <self-card-with-focus
    #="{ isFocused }"
    draggable
    @dragstart="onDragStart"
  >
    <template v-if="self.isAttacker">
      <SelfAttackerCard
        :id
        ref="card"
        :is-focused
        :rank
        :suit
      />
    </template>
    <template v-else-if="self.isDefender">
      <SelfDefenderCard
        :id
        ref="card"
        :is-focused
        :rank
        :suit
        :is-trump
      />
    </template>
    <template v-else>
      <SelfBaseCard
        :id
        ref="card"
        :rank
        :suit
        :is-focused
      />
    </template>
  </self-card-with-focus>
</template>
<script setup lang="ts">
import { useTemplateRef } from "vue";
import SelfCardWithFocus from "./self-card-with-focus.vue";
import type { Card } from "@durak-game/durak-dts";
import SelfAttackerCard from "../as-allowed/card/self-attacker-card_.vue";
import SelfDefenderCard from "../as-allowed/card/self-defender-card_.vue";
import SelfBaseCard from "./self-base-card.vue";
import { injectOrThrow } from "@/utils/vue/inject-or-throw";

const cardRef = useTemplateRef("card");

const { rank, suit } = defineProps<
  Card & {
    id: string;
    index: number;
    isTrump: boolean;
  }
>();

const self = injectOrThrow<{ isDefender: boolean; isAttacker: boolean }>(
  "self",
);

function onDragStart(event: DragEvent) {
  const cardElement = cardRef.value?.element;
  if (!cardElement) {
    throw new Error("No card element");
  }
  handleCardDrag(event, cardElement, {
    rank,
    suit,
  });
}
</script>
<script lang="ts">
function handleCardDrag(event: DragEvent, element: HTMLElement, card: Card) {
  if (!event.dataTransfer) {
    throw new Error("No dataTransfer");
  }
  event.dataTransfer.setDragImage(
    element,
    element.clientWidth / 2,
    element.clientHeight / 2,
  );
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", JSON.stringify({ card }));
}
</script>
