import type { Notification } from "@/stores/notification.store";

export default function generateNotificationFromError(
  error: Error,
  notification?: Notification,
) {
  return {
    message: error.message,
    duration: notification?.duration || 10_000,
    type: notification?.type || "Warning",
    id: notification?.duration || new Date().valueOf(),
  };
}
