import { defineStore } from "pinia";
import { reactive } from "vue";

type Milliseconds = number;

export type Notification = {
  message: string;
  type: "Error" | "Warning" | "Success";
  id: number;
  duration: Milliseconds;
  header?: string
};

const useNotificationStore = defineStore("alerts", () => {
  const notificationQueue = reactive<Notification[]>([]);

  function addNotificationInQueue(newNotification: Notification): void {
    notificationQueue.push(newNotification);
    new Promise(() => setTimeout(() => {}, newNotification.duration)).then(
      () => {
        const notificationToRemoveIndex = notificationQueue.findIndex(
          (notification) => notification.id === newNotification.id,
        );
        notificationQueue.splice(notificationToRemoveIndex, 1);
      },
    );
  };

  return {
    notificationQueue,
    addNotificationInQueue
  };
});

export default useNotificationStore;
