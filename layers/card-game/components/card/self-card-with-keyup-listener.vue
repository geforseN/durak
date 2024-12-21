<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
function parseSlotIndex(event: KeyboardEvent, deskSlotsKeys: number[]) {
  const pressedKey = Number(event.key);
  if (!deskSlotsKeys.includes(pressedKey)) {
    return;
  }
  return pressedKey;
}
</script>
<script lang="ts" setup>
import { useEventListener } from "@vueuse/core";
import type { ComputedRef, Slot } from "vue";
import { injectOrThrow } from "@/utils/vue/inject-or-throw";
import type { Card } from "@durak-game/durak-dts";

const { isFocused, rank, suit } = defineProps<
  Card & {
    isFocused: boolean;
  }
>();

defineSlots<{
  default: Slot;
}>();

const emit = defineEmits<{
  dropOnDesk: [card: Card, slotIndex: number];
}>();

const deskSlotKeys = injectOrThrow<ComputedRef<number[]>>("deskSlotKeys");

useEventListener("keyup", (event: KeyboardEvent) => {
  if (!isFocused) {
    return;
  }
  const slotIndex = parseSlotIndex(event, deskSlotKeys.value);
  if (!slotIndex) {
    return;
  }
  const card = { rank, suit };
  emit("dropOnDesk", card, slotIndex);
});
</script>
