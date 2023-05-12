<template>
  <div :id="groupId" class="my-4 flex gap-0.5 max-[320px]:flex-col justify-between items-baseline">
    <label :for="$attrs.name + '#' + selectedInput">
      <slot></slot>
    </label>
    <div class="btn-group">
      <input
        v-for="value of inputValues"
        :key="value"
        v-bind="$attrs"
        :data-title="value"
        :value="value"
        class="btn btn-sm min-[420px]:btn-md min-[420px]:text-xl"
        type="radio"
        :id="$attrs.name + '#' + value"
        v-model="selectedInput"
      />
    </div>
  </div>
</template>
<script setup lang="ts" generic="T extends string | number">
import { defineModel } from "vue";

const selectedInput = defineModel<T>();

const { inputValues, groupId } = defineProps<{
  inputValues: number[];
  groupId: string;
}>();
</script>
