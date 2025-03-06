import api from "@/config/api";
import { BookingDataType } from "@/types/form";

const bookingRequestApi = {
  getBookings: (id: number) => api.get(`/owner/booking/requests/${id}`),
  confirmBooking: (id: number) => api.patch(`/owner/booking/${id}/confirm`),
  rejectBooking: (id: number) => api.patch(`/owner/booking/${id}/reject`),
  booking: (bookingData: BookingDataType) => api.post(`/slot/takeSlot`, bookingData),
};

export default bookingRequestApi;
