
"use client";
import ListCard from "@/components/center/CardList";
import FieldInfor from "@/components/center/FieldInfor";
import FieldSchedule from "@/components/center/FieldSchedule";
import {PlayingCenter} from '@/components/center/PlayingCenter'
import PlayingSlot from '@/components/center/PlayingSlot'


import React from 'react'
export default function page() {
  return (
    <div>
    
      {/* <PlayingSlot></PlayingSlot> */}
      {/* <PlayingCenter/> */}
      {/* <ListCard/> */}
      <FieldInfor/>
      <FieldSchedule/>
    </div>
  )
}

