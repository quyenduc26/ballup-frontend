import api from "@/config/api";

const bookingRequestApi = {
    getBookings: () => api.get("/booking/requests"),
    confirmBooking: (id :number ) => api.patch(`/booking/${id}/confirm`),
    rejectBooking: (id :number ) => api.patch(`/booking/${id}/reject`),
};

export default bookingRequestApi;
