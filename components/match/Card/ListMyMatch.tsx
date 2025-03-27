"use client";

import type { MyGameResponse } from "@/types";

import { useEffect, useState } from "react";

import CardMyMatch from "./myMatch";

import matchApi from "@/service/matchApi";

export default function ListMyMatch() {
  const [matches, setMatches] = useState<MyGameResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserMatches = async () => {
    try {
      setLoading(true);
      const data = localStorage.getItem("data");
      const parsedData = data ? JSON.parse(data) : null;
      const userId = parsedData.id;

      const response = await matchApi.getUserMatch(userId);

      setMatches(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching matches:", err);
      setError("Failed to load matches. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center sm:text-left">
        MY MATCHES
      </h1>

      {matches.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No matches found. Create match to enjoy</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {matches.map((match) => (
            <div key={match.id} className="w-full">
              <CardMyMatch match={match} onUpdate={fetchUserMatches} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
