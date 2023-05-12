<template>
  <div class="my-4 flex flex-wrap gap-0.5 max-[320px]:flex-col justify-between items-baseline">
    <label :for="id">
      <slot></slot>
    </label>
    <select
      class="max-w-xs select select-sm text-xl min-[420px]:select-md min-[420px]:text-2xl
      bg-neutral select-bordered text-secondary text-center focus:outline-primary focus:outline-2"
      v-bind="$attrs" :id="id">
      <option v-for="option of options" :key="option" :value="option" :name="option">
        {{ optionsDictionary[option] || option }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
const { options, optionsDictionary, id } =
  defineProps<{ options: string[], optionsDictionary: Record<string, string>, id: string }>();
</script>
