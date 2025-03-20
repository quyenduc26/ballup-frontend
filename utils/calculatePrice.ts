export function calculatePrice(
  slots: any[],
  fromTime: string | null,
  toTime: string | null
) {
  if (!fromTime || !toTime)
    return {
      price: 0,
      totalPrice: 0,
      hours: 0,
      amount: 0,
      dayHours: 0,
      nightHours: 0,
    };

  const from = new Date(Number(fromTime));
  const to = new Date(Number(toTime));

  let current = new Date(from);
  let dayHours = 0;
  let nightHours = 0;

  while (current < to) {
    const nextHour = new Date(current);
    nextHour.setHours(current.getHours() + 1);

    if (current.getHours() >= 8 && current.getHours() < 18) {
      dayHours += Math.min((to.getTime() - current.getTime()) / 3600000, 1);
    } else {
      nightHours += Math.min((to.getTime() - current.getTime()) / 3600000, 1);
    }

    current = nextHour;
  }

  const totalHours = dayHours + nightHours;

  // Lấy giá của khung giờ ngày và đêm
  const dayPrices = slots.map((slot) => slot.primaryPrice);
  const nightPrices = slots.map((slot) => slot.nightPrice);

  const minDayPrice = Math.min(...dayPrices);
  const maxDayPrice = Math.max(...dayPrices);
  const minNightPrice = Math.min(...nightPrices);
  const maxNightPrice = Math.max(...nightPrices);

  const minTotal = minDayPrice * dayHours + minNightPrice * nightHours;
  const maxTotal = maxDayPrice * dayHours + maxNightPrice * nightHours;

  return {
    price:
      minDayPrice === maxDayPrice && minNightPrice === maxNightPrice
        ? minDayPrice
        : { min: minDayPrice, max: maxNightPrice },
    totalPrice:
      minTotal === maxTotal ? minTotal : { min: minTotal, max: maxTotal },
    hours: totalHours,
    amount: maxTotal, // Chọn mức cao nhất làm tổng tiền cuối cùng
    dayHours,
    nightHours,
  };
}
