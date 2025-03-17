"use client";

import { useState } from "react";

import SearchBar from "@/components/search/searchPage";
import HeroSection from "@/components/Banner";
import TeamIntro from "@/app/introTeam/page";
import ListTeamCard from "@/components/team/teamCard/ListTeamCard";
import CreateTeam from "@/components/team/FormCreateTeam";

const Team = () => {
  const [showExplore, setShowExplore] = useState(true);
  const [showCreateTeam, setShowCreateTeam] = useState(false); // ✅ Trạng thái hiển thị CreateTeam

  return (
    <div className="container mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black md:py-6 text-center md:text-left ml-4 mt-20">
        TEAM
      </h1>
      <HeroSection />

      {/* Links */}
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 p-5 ml-2">
        {/* EXPLORE & MY TEAM vẫn hiển thị ngay cả khi CreateTeam mở */}
        <button
          className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${
            showExplore ? "text-blue-500" : "text-black hover:text-blue-500"
          }`}
          onClick={() => setShowExplore(true)}
        >
          EXPLORE
        </button>
        <button
          className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${
            !showExplore ? "text-blue-500" : "text-black hover:text-blue-500"
          }`}
          onClick={() => setShowExplore(false)}
        >
          MY TEAM
        </button>

        {/* Button mở/tắt CreateTeam */}
        <button
          className="flex justify-start items-start text-lg md:text-lg border border-gray-500 bg-black px-4 md:px-6 py-2 font-medium transition-all text-white"
          onClick={() => setShowCreateTeam(!showCreateTeam)}
        >
          {showCreateTeam ? "×" : "+"}
        </button>
      </div>

      <div className="flex justify-center">
        <SearchBar />
      </div>

      {/* Nếu showCreateTeam = true, chỉ hiển thị CreateTeam và ẩn ListTeamCard */}
      {showCreateTeam ? (
        <CreateTeam />
      ) : showExplore ? (
        <ListTeamCard />
      ) : (
        <TeamIntro />
      )}
    </div>
  );
};

export default Team;
