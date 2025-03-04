"use client";

import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export default function TeamSection() {
  return (
    <div className="w-full max-w-full mx-auto p-6 flex flex-col items-center bg-white">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex-shrink-0 mt-60">
        <button className="mt-6 md:mt-10 mx-auto mr-1 flex items-center gap-2 text-lg text-black border border-gray-300 px-6 py-4 rounded-lg hover:bg-gray-100">
          SEE MORE <FiExternalLink size={30} />
        </button>
        </div>

        <div className="flex flex-col items-start">
          <div className="text-right">
            <span className="text-3xl md:text-5xl font-bold text-black ml-56">MAKE</span>
          </div>
          <h2 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
            TEAM
          </h2>
        </div>

        <div className="w-[350px]">
          <Image
            src="/images/image 3.png"
            alt="Team Trophy"
            width={350}
            height={240}
            className="object-cover"
          />
        </div>
      </div>

      <hr className="w-full border-t border-gray-500 mt-2" />
    </div>
  );
}