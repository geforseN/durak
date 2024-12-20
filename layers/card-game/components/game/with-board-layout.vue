<template>
  <div
    class="grid max-w-xs bg-slate-500 grid-cols-2 place-items-center gap-y-3 rounded-xl border-2 border-base-content p-2 py-5 xs:max-w-md lg:max-w-none lg:grid-cols-[150px_1fr_150px]"
  >
    <slot
      name="discard"
      class="col-start-2 row-start-1 lg:col-start-3"
    />
    <slot
      name="talon"
      class="col-start-1 row-start-1"
    />
    <slot
      name="desk"
      class="col-span-full row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1"
    />
  </div>
</template>
<script setup lang="ts">
import type { Slot } from "vue";

defineSlots<{
  discard: Slot<{ class: string }>;
  talon: Slot<{ class: string }>
  desk: Slot<{ class: string }>
}>();
</script>
