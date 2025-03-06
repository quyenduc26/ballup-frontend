export type Common = {
  text: string;
};


export type ToastType = {
  heading?: string;
  message?: string;
  type?: "error" | "success" | "info" | "warn";
  duration?: number;
};