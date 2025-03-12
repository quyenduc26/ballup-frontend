"use client"

import { getImageUrl } from "@/utils/getImage"
import { formatTimestamp } from "@/utils/formatTimestamp"
import type { GameResponse } from "@/types"

interface MatchCardProps {
  match: GameResponse
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-4 sm:mt-10 border mb-6 sm:mb-10 border-gray-300 px-2 sm:px-4">
      {/* Cover Image */}
      <div className="relative">
        <img
          alt="Match Cover"
          className="w-full h-36 sm:h-48 md:h-72 object-cover border-b border-gray-300"
          src={getImageUrl(match.cover) || "/placeholder.svg"}
        />
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs sm:text-sm font-bold rounded">
          {match.type}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-4 md:p-6 pt-16 sm:pt-20 md:pt-32 relative">
        {/* Team Logos (overlapping with cover) */}
        <div className="absolute left-0 right-0 -top-14 sm:-top-20 md:-top-28 flex justify-between px-4 sm:px-8 md:px-16 lg:px-24">
          {/* Team A Logo */}
          <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
            <img
              alt={match.teamA?.name || "Team A"}
              className="w-full h-full object-cover"
              src={getImageUrl(match.teamA?.logo) || "/placeholder.svg"}
            />
          </div>

          {/* Team B Logo */}
          <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
            <img
              alt="Team B"
              className="w-full h-full object-cover"
              src="/mancity.png" // Update when you have opponent team data
            />
          </div>
        </div>

        {/* Teams and VS Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-start mt-3 sm:mt-20">
          {/* Team A */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">{match.teamA?.name || "TEAM A"}</h2>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-1 mt-2 sm:mt-3 w-full max-w-[200px] mx-auto">
              {match.teamA?.members && match.teamA.members.length > 0 ? (
                match.teamA.members.map((member, index) => (
                  <li key={index} className="flex items-center justify-center gap-1 sm:gap-2">
                    <img
                      src={getImageUrl(member.avatar) || "/default-avatar.png"}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full"
                    />
                    <span className="truncate">
                      {member.lastName} {member.firstName}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-center">No team members</li>
              )}
            </ul>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center justify-center my-2 sm:my-0">
            <div className="flex justify-center">
              <img alt="VS" className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32" src="/images/VS.png" />
            </div>
            <div className="text-center mt-1 sm:mt-2">
              <p className="text-sm sm:text-base md:text-lg font-bold">
                {formatTimestamp(match.fromTime)} - {formatTimestamp(match.toTime)}
              </p>
              <p className="text-base sm:text-xl md:text-3xl mt-2 sm:mt-2 text-gray-700">
                {match.centerName || match.slotName}
              </p>
            </div>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center">TEAM B</h2>
            <ul className="text-xs sm:text-sm text-gray-600 space-y-1 mt-2 sm:mt-3 w-full max-w-[200px] mx-auto">
              <li className="flex items-center justify-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">👤</div>
                <span>Player 1</span>
              </li>
              <li className="flex items-center justify-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">👤</div>
                <span>Player 2</span>
              </li>
              <li className="flex items-center justify-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">👤</div>
                <span>Player 3</span>
              </li>
              <li className="flex items-center justify-center gap-1 sm:gap-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs">👤</div>
                <span>Player 4</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-8 sm:mt-16 md:mt-20">
          <button className="border-2 border-black py-2 sm:py-3 text-sm sm:text-base font-bold text-black rounded hover:bg-gray-100 transition-colors">
            JOIN AS TEAM
          </button>
          <button className="bg-black text-white py-2 sm:py-3 text-sm sm:text-base font-bold rounded hover:bg-gray-800 transition-colors">
            JOIN AS SINGLE
          </button>
        </div>
      </div>
    </div>
  )
}