<template>
  <label :for="props.id">
    <slot ></slot>
  </label>
  <input
    v-bind="$attrs"
    :maxlength="props.maxlength ?? 128"
    :id="props.id"
    class="py-2 px-2 border-2 border-black w-full h-full"
  />
</template>
<script setup lang="ts">

const props = defineProps<{
  id: string,
  maxlength?: number,
}>();
</script>

<style scoped>

</style>