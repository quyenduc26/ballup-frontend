"use client";

import { Alert } from "@heroui/react";

import { NotificationType } from "@/types/common";
import { getNotificationData } from "@/utils/getNotificationType";

export default function NotificationItem({
  notification,
  onClickDetail,
}: {
  notification: NotificationType;
  onClickDetail: () => void;
}) {
  const { color, title, message } = getNotificationData(notification.type);

  return (
    <div className="my-2">
      <Alert
        className=" rounded-md hover:border-1 hover:-translate-y-1 hover:shadow-lg hover:scale-[1.01] hover:border-opacity-100 hover:bg-opacity-95 transition-all duration-200 ease-out cursor-pointer"
        color={color}
        description={message}
        // endContent={
        //   <Button
        //     color={color}
        //     size="sm"
        //     variant="solid"
        //     onPress={onClickDetail}
        //   >
        //     View detail
        //   </Button>
        // }
        title={title}
        variant={notification.read ? "flat" : "bordered"}
      />
    </div>
  );
}
