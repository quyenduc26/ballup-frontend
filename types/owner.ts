export type BookingField = {
  id: number;
  slotId: string;
  creator: string;
  fromTime: string;
  toTime: string;
  createdAt: string;
};

export type Field = {
  id: string;
  name: string;
  location: string;
  price?: string;
  hasSubFields?: boolean;
  subFields?: {
    id: string;
    name: string;
    price: string;
  }[];
};

export type SubPayment = {
  id: string;
  name: string;
  date: string;
  time: string;
  amount: number;
};

export type PaymentRequest = {
  id: number;
  playingSlot: string;
  creator: string;
  amount: number;
  fromTime: string;
  toTime: string;
  createdAt: string;
};

// Define types for payment methods
export interface PaymentMethod {
  id: string;
  name: string;
  active: boolean;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  bankBranch?: string;
  qrImageUrl: string;
  instructions?: string;
}
