import React from "react";

import Schedule from "@/components/booking/Schedule";
import SearchBooking from "@/components/booking/SearchBooking";
import Banner from "@/components/Banner";
import CardList from "@/components/center/CardList";

export default function Booking() {
  return (
    <div>
      <div className="text-4xl md:text-6xl ml-8 font-extrabold text-center md:text-left mb-5 text-transparent bg-clip-text">
        BOOKING
      </div>
      <Banner />
      <Schedule />
      <SearchBooking />
      <CardList />
    </div>
  );
}
