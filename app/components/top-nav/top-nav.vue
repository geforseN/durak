<template>
  <nav
    data-testid="top-nav"
    class="navbar sticky top-0 z-[1] flex h-12 min-h-0 items-end gap-1 border-b border-b-neutral bg-primary/50 xs:h-16 xs:gap-2"
  >
    <router-link
      class="btn btn-outline btn-sm border align-middle xs:btn-md"
      active-class="underline underline-offset-8 decoration-black"
      to="/"
    >
      <i-material-symbols-light-home-outline />
    </router-link>
    <div class="ml-auto" />
    <app-theme-select
      v-if="!isSmall"
      v-model="appStore.theme.selected"
      :values="Object.entries(appStore.theme.record)"
    />
    <user-auth />
    <app-drawer-open-burger-button
      :size="isSmall ? 'small' : 'medium'"
      @click="appStore.drawer.openButton.handleClick"
    />
  </nav>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent } from "vue";
import AppDrawerOpenBurgerButton from "$/app-drawer/components/app-drawer-open-burger-button.vue";
import UserAuth from "$/user-auth/components/user-auth.vue";
import { useAppStore } from "@/stores";

const AppThemeSelect = defineAsyncComponent(
  () => import("$/app-theme/components/app-theme-select.vue"),
);

const appStore = useAppStore();

const isSmall = computed(() => appStore.screen.isExtraSmall);
</script>
