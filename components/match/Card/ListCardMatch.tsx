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

  if (loading) return <div className="text-center py-10">Loading...</div>
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>
  if (matches.length === 0) return <div className="text-center py-10">No matches available</div>

  return (
    <div className="space-y-8 my-6">
      {matches.map((match, index) => (
        <MatchCard key={match.id || index} match={match} />
      ))}
    </div>
  )
}