import type { NotificationAlert } from "@/stores/notification.store";
import { v4 as uuidV4 } from 'uuid';

export default function generateNotificationFromError(
  error: Error,
  notification?: NotificationAlert,
): NotificationAlert {
  return {
    message: error.message,
    durationInMS: notification?.durationInMS || 5_000,
    type: notification?.type || "Error",
    id: notification?.id || uuidV4(),
  };
}
