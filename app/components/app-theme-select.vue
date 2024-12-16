<template>
  <select
    :id
    v-model="selectedTheme"
    class="select"
    name="app-theme-select"
    data-testid="app-theme-select"
  >
    <option
      v-for="[value, label] of values"
      :key="value"
      :value
    >
      {{ label }}
    </option>
  </select>
</template>
<script lang="ts">
</script>
<script setup lang="ts">
import { useId } from "vue";

const selectedTheme = defineModel<string>({ required: true });

const { 
  id = useId(),
} = defineProps<{
  id?: string;
  values: [string, string][];
}>();
</script>
