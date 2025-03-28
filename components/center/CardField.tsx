"use client";
import { MapPinned } from "lucide-react";
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

  const toggleFavorite = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const handleBookNow = (event: React.MouseEvent) => {
    event.preventDefault();

    if (!queryTime?.fromTime || !queryTime?.toTime) {
      setToastData({
        heading: "Error",
        message: "Please select a time range before booking.",
        type: "error",
        img: getImageUrl(field.image),
      });

      return;
    }

    const queryParams = new URLSearchParams();

    queryParams.append("fromTime", queryTime.fromTime.toString());
    queryParams.append("toTime", queryTime.toTime.toString());
    queryParams.append("primaryPrice", field.primaryPrice?.toString() || "0");
    queryParams.append("nightPrice", field.nightPrice?.toString() || "0");

    const url = `/booking/${field.id}?${queryParams.toString()}`;

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
        <img
          alt="sân bóng đá"
          className="w-full h-40 sm:h-72 object-cover bg-yellow-300 rounded-lg"
          src={getImageUrl(field.image)}
        />
        <div className="py-4">
          <h2 className="text-2xl font-bold text-left text-black">
            {field.name || "Không có tên"}
          </h2>
          <p className="text-black flex items-center mt-2">
            <MapPinned className="mr-2" size={20} />
            {field.address || "Chưa có địa chỉ"}
          </p>

          <p className="text-lg text-left font-bold mt-2 text-black">
            {field.primaryPrice?.toLocaleString() || "0"} VND -{" "}
            {field.nightPrice?.toLocaleString() || "0"} VND
          </p>

          <div className="flex justify-between gap-3 mt-4">
            {/* <div className="flex gap-3">
              <button
                className={`p-2 rounded-full border ${
                  favorites.includes(field.id)
                    ? "bg-red-500 text-white"
                    : "text-black hover:bg-red-500"
                }`}
                onClick={(event) => toggleFavorite(field.id, event)}
              >
                <Heart
                  fill={favorites.includes(field.id) ? "white" : "none"}
                  size={20}
                />
              </button>
              <button className="p-2 rounded-full border text-black hover:bg-blue-500">
                <Phone size={20} />
              </button>
            </div> */}
            <div className="mt-1 flex items-center text-sm text-gray-600">
              <svg
                className="mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              <span>{field.bookingCount} lượt đặt sân</span>
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
