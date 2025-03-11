"use client"

import React from 'react'
import CardMyMatch from './myMatch'

export default function ListMyMatch() {
  const matches = [1, 2, 3, 4]

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">MY MATCHS</h1>
      
      {/* Grid layout with exactly 2 cards per row on web screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-8xl mx-auto">
        {matches.map((match, index) => (
          <div className="w-full">
            <CardMyMatch key={index} />
          </div>
        ))}
      </div>
    </div>
  )
}