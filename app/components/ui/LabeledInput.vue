<template>
  <label :for="id">
    <slot />
  </label>
  <input
    v-bind="$attrs"
    :id
    :maxlength
    class="py-2 px-2 border-2 border-black w-full h-full"
  >
</template>
<script setup lang="ts">
import { useId } from 'vue'
import { config } from '@/config'

const {
  id = useId(),
  maxlength = config.labeledInput.maxlength,
} = defineProps<{
  id?: string;
  maxlength?: number;
}>();
</script>