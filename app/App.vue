<template>
  <with-app-drawer>
    <div class="flex min-h-screen flex-col bg-base-100">
      <top-nav :class="isGamePage && 'bg-purple-400'" />
      <router-view />
      <notification-queue />
    </div>
  </with-app-drawer>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import TopNav from "@/components/top-nav/top-nav.vue";
import NotificationQueue from "@/components/notification-queue.vue";
import WithAppDrawer from "$/app-drawer/components/with-app-drawer.vue";

const router = useRouter();
const uuidRegExp =
  /^\/game\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const isGamePage = computed(() =>
  router.currentRoute.value.path.match(uuidRegExp),
);
</script>
