"use client";
import Schedule from '@/components/booking/Schedule'; 
import CardList from "@/components/center/CardList";
import PlayingCenter from '@/components/center/PlayingCenter'
import PlayingSlot from '@/components/center/PlayingSlot'

import React from 'react'

export default function page() {
  return (
    <div>

      <CardList/>
      {/* <Schedule />
      <PlayingSlot></PlayingSlot>
      <PlayingCenter></PlayingCenter> */}
    </div>
  )
}

