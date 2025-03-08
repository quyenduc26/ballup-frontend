  import api from "@/config/api";
  import { CreateMatchType,PlayingCenterType } from "@/types";

  const matchApi = {
    createTeam: (formData:CreateMatchType ) => api.post("/game/create", formData),   
    getPlayingCenter: (formData: PlayingCenterType) => api.get("/center", { params: formData }),
    getPlayingSlot: (id:number) => api.get(`/center/${id}/slot`),
    checkSlotAvailability: (slotId: number, fromTime: number, toTime: number) => 
      api.get(`/unavailable-slot/check/${slotId}`, { 
        params: { fromTime, toTime } 
      }),

  };

  export default matchApi;
