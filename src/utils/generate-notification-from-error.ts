import { defaultNotification, type NotificationAlert } from "@/stores/notification.store";


export default function generateNotificationFromError(
  error: Error,
  notification: Partial<NotificationAlert> = {},
): NotificationAlert {
  const { message, durationInMS, type, id } = {
    ...defaultNotification,
    ...notification,
  };
  return {
    message: error.message || message,
    durationInMS,
    type,
    id,
  };
}
