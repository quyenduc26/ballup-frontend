"use client";
import { useState } from "react";
import { Heart, Phone } from "lucide-react";

export type CardFieldType = {
  id: string;
  name: string;
  address: string;
  price: number;
  images: string;
};

const CardField: React.FC<CardFieldType> = ({ name, address, price, images }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative w-full max-w-md mx-auto p-3 sm:p-6 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img 
          src={images} 
          alt={name} 
          className="w-full h-48 sm:h-60 object-cover bg-yellow-300 rounded-lg" 
        />
        
        {/* Rating & Tag (overlay) */}
        <div className="absolute bottom-2 flex justify-between items-center w-full px-2 sm:px-3">
          <span className="flex items-center bg-gray-400 text-black px-2 py-1 rounded-md text-xs sm:text-sm font-semibold">
            ⭐ 4.5
          </span>
          <span className="bg-black text-white text-xs px-2 py-1 rounded-md">
            FOOTBALL
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-4">
        {/* Title */}
        <h2 className="text-base sm:text-lg font-bold text-black line-clamp-1">
          {name}
        </h2>

        {/* Address */}
        <p className="text-gray-500 text-xs sm:text-sm flex items-center mt-1 line-clamp-1">
          📍 {address}
        </p>

        {/* Booking Count */}
        <p className="text-gray-500 text-xs sm:text-sm flex items-center mt-1">
          📈 1.3K Bookings
        </p>

        {/* Price */}
        <p className="text-base sm:text-lg font-bold mt-2 text-black">
          {price} VND
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 sm:mt-4">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-1.5 sm:p-2 rounded-full border ${
              isFavorite ? "bg-red-500 text-white" : "text-black hover:bg-red-500"
            }`}
          >
            <Heart size={16} fill={isFavorite ? "white" : "none"} />
          </button>

          <button className="p-1.5 sm:p-2 rounded-full border text-black hover:bg-blue-500">
            <Phone size={16} />
          </button>

          <button className="bg-black text-white px-3 sm:px-4 py-1.5 sm:py-2 ml-auto rounded-md hover:bg-orange-500 text-sm sm:text-base">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardField;