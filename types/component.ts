export type PropComponent = {
  text: string;
};

export type Slot = {
  id: number;
  name: string;
  primaryPrice: number;
  nightPrice: number;
};

export type CenterInfo = {
  id: number;
  name: string;
  description: string;
  address: string;
  imageUrls: string[];
  slots: Slot[];
};


export interface Field {
  id: string;
  name: string;
  address: string;
  description: string;
  imageUrls: string[];
  slots: Slot[];
}

