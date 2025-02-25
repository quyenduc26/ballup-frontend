import Schedule from '@/components/Schedule'; 
import PlayingCenter from '@/components/PlayingCenter'
import PlayingSlot from '@/components/PlayingSlot'

import React from 'react'

export default function page() {
  return (
    <div>
      <Schedule />
      <PlayingSlot></PlayingSlot>
      <PlayingCenter></PlayingCenter>

    </div>
  )
}
