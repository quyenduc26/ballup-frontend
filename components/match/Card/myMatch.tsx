"use client"

import React from 'react'
import { MyGameResponse } from '@/types'
import { getImageUrl } from '@/utils/getImage';

interface CardMyMatchProps {
  match: MyGameResponse
}

export default function CardMyMatch({ match }: CardMyMatchProps) {
  console.log('Match data received:', match); // Debug: Check what data is being received

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105 border border-gray-200 w-full mx-auto my-4">
      {/* Cover image section */}
      <div className="relative">
        <img
          alt="Cover"
          className="w-full h-16 sm:h-20 md:h-36 object-cover border-b border-gray-300"
          src={getImageUrl(match.cover)}
        />
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs sm:text-sm font-bold rounded">
          {match.type || "Unknown"}
        </div>
      </div>

      {/* Teams Section */}
      <div className="p-2 sm:p-4">
        <div className="flex items-center justify-between">
          {/* Team A */}
          <div className="text-center w-1/3">
            <div className="flex justify-center">
              <img
                alt={match.teamA?.name || "Team A"}
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-44 md:h-44 border border-gray-300 rounded-full object-cover"
                src={getImageUrl(match.teamA?.logo)}
              />
            </div>
            <h2 className="sm:text-lg text-xs font-bold mt-1 sm:mt-2 truncate px-1">{match.teamA?.name || "Team A"}</h2>
          </div>

          {/* Match Info */}
          <div className="text-center w-1/3">
            <div className="bg-gray-100 rounded-full w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center mx-auto mb-1">
              <img
                alt="VS"
                className="w-6 h-6 sm:w-14 sm:h-14"
                src="/images/VS.png"
              />
            </div>
            <p className="text-xs text-gray-500 mt-5 ">{match.fromTime || "Time not set"}</p>
            <p className="text-xs sm:text-sm font-bold">{match.toTime || "Time not set"}</p>
            <p className="sm:text-lg text-xs mt-3 text-gray-500">{match.center || "Location not set"}</p>
          </div>

          {/* Team B */}
          <div className="text-center w-1/3">
            <div className="flex justify-center">
              <img
                alt={match.teamB?.name || "Team B"}
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-44 md:h-44 border border-gray-300 rounded-full object-cover"
                src={getImageUrl(match.teamB?.logo) || "/placeholder.svg?height=100&width=100"}
              />
            </div>
            <h2 className="sm:text-lg text-xs font-bold mt-1 sm:mt-2 truncate px-1">{match.teamB?.name || "Team B"}</h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 sm:gap-2 mt-4 sm:mt-8 md:mt-14 mb-2">
          <button className="border border-gray-300 w-1/3 py-2 sm:py-3 text-xs font-medium text-gray-700 rounded hover:bg-gray-200">
            EDIT
          </button>
          <button
            className="bg-black text-white w-1/3 py-2 sm:py-3 text-xs font-medium rounded hover:bg-gray-800"
            onClick={() => {
              if (match.conversationId) {
                window.location.href = `/conversation/${match.conversationId}`;
              } else {
                console.error('No conversation ID available');
              }
            }}
          >
            MESSAGE
          </button>
          <button className="border border-red-400 text-black w-1/3 py-2 sm:py-3 text-xs font-medium rounded hover:bg-red-500">
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}