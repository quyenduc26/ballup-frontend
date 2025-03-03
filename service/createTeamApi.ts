import api from '@/config/api';
import { CreateTeamData } from '@/types';

const createTeamApi = {
  createTeam: (formData: CreateTeamData ) => api.post('/team/create', formData),
};

export default createTeamApi;