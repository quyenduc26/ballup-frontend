"use client";

import React, { useState } from "react";
import Link from "next/link";

import CardMatch from "@/components/match/CardMatch";
import Banner from "@/components/Banner";
import SearchMatch from "@/components/match/SearchMatch";

export default function Booking() {
  const [showExplore, setShowExplore] = useState(true);

  return (
    <div className="container mx-auto max-w-[1500px] p-4">
      <div className="text-4xl mb-5 md:text-6xl ml-8 font-extrabold text-center md:text-left  mt-20">
        MATCH
      </div>
      <Banner />
      {/* Links */}
      <div className="flex flex-col md:flex-row mt-10 items-center justify-between md:justify-start gap-4 md:gap-8 p-5 ml-2">
        <div className="flex gap-4">
          <button
            className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${showExplore ? "text-blue-500" : "text-black hover:text-blue-500"}`}
            onClick={() => setShowExplore(true)}
          >
            EXPLORE
          </button>
          <button
            className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${!showExplore ? "text-blue-500" : "text-black hover:text-blue-500"}`}
            onClick={() => setShowExplore(false)}
          >
            MY MATCH
          </button>
        </div>

        <Link passHref href="/match/createMatch">
          <button className="ml-auto flex justify-end items-end text-lg md:text-2xl border border-gray-500 bg-black px-4 md:px-6 py-2 font-medium transition-all text-white">
            +
          </button>
        </Link>
      </div>

      {/* Components */}
      <SearchMatch />
      <CardMatch />

      {/* Điều kiện hiển thị nội dung */}
      {/* {showExplore ? <div>Danh sách đội bóng (ListTeamCard)</div> : <div>Giới thiệu đội bóng (TeamIntro)</div>} */}
    </div>
  );
}
