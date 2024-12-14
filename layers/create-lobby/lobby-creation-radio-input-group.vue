<template>
  <div
    :id="'group' + attrs.name"
    class="flex flex-col items-center justify-between gap-0.5 min-[320px]:flex-row sm:gap-3"
  >
    <label :for="attrs.name + '#' + model">
      <slot />
    </label>
    <div class="join">
      <input
        v-for="value of props.inputValues"
        :id="attrs.name + '#' + value"
        :key="value"
        v-model="model"
        type="radio"
        class="btn join-item btn-sm min-[420px]:btn-md min-[420px]:text-xl"
        :aria-label="value.toString()"
        :value="value"
        v-bind="attrs"
      >
    </div>
  </div>
</template>
<script setup lang="ts" generic="T extends string | number">
import { useAttrs } from "vue";

const model = defineModel<T>();

const props = defineProps<{
  inputValues: readonly T[];
}>();

const attrs = useAttrs() as { name: string };
</script>
