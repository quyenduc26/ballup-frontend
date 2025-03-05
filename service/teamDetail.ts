import api from "@/config/api";
import { KickMemberType } from "@/types";

const TeamDetailApi = {
    kickMember: (memberId: number, kickData: KickMemberType) =>
        api.delete(`/team-member/${memberId}/kick`, { data: kickData }),
};


export default TeamDetailApi;
