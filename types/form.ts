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

export type CardFieldType = {
  name: string;
  address: string;
  price: number;
  imageUrl: string;
};