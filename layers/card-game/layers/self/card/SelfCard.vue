<template>
  <self-card-with-focus
    #="{ isFocused }"
    draggable
    @dragstart="ondragstart"
  >
    <component
      :is="
        self.isAttacker
          ? SelfAttackerCard
          : self.isDefender
            ? SelfDefenderCard_
            : SelfBaseCard
      "
      ref="card"
      v-bind="{
        id,
        isFocused,
        isTrump,
        rank,
        suit,
      }"
    />
  </self-card-with-focus>
</template>
<script lang="ts">
function dragstart(
  event: DragEvent,
  element: HTMLElement,
  data: {
    card: Card;
  },
) {
  if (!event.dataTransfer) {
    throw new Error("No dataTransfer");
  }
  event.dataTransfer.setDragImage(
    element,
    element.clientWidth / 2,
    element.clientHeight / 2,
  );
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", JSON.stringify(data));
}
</script>
<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import SelfCardWithFocus from "./self-card-with-focus.vue";
import type { Card } from "@durak-game/durak-dts";
import SelfAttackerCard from "../as-allowed/card/self-attacker-card_.vue";
import SelfDefenderCard_ from "../as-allowed/card/self-defender-card_.vue";
import SelfBaseCard from "./self-base-card.vue";

const cardRef = useTemplateRef("card");
const self = {
  isAttacker: false,
  isDefender: false,
};

const props = defineProps<
  Card & {
    id: string;
    index: number;
  }
>();

const isTrump = computed(() => false);

function ondragstart(event: DragEvent) {
  const cardElement = cardRef.value?.element;
  if (!cardElement) {
    throw new Error("No card element");
  }
  dragstart(event, cardElement, {
    card: {
      rank: props.rank,
      suit: props.suit,
    },
  });
}
</script>
