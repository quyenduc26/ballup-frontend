import Schedule from '@/components/booking/Schedule';   
import SearchBooking from "@/components/booking/SearchBooking"
import Banner from "@/components/Banner"
import React from 'react'
import CardList from '@/components/CardList';

export default function Booking() {
  return (
    <div> 
      <div className="text-4xl md:text-6xl ml-8 font-extrabold text-black  text-center md:text-left">
        BOOKING
      </div>
        <Banner/>  
        <Schedule />
        <SearchBooking/>
        <CardList/>
      
    </div>
  )
}
