<template>
  <label
    for="app-drawer"
    aria-label="open sidebar"
    class="btn btn-square btn-ghost btn-sm xs:btn-md"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :width="appScreen.isExtraSmall.value ? 24 : 40"
      :height="appScreen.isExtraSmall.value ? 24 : 40"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-width="1.5"
        d="M20 7H4m16 5H4m16 5H4"
      />
    </svg>
  </label>
</template>
<script setup lang="ts">
import { useAppScreen } from "@/composable/useAppScreen";

const appScreen = useAppScreen();
</script>
