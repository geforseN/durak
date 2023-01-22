import { defineStore } from "pinia";
import { reactive } from "vue";

export type NotificationAlert = {
  // on server: randomUUID from crypto:node
  // on client: v4 as uuidV4 from npm:uuid
  id: string;

  message: string;
  type: "Error" | "Warning" | "Success";
  durationInMS: number;
  header?: string;
};

export const useNotificationStore = defineStore("alerts", () => {
  const notificationQueue = reactive<NotificationAlert[]>([]);

  function addNotificationInQueue(newNotification: NotificationAlert): void {
    notificationQueue.push(newNotification);
    setTimeout(() => {
      const notificationIndexToRemove = notificationQueue.findIndex(
        (notification) => notification.id === newNotification.id,
      );
      notificationQueue.splice(notificationIndexToRemove, 1);
    }, newNotification.durationInMS);
  }

  return {
    notificationQueue,
    addNotificationInQueue,
  };
});
