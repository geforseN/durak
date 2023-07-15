<template>
  <div :id="'group' + attrs.name" class="my-4 flex gap-0.5 sm:gap-3 max-[320px]:flex-col justify-between items-baseline">
    <label :for="attrs.name + '#' + model">
      <slot></slot>
    </label>
    <div class="btn-group">
      <input type="radio" class="btn btn-sm min-[420px]:btn-md min-[420px]:text-xl" :id="attrs.name + '#' + value"
        v-for="value of props.inputValues" :key="value" :data-title="value" :value="value" v-model="model"
        v-bind="attrs" />
    </div>
  </div>
</template>
<script setup lang="ts" generic="T extends string | number">
import { useAttrs } from 'vue';
const attrs = useAttrs() as { name: string };
const model = defineModel<T>();
const props = defineProps<{
  inputValues: T[];
}>();
</script>
