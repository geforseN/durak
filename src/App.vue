<template>
  <div class="flex min-h-screen flex-col">
    <top-nav
      :class="
        router.currentRoute.value.path.match(uuidRegExp) && 'bg-purple-400'
      "
    />
    <router-view />
    <notification-queue />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

import TopNav from "@/components/top-nav/top-nav.vue";
import NotificationQueue from "@/components/notification-queue.vue";

const router = useRouter();
const uuidRegExp =
  /^\/game\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
</script>
