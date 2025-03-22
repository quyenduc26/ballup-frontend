"use client";

import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

import CardList from "../center/CardList";
import { useRouter } from "next/navigation";

export default function BookingSection() {
      const router = useRouter(); 
      const handleSeeMore = () => {
        router.push("/booking");
      }; 
  return (
    <div>
      <div className="w-full max-w-full mx-auto p-6 flex flex-col md:flex-row items-center bg-white">
        <div className="w-full md:w-[350px] h-[300px]   ">
          <Image
            alt="Innovibe Squads"
            className="w-full object-cover"
            height={200}
            src="/images/image 3.png"
            width={ 200}
          />
        </div>
        <div className="w-full md:w-2/3 pl-0 md:pl-6 flex flex-col md:ml-20 text-center md:text-left">
          <h2 className=" md:text-9xl text-4xl sm:text-lg font-bold bg-gradient-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">
            BOOKING
          </h2>
          <p className="text-xl sm:text-lg md:text-4xl font-bold text-black">
            YOUR COURT
          </p>
          <button className="mt-6 md:mt-10 w-[160px] sm:w-[200px] mx-auto mr-1 flex items-center gap-2 text-sm sm:text-lg text-black border border-gray-300 px-6 py-4 rounded-lg hover:bg-gray-100"
          onClick={handleSeeMore} >
            SEE MORE <FiExternalLink className="w-[30px] sm:w" />
          </button>
          <hr className="w-full border-t border-gray-500 mt-12 " />
        </div>
      </div>

      <CardList fields={[]} />
    </div>
  );
}
