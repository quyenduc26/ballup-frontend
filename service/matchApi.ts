import api from "@/config/api";
import { CreateMatchType, PlayingCenterType } from "@/types";

const matchApi = {
  createMatch: (formData: CreateMatchType) =>
    api.post("/game/create", formData),
  getPlayingCenterBySport: ( sportType: string) =>
    api.get(`/center?sport=${sportType}`),
  getPlayingSlot: (id: number) => api.get(`/center/${id}/slot`),
  checkSlotAvailability: (slotId: number, fromTime: number, toTime: number) =>
    api.get(`/unavailable-slot/check/${slotId}`, {
      params: { fromTime, toTime },
    }),
  getAllUsers: (userId: number, sport: "FOOTBALL" | "BADMINTON" = "FOOTBALL") =>
    api.get(`/team-member/${userId}`, { params: { sport } }),

  getOverview: (userId: number, sport: "FOOTBALL" | "BADMINTON" = "FOOTBALL") =>
    api.get(`/team-member/${userId}/team`, { params: { sport } }),

  getUserMatch: (userId: number) => api.get(`/game/user/${userId}`),
  getAllMatch: () => api.get("/game"),
  updateMatchInfo: (formData: object) =>
    api.patch("game/update/info", formData),
  updateMatchTime: (formData: object) =>
    api.patch("game/update/time-slot", formData),
  joinGame: (gameId: number, userId: number) =>
    api.post(`/game/${gameId}/join`, null, { params: { userId } }),
  joinGameAsTeam: (gameId: number, userId: number) =>
    api.post(`/game/${gameId}/join-team`, null, { params: { userId } }),
  cancelGame: (gameId: number, userId: number) =>
    api.delete(`/game/${gameId}/cancel-game`, { params: { userId } }),
  leaveGame: (gameId: number, userId: number) =>
    api.patch(`/game/${gameId}/leave?userId=${userId}`),
};

export default matchApi;
