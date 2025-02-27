import api from '@/config/api';

const createTeamApi = {
  createTeam: (formData: FormData, token: string) => 
    api.post('/team/create', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }),
};

export default createTeamApi;