import api from "@/config/api";
import { PlayingCenterType, PlayingSlotType } from "@/types/form";

const playingApi = {
  createCreatePlayingCenter: (formData: PlayingCenterType) =>
    api.post("/owner/center", formData),
  createPlayingSlot: (formData: PlayingSlotType) =>
    api.post("/owner/slot", formData),
  getAllCenter: (params?: Record<string, string>) =>
    api.get("/center", { params }),
  getCenterInfor: (id: number) => api.get(`/center/${id}`),
};

export default playingApi;
