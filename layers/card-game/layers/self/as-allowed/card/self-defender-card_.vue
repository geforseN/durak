<template>
  <self-base-card
    ref="selfBaseCard"
    v-bind="baseCardProps"
    class="border-blue-600"
    :class="[
      canBeUsedForDefense && isTrump
        ? 'outline outline-blue-500'
        : 'outline outline-4 outline-purple-500',
      canBeUsedForTransferMove && 'rotate-2 outline outline-red-500',
      // TODO: card can be used for defense and transfer move at the same time, must add unique class (now they are overlapping)
    ]"
  />
</template>
<!-- NOTE: this component must be used when self is defender -->
<script setup lang="ts">
import { computed, useTemplateRef } from "vue";
import SelfBaseCard, { type SelfBaseCardProps } from "../../card/self-base-card.vue";
import { powerOfCard } from "$/card-game/utils/card/powers";
import type { Card } from "@durak-game/durak-dts";

const { isTrump, rank, suit, ...baseCardProps } = defineProps<
  SelfBaseCardProps &
    Card & {
      isTrump: boolean;
    }
>();

const power = computed(() => powerOfCard({ rank, suit }));

// const unbeatenSlots = computed(() => gameDesk.slots.unbeaten);

const canBeUsedForDefense = computed(() => {
  if (isTrump) {
    return false;
    return (
      unbeatenSlots.value.includes((slot) => slot.hasNoTrumpCard()) ||
      unbeatenSlots.value
        .filter((slot) => slot.hasTrumpCard())
        .some((slot) => slot.attackCard.power < power.value)
    );
  }
  return false;
  return unbeatenSlots.value
    .filter((slot) => slot.attackCard === suit)
    .some((slot) => powerOfCard(slot.attackCard) < power);
});

const baseCardRef = useTemplateRef("selfBaseCard");
const element = computed(() => baseCardRef.value?.element);

defineExpose({ element });

const canBeUsedForTransferMove = computed(() => {
  return false;
  // FIXME: implement, add tests
  // gameDeskStore.allowsTransferMove &&
  // gameDeskStore.ranks[0] === card.rank
  //    const deskAllowsTransferMove = computed(() => {
  //     if (hasDefendedSlot.value || isEmpty.value || !firstUnbeatenSlotRank.value)
  //       return false;
  //     return unbeatenSlots.value.every(
  //       (slot) => slot.attackCard.rank === firstUnbeatenSlotRank.value,
  //     );
  // });
});
</script>
