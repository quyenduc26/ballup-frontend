"use client";
import { useState } from "react";
import { Heart, Phone } from "lucide-react";

export type CardFieldType = {
  id: string;
  name: string;
  address: string;
  price: number;
  imageUrl: string;
};

const CardField: React.FC<CardFieldType> = ({ name, address, price, imageUrl }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="relative max-w-md p-6 bg-white shadow-md rounded-lg overflow-hidden">
      {/* Image */}
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-60 object-cover bg-yellow-300" />
        
        {/* Rating & Tag (overlay) */}
        <div className="absolute top-52  flex justify-between items-center w-full px-3">
          <span className="flex items-center bg-gray-400 text-black px-2 py-1 rounded-md text-sm font-semibold">
            ⭐ 4.5
          </span>
          <span className="bg-black text-white text-xs px-2 py-1 rounded-md">FOOTBALL</span>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {/* Rating & Tag */}


        {/* Title */}
        <h2 className="text-lg font-bold text-black">{name}</h2>

        {/* Address */}
        <p className="text-gray-500 text-sm flex items-center mt-1">📍 {address}</p>

        {/* Booking Count */}
        <p className="text-gray-500 text-sm flex items-center mt-1">📈 1.3K Bookings</p>

        {/* Price */}
        <p className="text-lg font-bold mt-2 text-black">{price} VND</p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`p-2 rounded-full border ${isFavorite ? "bg-red-500 text-white" : "text-black hover:bg-red-500"}`}
          >
            <Heart size={18} fill={isFavorite ? "white" : "none"} />
          </button>

          <button className="p-2 rounded-full border text-black  hover:bg-blue-500">
            <Phone size={18} />
          </button>

          <button className="bg-black text-white px-4 w py-2 flex-2 ml-32 rounded-md hover:bg-orange-500">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardField;
