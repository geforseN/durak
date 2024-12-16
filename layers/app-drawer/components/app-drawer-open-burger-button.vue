<template>
  <label
    for="app-drawer"
    aria-label="open sidebar"
    class="btn btn-square btn-ghost border text-base-100 border-base-100"
    :class="size === 'small' ? 'btn-sm' : 'btn-md'"
    data-testid="app-drawer-open-burger-button"
  >
    <i-solar-hamburger-menu-linear />
  </label>
</template>
<!-- FIXME: aria i18n -->
<script setup lang="ts">
defineProps<{
  size: "small" | "medium";
}>()
</script>
