<template>
  <div class="toast">
    <div v-for="notification of notificationQueue" :id="notification.id"
         class="alert" :class="backgroundColorMap[notification.type] || 'bg-neutral-500'">
      {{ notification.message }}
      <button class="btn" @click="removeNotification(notification.id)">Убрать</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { socket, gameLobbies, globalChat } from "@/socket";
import { useNotificationStore, type NotificationAlert } from "@/stores/notification.store";

const notificationStore = useNotificationStore();
const { removeNotification } = notificationStore;
const { notificationQueue } = storeToRefs(notificationStore);

socket.on("sendNotification", (notification: NotificationAlert) => {
  notificationStore.addNotificationInQueue(notification);
});

globalChat.on("sendNotification", (notification: NotificationAlert) => {
  notificationStore.addNotificationInQueue(notification);
});

gameLobbies.on("sendNotification", (notification: NotificationAlert) => {
  notificationStore.addNotificationInQueue(notification);
});

const backgroundColorMap = computed(() => ({
  Error: "bg-error",
  Warning: "bg-warning",
  Success: "bg-success",
}));
</script>
