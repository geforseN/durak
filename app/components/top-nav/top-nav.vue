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
      <icons-home />
    </router-link>
    <div class="ml-auto" />
    <!-- NOTE: using v-show because app-theme-select must initialize state -->
    <!-- otherwise user theme will not be taken from storage -->
    <!-- TODO: use v-if and defineAsyncComponent -->
    <!-- TODO: move theme state to store and trigger value getter call in App.vue -->
    <app-theme-select v-show="!isSmall" />
    <user-auth />
    <app-drawer-open-burger-button
      :size="isSmall ? 'small' : 'medium'"
      @click="appStore.drawer.openButton.handleClick"
    />
  </nav>
</template>
<script setup lang="ts">
import { computed } from "vue";
import AppThemeSelect from "@/components/app-theme-select.vue";
import IconsHome from "@/components/svg/Home.vue";
import AppDrawerOpenBurgerButton from "$/app-drawer/components/app-drawer-open-burger-button.vue";
import UserAuth from "$/user-auth/components/user-auth.vue";
import { useAppStore } from "@/stores";

const appStore = useAppStore();

const isSmall = computed(() => appStore.screen.isExtraSmall);
</script>
