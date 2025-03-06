export function calculatePrice(slots: any[], fromTime: string | null, toTime: string | null) {
    if (!fromTime || !toTime) return { price: "N/A", hours: 0 };
  
    const from = new Date(Number(fromTime));
    const to = new Date(Number(toTime));
  
    // Check if booking is during daytime (8 AM - 6 PM) or nighttime (6 PM - 8 AM)
    const isDaytime = from.getHours() >= 8 && from.getHours() < 18;
  
    // Filter the slots based on time of day
    const priceList = slots.map((slot) => {
      if (isDaytime) {
        return slot.primaryPrice; // Morning price
      } else {
        return slot.nightPrice; // Night price
      }
    });
  
    // Find the min and max price based on the time of day
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);
  
    // Return formatted price
    const hours = (to.getTime() - from.getTime()) / (1000 * 3600); 
    const price = minPrice == maxPrice ? `${minPrice.toLocaleString()} vnd` : `${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()} vnd` ;
    const totalPrice = minPrice == maxPrice ? `${(minPrice*hours).toLocaleString()} vnd` : `${(minPrice*hours).toLocaleString()} - ${(maxPrice*hours).toLocaleString()} vnd`;
  
    return { price, totalPrice, hours };
  };