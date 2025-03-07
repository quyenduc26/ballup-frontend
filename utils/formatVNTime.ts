import { DateValue } from "@heroui/react";
import { getLocalTimeZone } from "@internationalized/date";

export const formatDateTime = (
  value: DateValue | null | undefined,
  ignoreTime: boolean = false,
): string => {
  if (!value) return "--";

  const date = value.toDate(getLocalTimeZone());

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    hour: ignoreTime ? undefined : "2-digit",
    minute: ignoreTime ? undefined : "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};
