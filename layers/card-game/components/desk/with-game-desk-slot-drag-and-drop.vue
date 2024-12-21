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
  >
    <slot :type />
  </div>
</template>
<script lang="ts" setup>
import { ref, type Slot } from "vue";

type DragAndDropType = "dragenter" | "dragleave";

const type = ref<DragAndDropType | undefined>();

defineSlots<{
  default: Slot<{ type: DragAndDropType | undefined }>;
}>();
</script>
