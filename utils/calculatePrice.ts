export function calculatePrice(
  slots: any[],
  fromTime: string | null,
  toTime: string | null,
) {
  if (!fromTime || !toTime)
    return { price: 0, totalPrice: 0, hours: 0, amount: 0 };

  const from = new Date(Number(fromTime));
  const to = new Date(Number(toTime));

  // Tính số giờ
  const hours = (to.getTime() - from.getTime()) / (1000 * 3600);

  // Xác định giá theo khung giờ (ngày hoặc đêm)
  const isDaytime = from.getHours() >= 8 && from.getHours() < 18;
  const priceList = slots.map((slot) =>
    isDaytime ? slot.primaryPrice : slot.nightPrice,
  );

  // Tìm giá nhỏ nhất và lớn nhất
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  // Tính tổng tiền
  const minTotal = minPrice * hours;
  const maxTotal = maxPrice * hours;

  return {
    price: minPrice === maxPrice ? minPrice : { min: minPrice, max: maxPrice },
    totalPrice:
      minPrice === maxPrice ? minTotal : { min: minTotal, max: maxTotal },
    hours,
    amount: maxTotal, // Chọn mức cao nhất làm amount cuối cùng
  };
}
