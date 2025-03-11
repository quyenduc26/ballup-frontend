import api from "@/config/api";
import { CreateMatchType, PlayingCenterType } from "@/types";

const matchApi = {
  createMatch: (formData: CreateMatchType) =>
    api.post("/game/create", formData),
  getPlayingCenter: (formData: PlayingCenterType) =>
    api.get("/center", { params: formData }),
  getPlayingSlot: (id: number) => api.get(`/center/${id}/slot`),
  checkSlotAvailability: (slotId: number, fromTime: number, toTime: number) =>
    api.get(`/unavailable-slot/check/${slotId}`, {
      params: { fromTime, toTime },
    }),
  getAllUsers: (userId: number, sport: "FOOTBALL" | "BADMINTON" = "FOOTBALL") =>
    api.get(`/team-member/${userId}`, { params: { sport } }),

  getOverview: (userId: number, sport: "FOOTBALL" | "BADMINTON" = "FOOTBALL") =>
    api.get(`/team-member/${userId}/team`, { params: { sport } }),
};

export default matchApi;
