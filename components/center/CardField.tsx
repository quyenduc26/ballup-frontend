"use client";
import { Heart, MapPinned, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CardFieldType } from "@/types";
import { getImageUrl } from "@/utils/getImage";

const CardField = ({ field }: { field: CardFieldType }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="relative w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105">
      <Link href={`/field/${field.id}`} className="block relative">
      <img
        src={getImageUrl(field.image)}
        alt="sân bóng đá" 
        className="w-full h-40 sm:h-72 object-cover bg-yellow-300 rounded-lg"
      />
    </Link>

      {/* Nội dung */}
      <div className="p-4">
        <h2 className="text-2xl font-bold text-left flex flex-col text-black">{field.name || "Không có tên"}</h2>

        {/* Địa chỉ */}
        <p className="text-black flex items-center mt-2">
          <MapPinned size={20} className="mr-2" />
          {field.address || "Chưa có địa chỉ"}
        </p>

        {/* Giá */}
        <p className="text-lg text-left flex flex-col font-bold mt-2 text-black">
          {field.primaryPrice?.toLocaleString() || "0"} VND -{" "}
          {field.nightPrice?.toLocaleString() || "0"} VND
        </p>

        {/* Nút bấm */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => toggleFavorite(field.id)}
            className={`p-2 rounded-full border ${
              favorites.includes(field.id) ? "bg-red-500 text-white" : "text-black hover:bg-red-500"
            }`}
          >
            <Heart size={20} fill={favorites.includes(field.id) ? "white" : "none"} />
          </button>

          <button className="p-2 rounded-full border text-black hover:bg-blue-500">
            <Phone size={20} />
          </button>

          <button className="bg-black text-white px-4 py-2 ml-auto rounded-md hover:bg-orange-500">
            BOOK NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardField;
