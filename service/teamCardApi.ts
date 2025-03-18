import api from "@/config/api";
import { user } from "@heroui/react";

const TeamApi = {
  getAllTeams: (params: any) => api.get(`/team`, { params }),

  joinTeam: (user_id: number, team_id: number) =>
    api.post(`/team/join?userId=${user_id}&teamId=${team_id}`),

  getTeamDetail: (team_id: number, user_id: number) =>
    api.get(`/team/${team_id}/user/${user_id}`),

  getMyTeams: (userId: number) => api.get(`/team/my-teams?userId=${userId}`,),

};

export default TeamApi;
