<template>
  <div class="fixed top-3 right-[50%] translate-x-[50%]">
    <div v-for="notification of notificationQueue" :id="notification.id">
      <div
        class="py-2 w-96 rounded-sm border-2 border-black m-2 flex justify-center"
        :class="backgroundColorMap[notification.type] || 'bg-gray-500'"
      >
        {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { socket ,gameLobbies, globalChat } from "@/socket";
import { useNotificationStore, type NotificationAlert } from "@/stores/notification.store";

const notificationStore = useNotificationStore();
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
  Error: "bg-red-500",
  Warning: "bg-yellow-400",
  Success: "bg-green-500",
}));
</script>
