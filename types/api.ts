export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export enum BookingStatus {
  REJECTED = "REJECTED",
  DEPOSITED = "DEPOSITED",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  REQUESTED = "REQUESTED",
}

export type BookingDetailResponse = {
  bookingId: number;
  user: string;
  centerName: string;
  centerAddress: string;
  slotName: string;
  amount: number;
  status: BookingStatus;
  bookingTime: string;
  fromTime: string;
  toTime: string;
};

export type BlockedSlot = {
  id: number;
  fromTime: string;
  toTime: string;
  createBy: string;
  creatorName: string;
};

export type Error = {
  message: string;
};

export type CompletedBookingResponse = {
  id: number;
  slotId: number;
  creator: string;
  centerName: string;
  fromTime: string; // ISO string format
  toTime: string; // ISO string format
  amount: number;
  createdAt: string; // ISO string format
};
