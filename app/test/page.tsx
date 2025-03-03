import Schedule from '@/components/Schedule'; 
import PlayingCenter from '@/components/PlayingCenter'
import PlayingSlot from '@/components/PlayingSlot'
import FormCreateTeam from '@/components/team/FormCreateTeam'




import React from 'react'

export default function page() {
  return (
    <div>
      {/* <PlayingSlot></PlayingSlot>
      <PlayingCenter></PlayingCenter> */}
      <FormCreateTeam/>
      <Schedule />
      <PlayingSlot></PlayingSlot>
      <PlayingCenter></PlayingCenter>
   

    </div>
  )
}