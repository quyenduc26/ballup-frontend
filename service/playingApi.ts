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

  getBlockedSlot: (slotId: number, startOfDay: number, endOfDay: number) =>
    api.get(
      `/unavailable-slot/${slotId}/blocked?startOfDay=${startOfDay}&endOfDay=${endOfDay}`,
    ),
  updatePlayingSlot: (formData: PlayingSlotType) => {
    const slotId = formData.playingSlot?.id ?? 0;

    return api.patch(`/owner/slot/update/${slotId}`, formData);
  },
};

export default playingApi;
