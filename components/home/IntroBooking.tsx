"use client";

import { FiExternalLink } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { CardFieldType } from "@/types/form";
import CardList from "@/components/center/CardList";

export default function BookingSection({ centers }: { centers: CardFieldType[] }) {
  const router = useRouter();
  const handleSeeMore = () => {
    router.push("/booking");
  };

  return (
    <div>
      <div className="w-full max-w-full relative">
        <div className="w-full flex  justify-between text-center relative mt-16 md:mt-0">
          <div>
            <h2 className="text-4xl sm:text-lg md:text-9xl font-extrabold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text text-center md:text-left mb-2">
              BOOKING
            </h2>
            <p className="text-3xl sm:text-lg md:text-4xl font-bold text-black text-center md:text-left">
              YOUR COURT
            </p>
          </div>
          <div className=" w-[200px] sm:w-[200px] flex items-center">
            <button
              className="flex items-center gap-2 text-sm sm:text-lg text-black border border-gray-300 px-6 py-4 rounded-lg hover:bg-gray-100"
              onClick={handleSeeMore}
            >
              <FiExternalLink className="w-[30px] sm:w" /> SEE MORE
            </button>
          </div>
        </div>

      </div>
      <div className="flex justify-between">
        <CardList fields={centers} />
      </div>
      <hr className="w-full border-t border-gray-500 my-12 md:my-6 md:mb-16 mb-20 mt-5" />
    </div>
  );
}
