"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@heroui/react";

import { FieldDetailType } from "@/types/form";
import { getImageUrl } from "@/utils/getImage";
import { ToastMessage } from "@/components/ToastMessage";
import bookingRequestApi from "@/service/bookingRequestApi";

const BookingDetail = ({ centerInfor }: { centerInfor: FieldDetailType }) => {
  const router = useRouter();

  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warn";
        duration?: number;
      }
    | undefined
  >();

  const [loading, setLoading] = useState(false); // Thêm state loading

  const submitBooking = async () => {
    const data = localStorage.getItem("data");
    const parsedData = data ? JSON.parse(data) : null;
    const userId = parseInt(parsedData.id);

    const queryParams = new URLSearchParams(location.search);
    const fromTime = queryParams.get("fromTime");
    const toTime = queryParams.get("toTime");
    const slotId = queryParams.get("slotId");

    if (slotId == null) {
      alert("Please choose playing slot");

      return;
    }

    const bookingData = {
      userId: userId,
      playingSlotId: slotId ? parseInt(slotId) : 0,
      fromTime: fromTime ? parseInt(fromTime) : 0,
      toTime: toTime ? parseInt(toTime) : 0,
    };

    console.log(bookingData);

    setLoading(true); // Set loading true khi bắt đầu thực hiện đặt phòng

    try {
      await bookingRequestApi.booking(bookingData);

      setToastData({
        type: "success",
        heading: "Booking Successful",
        message: "Booking Successful",
        duration: 3000,
      });

      // setTimeout(() => router.push("/booking"), 3000);
    } catch (e) {
      setToastData({
        type: "error",
        heading: "Booking Unsuccessful",
        message: "An error occurred while booking.",
        duration: 3000,
      });
    } finally {
      setLoading(false); // Set loading false khi hoàn thành quá trình
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <ToastMessage toast={toastData} />
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
                getImageUrl(centerInfor.imageUrls?.[0]) || "/images/default.png"
              }
            />
            <div className="flex gap-4 overflow-x-auto pb-2">
              {centerInfor.imageUrls
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
                {centerInfor.name}
              </h1>
              <p className="text-gray-600 text-left">{centerInfor.address}</p>
              <p className="text-gray-500 text-left">
                {centerInfor.description}
              </p>
            </div>

            {/* Google Map */}
            <div className="mt-4">
              <iframe
                allowFullScreen
                className="rounded-xl border-2 border-gray-300"
                height="250"
                loading="lazy"
                src={centerInfor.mapUrl}
                title="map"
                width="100%"
              />
            </div>

            {/* Booking Time Details */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between mb-2">
                <p className="font-semibold text-gray-700">From</p>
                <p className="text-gray-900">{centerInfor.bookingTime}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">To</p>
                <p className="text-gray-900">{centerInfor.returnTime}</p>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="bg-white rounded-lg p-4 shadow-sm space-y-2">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Price</p>
                <p className="text-gray-900">{centerInfor.price}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Hour(s)</p>
                <p className="text-gray-900">{centerInfor.hours}</p>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-lg">
                <p className="text-gray-900">Total</p>
                <p className="text-green-600">{centerInfor.total}</p>
              </div>
            </div>

            {/* Deposit Button */}
            <button
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold"
              disabled={loading} // Disable button khi đang loading
              onClick={submitBooking}
            >
              {loading ? <Spinner color="default" /> : "BOOK"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
