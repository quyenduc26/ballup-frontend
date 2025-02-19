  "use client";
  import { useState } from "react";
  import { Heart, Phone } from "lucide-react";

  interface CardProps {
    name: string;
    address: string;
    price: string;
    imageUrl: string; 
  }

  const CardField: React.FC<CardProps> = ({ name, address, price, imageUrl }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
      <div className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden">
        {/* Image */}
        <img src={imageUrl} alt={name} className="w-full bg-yellow-400 h-60 object-cover" />

        {/* Content */}
        <div className="p-4">
          {/* Rating & Tag */}
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center bg-yellow-400 text-black px-2 py-1 rounded-md text-sm font-semibold">
              ⭐ 4.5
            </span>
            <span className="bg-black text-white text-xs px-2 py-1 rounded-md">FOOTBALL</span>
          </div>

          {/* Title */}
          <h2 className="text-lg font-bold">{name}</h2>

          {/* Address */}
          <p className="text-gray-500 text-sm flex items-center mt-1">
            📍 {address}
          </p>

          {/* Booking Count */}
          <p className="text-gray-500 text-sm flex items-center mt-1">
            📈 1.3K Bookings
          </p>

          {/* Price */}
          <p className="text-lg font-bold mt-2">{price} VND</p>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full border ${isFavorite ? "bg-red-500 text-white" : "text-black"}`}
            >
              <Heart size={18} fill={isFavorite ? "white" : "none"} />
            </button>

            <button className="p-2 rounded-full border text-black">
              <Phone size={18} />
            </button>

            <button className="bg-black text-white px-4 py-2 flex-1 rounded-md hover:bg-gray-800">
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default CardField;
