import api from '@/config/api'
import { RegisterFormType } from '@/types/form'
const authApi = {
  signUp: (formData: RegisterFormType) => api.post('/auth/register', formData ),

};

export default authApi;
