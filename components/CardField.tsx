"use client";
import { useState } from "react";
import { Heart, MapPinned, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CardFieldType } from "@/types";


const CardField: React.FC<CardFieldType> = ({
  id,
  name,
  address,
  type = "",
  bookingCount = 0,
  image,
  primaryPrice = 0,
  nightPrice = 0,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative w-full max-w-lg mx-auto p-2 sm:p-6 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image (Wrapped in Link) */}
      <Link href={`/field/${id}`} className="block relative">
        <Image
          src={image || "/images/image 3.png"}
          alt="sân bóng đá"
          width={400}
          height={400}
          className="w-full h-40 sm:h-72 object-cover bg-yellow-300 rounded-lg"
        />
        {/* Rating & Tag (overlay) */}
        <div className="absolute bottom-2 flex justify-between items-center w-full px-2 sm:px-3">
          <span className="flex items-center bg-gray-400 text-black px-2 py-1 rounded-md text-xs sm:text-sm font-semibold">
            ⭐ 4.5
          </span>
          <span className="bg-black text-white text-xs px-2 py-1 rounded-md">Football
           {type.toString()}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-2 sm:p-4">
        {/* Title */}
        <h2 className="text-sm sm:text-3xl font-bold text-black line-clamp-1">
          {name}
        </h2>

        {/* Address */}
        <p className="text-gray-500 text-xs sm:text-lg flex items-center mt-1 line-clamp-1">
          <MapPinned size={24} className="mr-1" /> {address}
        </p>

        {/* Booking Count */}
        <p className="text-gray-500 text-xs sm:text-lg flex items-center mt-1">
          📈 {bookingCount.toLocaleString()} Bookings
        </p>

        {/* Price */}
        <p className="text-sm sm:text-xl font-bold mt-2 text-black">
          {primaryPrice.toLocaleString()} VND - {nightPrice.toLocaleString()} VND
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-1 sm:p-2 rounded-full border ${
              isFavorite ? "bg-red-500 text-white" : "text-black hover:bg-red-500"
            }`}
          >
            <Heart size={20} fill={isFavorite ? "white" : "none"} />
          </button>

          <button className="p-1 sm:p-2 rounded-full border text-black hover:bg-blue-500">
            <Phone size={20} />
          </button>

          <button className="bg-black text-white px-2 sm:px-4 py-1 sm:py-2 ml-auto rounded-md hover:bg-orange-500 text-xs sm:text-base">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardField;
