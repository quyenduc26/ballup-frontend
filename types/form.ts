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
export type ScheduleType = {
  date: string; 
  bookingTime: string; 
  returnTime: string; 
  location?: string; 
};