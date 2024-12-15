<template>
  <label
    for="app-drawer"
    aria-label="close sidebar"
    class="btn btn-square btn-error btn-sm xs:btn-md"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="appScreen.isExtraSmall.value ? 24 : 40"
      :height="appScreen.isExtraSmall.value ? 24 : 40"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
      />
    </svg>
  </label>
</template>
<script setup lang="ts">
import { useAppScreen } from "@/composable/useAppScreen";

const appScreen = useAppScreen();
</script>
