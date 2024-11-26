<template>
  <div class="indicator avatar">
    <div
      class="relative h-10 w-10 rounded-xl border border-neutral-800 min-[400px]:h-16 min-[400px]:w-16 sm:h-20 sm:w-20"
    >
      <img :src="props.src" :alt="props.alt" />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt: string;
}>();
</script>
