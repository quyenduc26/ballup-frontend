"use client";

import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Import useRouter

import { DetailTeam } from "@/types";
import TeamCard from "@/components/team/teamCard/CardTeam";

export default function TeamSection({ teams }: { teams: DetailTeam[] }) {
  const router = useRouter();
  const handleSeeMore = () => {
    router.push("/team");
  };

  return (
    <div>
      <div className="w-full max-w-full relative">
        <div className="w-full flex flex-col justify-center text-center relative mt-16 md:mt-0">
          <p className="text-3xl sm:text-lg md:text-4xl font-bold text-black text-center md:text-right">
            MAKE
          </p>
          <h2 className="text-4xl sm:text-lg md:text-9xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text text-center md:text-right mb-10">
            TEAM
          </h2>
          <div className="absolute w-[200px] sm:w-[200px] right-0 sm:left-0">
            <button
              className="group flex items-center gap-2 text-sm sm:text-lg text-black border border-gray-300 
                        px-6 py-4 rounded-lg bg-white hover:bg-gradient-to-r hover:from-orange-400 
                        hover:to-yellow-300 shadow-md transition-all duration-300 
                        hover:shadow-lg hover:scale-105 active:scale-100 hover:font-semibold hover:border-0"
              onClick={handleSeeMore}
            >
              <FiExternalLink
                className="w-[30px] sm:w-[35px] transition-transform duration-300 
                          group-hover:text-white group-hover:translate-y-[-2px]"
              />
              <span className="transition-colors duration-300 group-hover:text-white">
                SEE MORE
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {teams.map((team, index) => (
          <TeamCard key={index} team={team} />
        ))}
      </div>

      <hr className="w-full border-t border-gray-500 my-12 md:my-6 md:mb-16 mb-20 mt-5" />
    </div>
  );
}
