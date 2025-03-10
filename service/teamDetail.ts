import api from "@/config/api";
import { KickMemberType } from "@/types";

const TeamDetailApi = {
  kickMember: (memberId: number, kickData: KickMemberType) =>api.delete(`/team-member/${memberId}/kick`, { data: kickData }),

  deleteTeam: (teamId: number, userId: number) =>api.delete(`/team/${teamId}?userId=${userId}`),

  getTeamDetail: (teamId: number, userId: number) =>api.get(`/team/${teamId}/user/${userId}`),

  leaveTeam: (teamId: number, memberId: number) =>api.delete(`/team/${teamId}/leave?memberId=${memberId}`),
  
};

export default TeamDetailApi;
