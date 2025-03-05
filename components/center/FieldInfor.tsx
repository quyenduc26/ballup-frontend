"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { FieldDetailType } from "@/types/form";
import playingApi from "@/service/playingApi";
import { getImageUrl } from "@/utils/getImage";

const BookingDetail = () => {
  const router = useRouter();
  const params = useParams();
  const centerId = params.centerId;
  const centerIdNumber = parseInt(
    Array.isArray(centerId) ? centerId[0] : centerId || "0",
  );

  const [bookingInfo, setBookingInfo] = useState<FieldDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!centerId) return;

    const fetchCenterInfo = async () => {
      try {
        if (centerIdNumber) {
          const response = await playingApi.getCenterInfor(centerIdNumber);

          setBookingInfo({
            ...response.data,
            bookingTime: "20:00 12/12/2012",
            returnTime: "21:00 12/12/2012",
            type: "5-player",
            price: "200,000 vnd",
            hours: 1,
            total: "200,000 vnd",
          });
          console.log(response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sân bóng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterInfo();
  }, [centerId]);

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (!bookingInfo)
    return <p className="text-center mt-10">Không tìm thấy sân bóng</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            className="flex items-center text-black hover:text-black text-xl font-bold  transition-colors"
            onClick={() => router.back()}
          >
            <svg
              className="h-6 w-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Back
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8 p-6">
          {/* Left Side - Image Gallery */}
          <div className="flex-1 space-y-4">
            <img
              alt="Main field"
              className="rounded-xl w-full h-[650px] object-cover shadow-lg"
              src={
                getImageUrl(bookingInfo.imageUrls?.[0]) || "/images/default.png"
              }
            />
            <div className="flex gap-4 overflow-x-auto pb-2">
              {bookingInfo.imageUrls
                ?.slice(1)
                .map((img, index) => (
                  <img
                    key={index}
                    alt={`Field ${index + 2}`}
                    className="rounded-lg object-cover cursor-pointer w-48 h-32 hover:opacity-80 transition-opacity"
                    src={getImageUrl(img)}
                  />
                ))}
            </div>
          </div>

          {/* Right Side - Booking Details */}
          <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4 ">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {bookingInfo.name}
              </h1>
              <p className="text-gray-600 text-left">{bookingInfo.address}</p>
              <p className="text-gray-500 text-left">
                {bookingInfo.description}
              </p>
            </div>

            {/* Google Map */}
            <div className="mt-4">
              <iframe
                allowFullScreen
                className="rounded-xl border-2 border-gray-300"
                height="250"
                loading="lazy"
                src={bookingInfo.mapUrl}
                title="map"
                width="100%"
              />
            </div>

            {/* Booking Time Details */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-gray-700">From</p>
                <p className="text-gray-900">{bookingInfo.bookingTime}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">To</p>
                <p className="text-gray-900">{bookingInfo.returnTime}</p>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="bg-white rounded-lg p-4 shadow-sm space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Type</p>
                <p className="text-gray-900">{bookingInfo.type}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Price</p>
                <p className="text-gray-900">{bookingInfo.price}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Hour(s)</p>
                <p className="text-gray-900">{bookingInfo.hours}</p>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                <p className="text-gray-900">Total</p>
                <p className="text-green-600">{bookingInfo.total}</p>
              </div>
            </div>

            {/* Deposit Button */}
            <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold">
              DEPOSIT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
