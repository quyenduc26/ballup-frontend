"use client";

import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/navigation"; // Import useRouter

import ListTeamCard from "../team/teamCard/ListTeamCard";

export default function TeamSection() {
  const router = useRouter(); 
  const handleSeeMore = () => {
    router.push("/team"); 
  };

  return (
    <div>
      <div className="w-full max-w-full gap-24 mx-auto flex flex-col-reverse md:flex-row items-center bg-white relative">
        <div className="w-full md:w-2/3 flex flex-col justify-center md:ml-20 text-center md:text-left relative mt-16 md:mt-0">
          <p className="text-xl sm:text-lg md:text-4xl font-bold text-black text-center md:text-right md:pr-28">
            MAKE
          </p>
          <h2 className="text-4xl sm:text-lg md:text-9xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text text-center md:text-right md:pr-28 mb-10">
            TEAM
          </h2>

          <hr className="w-full border-t border-gray-500 my-12 md:my-6 md:mb-16 mb-20" />

          <div className="absolute w-[200px] sm:w-[200px] right-0 sm:left-0">
            <button
              className="flex items-center gap-2 text-sm sm:text-lg text-black border border-gray-300 px-6 py-4 rounded-lg hover:bg-gray-100"
              onClick={handleSeeMore}
            >
              SEE MORE <FiExternalLink className="w-[30px] sm:w" />
            </button>
          </div>
        </div>

        <div className="w-full md:w-[350px] h-auto mb-10 md:mb-36 flex justify-center">
          <Image
            alt="Team Trophy"
            className="w-[250px] md:w-full object-cover"
            height={200}
            src="/images/image 3.png"
            width={1200}
          />
        </div>
      </div>
      <ListTeamCard />
    </div>
  );
}