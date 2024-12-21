<template>
  <div
    @dragover.prevent="
      (event) => {
        event.dataTransfer!.dropEffect = 'move';
      }
    "
    @dragenter="
      () => {
        console.debug('dragenter');
        type = 'dragenter';
      }
    "
    @dragleave="
      () => {
        console.debug('dragleave');
        type = 'dragleave';
      }
    "
    @drop.prevent="onDrop"
  >
    <slot :type />
  </div>
</template>
<script lang="ts" setup>
import type { Card } from "@durak-game/durak-dts";
import { ref, type Slot } from "vue";

type DragAndDropType = "dragenter" | "dragleave";

const type = ref<DragAndDropType | undefined>();

const emit = defineEmits<{
  cardDrop: [event: DragEvent,card: Card]
}>();

defineSlots<{
  default: Slot<{ type: DragAndDropType | undefined }>;
}>();


function onDrop(event: DragEvent) {
  try {
    const dataTransferItem = event.dataTransfer!.items[0];
    if (!dataTransferItem) {
      throw new Error("dataTransferItem is not defined");
    }
    dataTransferItem.getAsString((data) => {
      try {
        // FIXME: add `valibot` parse 
        const card = <Card>JSON.parse(data).card; 
        emit('cardDrop', event, card);
      } catch (reason) {
        console.error("onDrop dataTransferItem error", { reason });
      }
    });
  } catch (reason) {
    console.error("onDrop error", { reason });
    return;
  }
}
</script>
