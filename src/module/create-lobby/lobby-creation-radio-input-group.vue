<template>
  <div :id="groupId" class="my-4 flex gap-0.5 max-[320px]:flex-col justify-between items-baseline">
    <label :for="$attrs.name + '#' + selectedInputId">
      <slot></slot>
    </label>
    <div class="btn-group">
      <input
        v-for="value of inputValues"
        :key="value"
        v-bind="$attrs"
        :checked="input === value"
        :data-title="value"
        :value="value"
        class="btn btn-sm min-[420px]:btn-md min-[420px]:text-xl"
        type="radio"
        :id="$attrs.name + '#' + value"
        @change="(event) => {
          selectedInputId = event.target.value;
          emit('update:input', event.target.value);
        }"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "update:input", value: unknown): void;
}>();

const { inputValues, groupId, input } = defineProps<{
  inputValues: number[];
  groupId: string;
  input: unknown;
}>();

const selectedInputId = ref(input);
</script>
