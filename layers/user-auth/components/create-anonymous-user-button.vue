<template>
  <!-- prettier-ignore -->
  <app-button
    v-bind="{...$props, variant: 'accent'}"
  >
    Create anonymous account
  </app-button>
</template>
<!-- FIXME: i18n -->
<script setup lang="ts">
import AppButton, {
  type AppButtonProps,
} from "@/components/app-button/app-button.vue";

defineProps<AppButtonProps>();
</script>
