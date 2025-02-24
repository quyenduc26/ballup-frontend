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
  };
