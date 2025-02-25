
"use client";
import FieldInfor from "@/components/FieldInfor";
import FieldSchedule from "@/components/FieldSchedule";
import PlayingCenter from '@/components/PlayingCenter'
import PlayingSlot from '@/components/PlayingSlot'


import React from 'react'
export default function page() {
  return (
    <div>
    
      <PlayingSlot></PlayingSlot>
      <PlayingCenter></PlayingCenter>
      <FieldInfor/>
      <FieldSchedule/>
    </div>
  )
}

