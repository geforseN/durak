<template>
  <div :id="groupId" class="my-4 flex gap-3 items-center justify-between">
    <label :for="$attrs.name + '#' + selectedInputId">
      <slot name="header"></slot>
    </label>
    <div class="btn-group">
      <input
        v-for="value of inputValues"
        :key="value"
        v-bind="$attrs"
        :checked="input === value"
        :data-title="value"
        :value="value"
        class="btn text-xl"
        type="radio"
        :id="$attrs.name + '#' + value"
        @change="$event => {
          selectedInputId = ($event.target as HTMLInputElement).value;
          emit('update:input', ($event.target as HTMLInputElement).value);
        }
        "
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
