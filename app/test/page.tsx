"use client";
import Schedule from '@/components/booking/Schedule'; 
import CardList from "@/components/CardList";
import PlayingCenter from '@/components/PlayingCenter'
import PlayingSlot from '@/components/PlayingSlot'

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

