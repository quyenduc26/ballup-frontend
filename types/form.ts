
export type RegisterFormType = {
  username: string;
  email: string;
  password: string;
  role: string;
};  
export type LoginFormType = {
  emailOrUsername: string;
  password: string;
};
  export type FieldDetailType = {
    name: string;
    address: string;
    description: string;
    imagesUrls:string[];  
    bookingTime: string;
    returnTime: string;
    type: string;
    price: string;
    hours: number;
    total: string;
    mapUrl: string;
    slots: [];
  };

  export type CardFieldType = {
    id: number;
    name: string;
    address: string;
    type: PlayingCenterType;
    bookingCount: number;
    image: string;
    primaryPrice: number;
    nightPrice: number;
  };

export type ScheduleType = {
  date: string; 
  fromTime: string; 
  toTime: string; 
  location?: string; 
};
export type PlayingCenterType =  {
  name: string;
  address: string;
  description: string;
  images: string[];
  ownerId: number;
};
export type PlayingSlotType =  {
  name: string;
  primaryPrice:number;
  nightPrice:number ;
  playingCenterId :number ;
};
export type CreateTeamData = {
  name: string;
  address: string;
  intro: string;
  logo: string ; 
  cover:string ; 
  sport?: string;
  userId: number; 
};  

