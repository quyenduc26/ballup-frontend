"use client"

import { useEffect, useState } from "react"
import matchApi from "@/service/matchApi"
import type { GameResponse } from "@/types"
import MatchCard from "./CardMatch"

export default function ListMatchCard() {
  const [matches, setMatches] = useState<GameResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        const response = await matchApi.getAllMatch()
        setMatches(response.data)
        console.log("Matches loaded:", response.data)
      } catch (err) {
        setError("Failed to load matches")
        console.error("Error fetching matches:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  if (loading) return (
    <div className="flex justify-center items-center py-10">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  )
  
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  
  if (matches.length === 0) return <div className="text-center py-10 text-gray-500">No matches available</div>

  return (
    <div className="container mx-auto px-2 sm:px-4 mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-10 ">
        {matches.map((match, index) => (
          <div key={match.id || index} className="w-full">
            <MatchCard match={match} />
          </div>
        ))}
      </div>
    </div>
  )
}