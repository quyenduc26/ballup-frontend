"use client"

import { getImageUrl } from "@/utils/getImage"
import { formatTimestamp } from "@/utils/formatTimestamp"
import type { GameResponse } from "@/types"

interface MatchCardProps {
  match: GameResponse
}

export default function MatchCard({ match }: MatchCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 h-full transition transform hover:scale-105">
      {/* Cover Image */}
      <div className="relative">
        <img
          alt="Match Cover"
          className="w-full h-28 sm:h-36 object-cover border-b border-gray-300"
          src={getImageUrl(match.cover) || "/placeholder.svg"}
        />
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
          {match.type}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-4 pt-12 sm:pt-16 relative">
        {/* Team Logos (overlapping with cover) */}
        <div className="absolute left-0 right-0 sm:-top-12 flex justify-between px-4 sm:px-8">
          {/* Team A Logo */}
          <div className="w-20 h-20 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
            <img
              alt={match.teamA?.name || "Team A"}
              className="w-full h-full object-cover"
              src={getImageUrl(match.teamA?.logo) || "/placeholder.svg"}
            />
          </div>

          {/* Team B Logo */}
          <div className="w-20 h-20 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
            <img
              alt="Team B"
              className="w-full h-full object-cover"
              src="/mancity.png" // Update when you have opponent team data
            />
          </div>
        </div>

        {/* Teams and VS Section */}
        <div className="grid grid-cols-3 gap-2 items-start ">
          {/* Team A */}
          <div className="flex flex-col items-center mt-20">
            <h2 className="text-sm sm:text-lg font-bold text-center">{match.teamA?.name || "TEAM A"}</h2>
            <ul className="text-xs text-gray-600 space-y-1 mt-1 w-full max-w-[100px] mx-auto">
              {match.teamA?.members && match.teamA.members.length > 0 ? (
                match.teamA.members.slice(0, 3).map((member, index) => (
                  <li key={index} className="flex items-center justify-center gap-1">
                    <img
                      src={getImageUrl(member.avatar) || "/default-avatar.png"}
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-5 h-5 rounded-full"
                    />
                    <span className="truncate text-xs">
                      {member.lastName}{member.firstName }
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-center text-xs">No team</li>
              )}
            </ul>
          </div>

          {/* VS */}
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center">
              <img alt="VS" className="w-12 h-12 sm:w-16 sm:h-16" src="/images/VS.png" />
            </div>
            <div className="text-center mt-1">
              <p className="text-xs font-bold">
                {formatTimestamp(match.fromTime)}
              </p>
              <p className="text-xs sm:text-xl mt-4 text-gray-700 truncate max-w-[100px]">
                {match.centerName || match.slotName}
              </p>
            </div>
          </div>

          {/* Team B */}
          <div className="flex flex-col items-center mt-20">
            <h2 className="text-sm sm:text-base font-bold text-center">TEAM B</h2>
            <ul className="text-xs text-gray-600 space-y-1 mt-1 w-full max-w-[100px] mx-auto">
              {[1, 2, 3].map((player) => (
                <li key={player} className="flex items-center justify-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs">👤</div>
                  <span className="text-xs">Player {player}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-10">
          <button className="border-2 border-black py-3 text-sm font-bold text-black rounded hover:bg-gray-100 transition-colors">
            JOIN TEAM
          </button>
          <button className="bg-black text-white py-3 text-sm font-bold rounded hover:bg-gray-800 transition-colors">
            JOIN SINGLE
          </button>
        </div>
      </div>
    </div>
  )
}