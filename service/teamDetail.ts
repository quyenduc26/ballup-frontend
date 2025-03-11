import api from "@/config/api";
import { KickMemberType } from "@/types";

const TeamDetailApi = {
  kickMember: (memberId: number, kickData: KickMemberType) => api.delete(`/team-member/${memberId}/kick`, { data: kickData }),
  deleteTeam: (teamId: number, userId: number) => api.delete(`/team/${teamId}?userId=${userId}`),
  getTeamDetail: (teamId: number, userId: number ) => api.get(`/team/${teamId}/user/${userId}`),
  updateTeam: (teamId: number, formData: object) => api.patch(`/team/${teamId}`, formData),
};

export default TeamDetailApi;
