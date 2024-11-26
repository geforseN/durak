import { defineStore } from "pinia";
import { reactive } from "vue";
import { v4 as uuidV4 } from "uuid";
import type { NotificationAlert as TNotificationAlert } from "@durak-game/durak-dts";

export const defaultNotification: NotificationAlert = {
  durationInMS: 5_000,
  message: "Произошла ошибка",
  id: uuidV4(),
  type: "Warning",
};

export class NotificationAlert {
  id: string;
  message: string;
  type: "Error" | "Warning" | "Success";
  durationInMS: number;

  constructor(data: Partial<TNotificationAlert> = {}) {
    data.durationInMS ??= 5_000;
    data.message ??= "Произошла ошибка";
    data.id ??= uuidV4();
    data.type ??= "Warning";
    this.id = data.id;
    this.message = data.message;
    this.type = data.type;
    this.durationInMS = data.durationInMS;
  }
}

export const useNotificationStore = defineStore("alerts", () => {
  const notificationQueue: NotificationAlert[] = reactive([]);

  const removeNotification = (id: NotificationAlert["id"]) => {
    const notificationIndexToRemove = notificationQueue.findIndex(
      (notification) => notification.id === id,
    );
    notificationQueue.splice(notificationIndexToRemove, 1);
  };

  const addNotificationInQueue = (
    newNotificationData: Partial<NotificationAlert> = {},
  ) => {
    console.trace(newNotificationData);
    const notification = new NotificationAlert(newNotificationData)
    notificationQueue.push(notification);
    setTimeout(removeNotification, notification.durationInMS, notification.id);
  };

  return {
    notificationQueue,
    removeNotification,
    addNotificationInQueue,
  };
});
