import api from "@/config/api";
import { CreateMatchType } from "@/types";

const matchApi = {
  createTeam: (formData:CreateMatchType ) => api.post("/game/create", formData),   
  getplayingCenter: (id: number) => api.get(`/center/${id}`), 
};

export default matchApi;
