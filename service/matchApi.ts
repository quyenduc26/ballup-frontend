  import api from "@/config/api";
  import { CreateMatchType,PlayingCenterType } from "@/types";

  const matchApi = {
    createTeam: (formData:CreateMatchType ) => api.post("/game/create", formData),   
    getPlayingCenter: (formData: PlayingCenterType) => api.get("/center", { params: formData }),
    getPlayingSlot: (id:number) => api.get(`/center/${id}/slot`),

  };

  export default matchApi;
