"use client";

import { useState } from "react";

import SearchBar from "@/components/search/searchPage";
import HeroSection from "@/components/Banner";
import TeamIntro from "@/app/introTeam/page";
import ListTeamCard from "@/components/team/teamCard/ListTeamCard";

const Team = () => {
  const [showExplore, setShowExplore] = useState(true);

  return (
    <div className="container mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black  md:py-6 text-center md:text-left ml-4  mt-20">
        TEAM
      </h1>
      <HeroSection />

      {/* Links */}
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 p-5 ml-2">
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
          MY TEAM
        </button>
      </div>
      <div className="flex justify-center">
        <SearchBar />
      </div>

      {showExplore && <ListTeamCard />}
      {!showExplore && <TeamIntro />}
    </div>
  );
};

export default Team;
