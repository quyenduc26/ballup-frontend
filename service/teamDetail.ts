import api from "@/config/api";
import { KickMemberType } from "@/types";

const TeamDetailApi = {
    kickMember: (memberId: number, kickData: KickMemberType) =>
        api.delete(`/team-member/${memberId}/kick`, { data: kickData }),

    deleteTeam: (teamId: number, userId: number) =>
        api.delete(`/team/${teamId}?userId=${userId}`), 
};



export default TeamDetailApi;
