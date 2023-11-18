<template>
  <div
    class="flex flex-wrap items-baseline justify-between gap-0.5 max-[320px]:flex-col"
  >
    <label :for="id">
      <slot></slot>
    </label>
    <select
      v-bind="attrs"
      v-model="model"
      :id="id"
      class="select-bordered select select-sm max-w-xs text-center text-xl min-[420px]:select-md focus:outline-2 focus:outline-primary min-[420px]:text-2xl"
    >
      <option
        v-for="option of options"
        :key="option"
        :value="option"
        :name="option"
      >
        {{ optionsDictionary[option] || option }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts" generic="T extends string | number">
import { useAttrs } from "vue";

const attrs = useAttrs();
const { options, optionsDictionary, id } = defineProps<{
  options: string[];
  optionsDictionary: Record<string, string>;
  id: string;
}>();
const model = defineModel<T>();
</script>
