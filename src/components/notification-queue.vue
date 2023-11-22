<template>
  <div class="toast">
    <div
      v-for="notification of notificationStore.notificationQueue"
      :key="notification.id"
      class="alert"
      :class="backgroundColorMap[notification.type] || 'bg-neutral-500'"
    >
      {{ notification.message }}
      <button
        class="btn"
        @click="notificationStore.removeNotification(notification.id)"
      >
        Убрать
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useNotificationStore } from "@/stores";

const notificationStore = useNotificationStore();

const backgroundColorMap = {
  Error: "bg-error",
  Warning: "bg-warning",
  Success: "bg-success",
};
</script>
