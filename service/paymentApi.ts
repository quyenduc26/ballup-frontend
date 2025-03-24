import api from "@/config/api";
import { PaymentMethodRequest } from "@/types/form";

const paymentApi = {
  createPaymentMethod: (data: PaymentMethodRequest, ownerId: number) =>
    api.post(`/payment-methods?ownerId=${ownerId}`, data),
  getAllPaymentMethods: (ownerId: number) =>
    api.get(`/payment-methods?ownerId=${ownerId}`),
  updatePaymentMethod: (id: number, data: PaymentMethodRequest) =>
    api.patch(`/payment-methods/${id}`, data),
  deletePaymentMethod: (id: number) => api.delete(`/payment-methods/${id}`),
  activeMethod: (id: number) => api.patch(`/payment-methods/${id}/set-active`),
  getOwnerPaymentMethodByBookingId: (bookingId: number) =>
    api.get(`/payment-methods/active/by-booking?bookingId=${bookingId}`),
};

export default paymentApi;
