"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import CardMatch from "@/components/match/Card/CardMatch";
import Banner from "@/components/Banner";
import ListMyMatch from "@/components/match/Card/ListMyMatch";
import ListMatchCard from "@/components/match/Card/ListCardMatch";
import CreateMatch from "@/components/match/CreateMatch";

export default function MatchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get view from URL or default to "explore"
  const viewParam = searchParams.get("view"); // Sửa lỗi ở đây
  const [view, setView] = useState(viewParam || "explore");

  // Update URL when view changes
  const updateView = (newView: string) => {
    setView(newView);
    router.push(`/match?view=${newView}`); // Sửa lỗi ở đây
  };

  // Sync view with URL on initial load and when URL changes
  useEffect(() => {
    if (viewParam && viewParam !== view) {
      setView(viewParam);
    }
  }, [viewParam, view]); // Thêm dependency để tránh lỗi 

  return (
    <div className="container mx-auto max-w-[1500px] p-4">
      <div className="text-4xl mb-5 md:text-6xl ml-8 font-extrabold text-center md:text-left mt-20">
        MATCH
      </div>
      <Banner />
      {/* Links */}
      <div className="flex flex-col md:flex-row mt-10 items-center justify-between md:justify-start gap-4 md:gap-8 p-5 ml-2">
        <div className="flex gap-4">
          <button
            className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${view === "explore" ? "text-blue-500" : "text-black hover:text-blue-500"}`}
            onClick={() => updateView("explore")}
          >
            EXPLORE
          </button>
          <button
            className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${view === "myMatch" ? "text-blue-500" : "text-black hover:text-blue-500"}`}
            onClick={() => updateView("myMatch")}
          >
            MY MATCH
          </button>
        </div>
        <button
          className="flex justify-end items-end text-lg md:text-2xl border border-gray-500 bg-black px-4 md:px-6 py-2 font-medium transition-all text-white"
          onClick={() => updateView("create")}
        >
          +
        </button>
      </div>
      {/* Conditionally render components based on the view state */}
      {view === "create" ? <CreateMatch /> : view === "explore" ? <ListMatchCard /> : <ListMyMatch />}
    </div>
  );
}
