export type ToastType = {
  heading?: string;
  message?: string;
  type?: "error" | "success" | "info" | "warn";
  duration?: number;
};
export interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
}

export type ConvertedBlockedSlot = {
  username: string;
  fromTime: string;
  toTime: string;
  duration: number;
  createdBy: string;
};
