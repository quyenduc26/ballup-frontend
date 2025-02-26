import api from '@/config/api';
import { CreateTeamData } from '@/types/form';

const playingApi = {
  createTeam: (formData: CreateTeamData) => api.post('/', formData ), 

};
    
export default playingApi;
  