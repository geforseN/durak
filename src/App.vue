<template>
  <div class="flex min-h-screen flex-col">
    <site-header
      :class="
        router.currentRoute.value.path.match(uuidRegExp) && 'bg-purple-400'
      "
    />
    <router-view />
    <notification-queue />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "@/components/site-header.vue";
import NotificationQueue from "@/components/notification-queue.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const uuidRegExp =
  /^\/game\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;
</script>
