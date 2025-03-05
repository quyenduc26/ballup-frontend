export type BookingField = {
  id: string;
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
  id: string;
  playingSlot: string;
  creator: string;
  amount: number;
  fromTime: string;
  toTime: string;
  createdAt: string;
};
