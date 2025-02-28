import Schedule from '@/components/booking/Schedule';   
import SearchBooking from "@/components/booking/SearchBooking"
import Banner from "@/components/Banner"

import React from 'react'

export default function Booking() {
  return (
    <div> 
        <Banner/>  
        <Schedule />
        <SearchBooking/>
      
    </div>
  )
}
