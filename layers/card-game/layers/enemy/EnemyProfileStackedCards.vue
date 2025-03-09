<template>
  <div
    class="m-2 grid auto-rows-[10px] grid-cols-6 pr-4 grid-in-[cards] xxs:mb-6 min-[400px]:-mr-1.5 min-[400px]:grid-cols-9 md:m-0 md:-mr-4 md:pr-6"
  >
    <div
      v-for="number of count"
      :key="number"
      :data-number="number"
      :style="{ '--x': 2.7 }"
      class="card-bg relative -mx-2 grid h-[28px] w-[21px] place-items-end border border-gray-300 bg-indigo-600 hover:z-10 hover:-translate-y-0.5 sm:h-[39px] sm:w-[27px] md:-mx-3.5 md:h-[55px] md:w-[38px]"
    />
  </div>
</template>
<script setup lang="ts">
defineProps<{
  count: number;
}>();
</script>
<style scoped>
.card-bg:hover:after,
.card-bg:last-child:after {
  @apply absolute bottom-[1px] right-[1px] rounded border border-gray-300 bg-white px-[0.7px] text-sm text-black content-[attr(data-number)];
}
</style>
