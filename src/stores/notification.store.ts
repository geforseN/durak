import { defineStore } from "pinia";
import { reactive } from "vue";
import { v4 as uuidV4 } from "uuid";

export type NotificationAlert = {
  id: string;
  message: string;
  type: "Error" | "Warning" | "Success";
  durationInMS: number;
  header?: string;
};

export const defaultNotification: NotificationAlert = {
  durationInMS: 5_000,
  message: "Произошла ошибка",
  id: uuidV4(),
  type: "Warning",
};

export const useNotificationStore = defineStore("alerts", () => {
  const notificationQueue: NotificationAlert[] = reactive([]);

  const removeNotification = (id: NotificationAlert["id"]) => {
    const notificationIndexToRemove = notificationQueue.findIndex(
      (notification) => notification.id === id,
    );
    notificationQueue.splice(notificationIndexToRemove, 1);
  };

  const addNotificationInQueue = (
    newNotification: Partial<NotificationAlert> = {},
  ) => {
    console.trace(newNotification);
    const notification: NotificationAlert = {
      ...defaultNotification,
      ...newNotification,
    };
    notificationQueue.push(notification);
    setTimeout(removeNotification, notification.durationInMS, notification.id);
  };

  return {
    notificationQueue,
    removeNotification,
    addNotificationInQueue,
  };
});
