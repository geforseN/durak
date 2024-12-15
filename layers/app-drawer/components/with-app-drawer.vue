<template>
  <div class="drawer drawer-end">
    <!-- NOTE: do not remove #app-drawer, it is used by open and close buttons -->
    <input
      id="app-drawer"
      type="checkbox"
      class="drawer-toggle"
    >
    <div class="drawer-content">
      <slot />
    </div>
    <div
      class="drawer-side z-[2]"
      v-bind="$attrs"
    >
      <label
        for="app-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      />
      <slot name="content">
        <app-drawer-default-content
          v-if="appStore.drawer.openButton.isClickedOnce"
        />
      </slot>
    </div>
  </div>
</template>
<!-- FIXME: aria i18n -->
<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useAppStore } from "@/stores";

const AppDrawerDefaultContent = defineAsyncComponent(
  () => import("./app-drawer-default-content.vue"),
);

const appStore = useAppStore();
</script>
