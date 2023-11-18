<template>
  <div
    :id="'group' + attrs.name"
    class="flex flex-col items-center justify-between gap-0.5 min-[320px]:flex-row sm:gap-3"
  >
    <label :for="attrs.name + '#' + model">
      <slot></slot>
    </label>
    <div class="join">
      <input
        :id="attrs.name + '#' + value"
        type="radio"
        v-for="value of props.inputValues"
        class="btn join-item btn-sm min-[420px]:btn-md min-[420px]:text-xl"
        :key="value"
        :aria-label="value.toString()"
        :value="value"
        v-model="model"
        v-bind="attrs"
      />
    </div>
  </div>
</template>
<script setup lang="ts" generic="T extends string | number">
import { useAttrs } from "vue";
const attrs = useAttrs() as { name: string };
const model = defineModel<T>();
const props = defineProps<{
  inputValues: T[];
}>();
</script>
