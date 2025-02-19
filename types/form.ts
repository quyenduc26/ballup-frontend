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
export type CreateStadiumFormType =  {
  name: string;
  address: string;
  description: string;
  image: string | null;
};