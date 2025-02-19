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

export type CardFieldProps = {
  name: string;
  address: string;
  price: string;
  imageUrl: string;
};
