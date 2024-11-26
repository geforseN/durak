<template>
  <div
    v-for="number of props.count"
    :key="number"
    :data-number="number"
    :style="{ '--x': 2.7 }"
    class="relative h-[28px] w-[21px] sm:h-[39px] sm:w-[27px] md:h-[55px] md:w-[38px] grid place-items-end -mx-2 md:-mx-3.5 card-bg bg-indigo-600 border border-gray-300 hover:z-10 hover:-translate-y-0.5"
  />
</template>
<script setup lang="ts">
import type { Ref } from "vue";

const props = defineProps<{ count: Ref<number> }>();
</script>
<style scoped>
div:hover:after,
div:last-child:after {
  @apply content-[attr(data-number)] absolute bottom-[1px] right-[1px] px-[0.7px] border border-gray-300 bg-white rounded text-sm text-black;
}
</style>
