<template>
  <app-button
    :size="appStore.screen.isExtraSmall ? 'small' : 'medium'"
    variant="accent"
  >
    Create anonymous account
  </app-button>
</template>
<!-- FIXME: i18n -->
<script setup lang="ts">
import { useAppStore } from "@/stores";
import AppButton from "@/components/app-button/app-button.vue";

const appStore = useAppStore();
</script>
