import { defineStore } from "pinia";
import { reactive } from "vue";

export type Notification = {
  message: string;
  type: "Error" | "Warning" | "Success";
  id: string; // randomUUID from crypto:node
  durationInMS: number;
  header?: string;
};

const useNotificationStore = defineStore("alerts", () => {
  const notificationQueue = reactive<Notification[]>([]);

  function addNotificationInQueue(newNotification: Notification): void {
    notificationQueue.push(newNotification);
    setTimeout(() => {
      const notificationToRemoveIndex = notificationQueue.findIndex(
        (notification) => notification.id === newNotification.id,
      );
      notificationQueue.splice(notificationToRemoveIndex, 1);
    }, newNotification.durationInMS)
  }

  return {
    notificationQueue,
    addNotificationInQueue,
  };
});

export default useNotificationStore;
