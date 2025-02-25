import api from "@/config/api";

const bookingRequestApi = {
    getBookings: () => api.get("/booking/requests"),
    confirmBooking: (id) => api.patch(`/booking/${id}/confirm`),
    rejectBooking: (id) => api.patch(`/booking/${id}/reject`),
};

export default bookingRequestApi;
