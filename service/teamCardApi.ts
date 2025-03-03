import api from "@/config/api";

const teamApi = {
    getAllTeams: (params: any) => api.get(`/team`, { params }),
};

export default teamApi;
