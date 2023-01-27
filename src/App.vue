<template>
  <div class="min-h-screen flex flex-col">
    <site-header />
    <router-view />
    <notification-queue class="fixed top-3 right-[50%] translate-x-[50%]" />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "@/components/site-header.vue";
import NotificationQueue from "@/components/notification-queue.vue";
</script>
