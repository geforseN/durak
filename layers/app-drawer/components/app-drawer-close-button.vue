<template>
  <label
    for="app-drawer"
    aria-label="close sidebar"
    class="btn btn-square btn-error"
    :class="size === 'small' ? 'btn-sm' : 'btn-md'"
    data-testid="app-drawer-close-button"
  >
    <i-material-symbols-light-close />
  </label>
</template>
<script setup lang="ts">
defineProps<{
  size: "small" | "medium";
}>();
</script>
