import { NotificationContentType, NOTIFICATIONS } from "@/constant";

export function getNotificationData(type: NotificationContentType) {
  return (
    NOTIFICATIONS[type] || {
      title: "Notification",
      message: "You have a new notification.",
      color: "primary",
    }
  );
}
