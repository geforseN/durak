<template>
  <create-anonymous-user-button :size="isSmall ? 'small' : 'medium'" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import CreateAnonymousUserButton from "$/user-auth/components/create-anonymous-user-button.vue";
import { useAppStore } from "@/stores";

const appStore = useAppStore();

const isSmall = computed(() => appStore.screen.isExtraSmall);
</script>
