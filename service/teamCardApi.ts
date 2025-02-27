import api from "@/config/api";


const joinTeamApi = {
    getJoinTeam: () => api.post(`/team/join`),
};

export default joinTeamApi;