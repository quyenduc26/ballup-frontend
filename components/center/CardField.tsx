"use client";
import { Heart, MapPinned, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { CardFieldType, queryTime } from "@/types";
import { getImageUrl } from "@/utils/getImage";
import { SonnerToast } from "@/components/sonnerMesage";

const CardField = ({
  field,
  queryTime,
}: {
  field: CardFieldType;
  queryTime?: queryTime;
}) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [toastData, setToastData] = useState<any>(null);

  let url = `/booking/${field.id}`;

  if (queryTime) {
    const { fromTime, toTime } = queryTime;
    const queryParams = new URLSearchParams();
    if (fromTime) queryParams.append("fromTime", fromTime.toString());
    if (toTime) queryParams.append("toTime", toTime.toString());
    url = `${url}?${queryParams.toString()}`;
  }

  const toggleFavorite = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleBookNow = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!queryTime?.fromTime || !queryTime?.toTime) {
      setToastData({
        heading: "Error",
        message: "Please select a time range before booking.",
        type: "error",
      });
      return;
    }

    window.location.href = url;
  };

  return (
    <div className="relative">
      {toastData && (
        <div className="fixed top-4 right-4 z-50">
          <SonnerToast toast={toastData} />
        </div>
      )}
      <div className="relative w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105">
        <Link className="block relative" href={url}>
          <img
            alt="sân bóng đá"
            className="w-full h-40 sm:h-72 object-cover bg-yellow-300 rounded-lg"
            src={getImageUrl(field.image)}
          />
        </Link>

        <div className="py-4">
          <h2 className="text-2xl font-bold text-left text-black">{field.name || "Không có tên"}</h2>
          <p className="text-black flex items-center mt-2">
            <MapPinned className="mr-2" size={20} />
            {field.address || "Chưa có địa chỉ"}
          </p>
          <p className="text-lg text-left font-bold mt-2 text-black">
            {field.primaryPrice?.toLocaleString() || "0"} VND - {field.nightPrice?.toLocaleString() || "0"} VND
          </p>

          <div className="flex justify-between gap-3 mt-4">
            <div className="flex gap-3">
              <button
                className={`p-2 rounded-full border ${favorites.includes(field.id) ? "bg-red-500 text-white" : "text-black hover:bg-red-500"
                  }`}
                onClick={(event) => toggleFavorite(field.id, event)}
              >
                <Heart fill={favorites.includes(field.id) ? "white" : "none"} size={20} />
              </button>

              <button className="p-2 rounded-full border text-black hover:bg-blue-500">
                <Phone size={20} />
              </button>
            </div>
            <button
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-orange-500 font-bold hover:scale-95 transition"
              onClick={handleBookNow}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default CardField;
