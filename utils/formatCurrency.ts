export const formatCurrency = (amount?: number): string => {
  if (amount === undefined || amount === null) return "0 VND";

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};
