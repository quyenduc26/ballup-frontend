import api from "@/config/api";

const notificationApi = {
  getUserNotification: ( userId: number) => api.get(`/notify/${userId}`),
  markAsRead: ( notiIdList: number[]) => api.patch(`/notify/read`, notiIdList),
  markPaymentReqAsRead: ( notiIdList: number[]) => api.patch(`/notify/read/booking-deposited`, notiIdList),
  markBookingReqAsRead: ( notiIdList: number[]) => api.patch(`/notify/read/booking-requested`, notiIdList),
};
export default notificationApi;
