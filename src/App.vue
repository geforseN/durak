<template>
  <site-header />
  <router-view />
  <notification-queue />
</template>

<script setup lang="ts">
import SiteHeader from "@/components/site-header.vue";
import NotificationQueue from "@/components/notification-queue.vue"
</script>
