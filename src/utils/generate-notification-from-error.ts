import type { Notification } from "@/stores/notification.store";
import { v4 as uuidv4 } from 'uuid';

export default function generateNotificationFromError(
  error: Error,
  notification?: Notification,
): Notification {
  return {
    message: error.message,
    durationInMS: notification?.durationInMS || 5_000,
    type: notification?.type || "Error",
    id: notification?.id || uuidv4(),
  };
}
