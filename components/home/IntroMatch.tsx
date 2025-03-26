"use client";

import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/navigation";

import ListMatchCard from "../match/Card/ListCardMatch";

export default function MatchSection() {
  const router = useRouter();
  const handleSeeMore = () => {
    router.push("/match");
  };

  return (
    <div>
      <div className="w-full max-w-full relative">
        <div className="w-full flex  justify-between text-center relative mt-16 md:mt-0">
          <div>
            <p className="text-3xl sm:text-lg md:text-4xl font-bold text-black text-center md:text-left">
              CREATE
            </p>
            <h2 className="text-4xl sm:text-lg md:text-9xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text text-center md:text-left mb-10">
              MATCH
            </h2>
          </div>
          <div className=" w-[200px] sm:w-[200px] flex items-center">
            <button
              className="group flex items-center gap-2 text-sm sm:text-lg text-black border border-gray-300 
                        px-6 py-4 rounded-lg bg-white hover:bg-gradient-to-r hover:from-orange-400 
                        hover:to-yellow-300 shadow-md transition-all duration-300 
                        hover:shadow-lg hover:scale-105 active:scale-100"
              onClick={handleSeeMore}
            >
              <FiExternalLink
                className="w-[30px] sm:w-[35px] transition-transform duration-300 
                          group-hover:text-white group-hover:translate-y-[-2px]"
              />
              <span className="transition-colors duration-300 group-hover:text-white">SEE MORE</span>
            </button>
          </div>
        </div>
      </div>
      <ListMatchCard />
    </div>
  );
}
