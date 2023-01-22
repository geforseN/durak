<template>
  <div class="fixed top-3 right-[50%] translate-x-[50%]">
    <div v-for="{ type, message, id } of notificationQueue" :id="id">
      <div
        class="py-2 w-96 rounded-sm border-2 border-black m-2 flex justify-center"
        :class="backgroundColorMap[type] || 'bg-gray-500'"
      >
        {{ message }}
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

// for now unused on server
socket.on("server:sendNotification", (notification: Notification) => {
  notificationStore.addNotificationInQueue(notification);
});

globalChat.on("server:sendNotification", (notification: Notification) => {
  notificationStore.addNotificationInQueue(notification);
});

const backgroundColorMap = computed(() => ({
  Error: "bg-red-500",
  Warning: "bg-yellow-400",
  Success: "bg-green-500",
}));
</script>
