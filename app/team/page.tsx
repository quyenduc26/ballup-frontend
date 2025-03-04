"use client";

import { useState } from "react";
import SearchBar from "@/components/search/searchPage";
import HeroSection from "@/components/Banner";
import TeamCard from "@/app/teamCard/page";
import TeamIntro from "@/app/introTeam/page";

const Team = () => {
    const [showExplore, setShowExplore] = useState(true);

    return (
        <div className="container mx-auto max-w-[1500px] p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-black  md:py-6 text-center md:text-left ml-4">
                TEAM
            </h1>
            <HeroSection />

            {/* Links */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 p-5 ml-2">
                <button
                    onClick={() => setShowExplore(true)}
                    className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${showExplore ? "text-blue-500" : "text-black hover:text-blue-500"}`}
                >
                    EXPLORE
                </button>
                <button
                    onClick={() => setShowExplore(false)}
                    className={`text-lg md:text-2xl font-semibold transition-all hover:underline ${!showExplore ? "text-blue-500" : "text-black hover:text-blue-500"}`}
                >
                    MY TEAM
                </button>
            </div>
            <SearchBar />

            {showExplore && <TeamCard />}
            {!showExplore && <TeamIntro />}

        </div>
    );
};

export default Team;