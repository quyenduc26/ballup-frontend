import api from "@/config/api";
import { LoginFormType, RegisterFormType } from "@/types/form";

const authApi = {
  signUp: (formData: RegisterFormType) => api.post("/auth/register", formData),

  login: (formData: LoginFormType) => api.post("/auth/login", formData),

  loginWithGoogle: () => api.get("/auth/google"),
  
  logout : () => api.post("/auth/logout"),
};

export default authApi;
