import api from "@/config/api";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    };
};

const bookingRequestApi = {
    getBookings: (id: number) => api.get(`/owner/booking/requests/${id}`, getAuthHeaders()),
    confirmBooking: (id: number) => api.patch(`/owner/booking/${id}/confirm`, {}, getAuthHeaders()),
    rejectBooking: (id: number) => api.patch(`/owner/booking/${id}/reject`, {}, getAuthHeaders()),
};

export default bookingRequestApi;
