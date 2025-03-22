"use client";
import type { FieldDetailType } from "@/types/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Clock,
  MapPin,
  Calendar,
  DollarSign,
  Info,
  ArrowLeft,
  CreditCard,
  Building,
  HourglassIcon,
} from "lucide-react";

import { SonnerToast } from "../sonnerMesage";
import { getImageUrl } from "@/utils/getImage";
import bookingRequestApi from "@/service/bookingRequestApi";
import { formatCurrency } from "@/utils/formatCurrency";
import { calculatePrice } from "@/utils/calculatePrice";

const BookingDetail = ({ centerInfor }: { centerInfor: FieldDetailType }) => {
  const router = useRouter();
  const [toastData, setToastData] = useState<
    | {
      heading?: string;
      message?: string;
      type?: "error" | "success" | "info" | "warning";
      duration?: number;
    }
    | undefined
  >();
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const fromTime = queryParams.get("fromTime");
  const toTime = queryParams.get("toTime");
  const primaryPrice = Number.parseInt(queryParams.get("primaryPrice") || "0");
  const nightPrice = Number.parseInt(queryParams.get("nightPrice") || "0");
  const afternoonPrice = Number.parseInt(
    queryParams.get("afternoonPrice") || primaryPrice.toString(),
  ); 

  console.log("fromTime:", fromTime);
  console.log("toTime:", toTime);
  console.log("primaryPrice:", primaryPrice);
  console.log("afternoonPrice:", afternoonPrice);
  console.log("nightPrice:", nightPrice);

  const slots = [{ primaryPrice, afternoonPrice, nightPrice }];

  const { price, totalPrice, hours, amount } = calculatePrice(
    slots,
    fromTime,
    toTime,
  );

  if (hours <= 0 || !Number.isFinite(hours)) {
    console.error("Invalid duration:", { fromTime, toTime });
    setToastData({
      type: "error",
      heading: "Invalid Time Range",
      message: "Please select a valid time range.",
      duration: 3000,
    });
  }

  const displayPrice = typeof price === "number" ? price : price?.min || 0;
  const displayTotal =
    typeof totalPrice === "number" ? totalPrice : totalPrice?.min || 0;

  const fromDate = fromTime ? new Date(Number(fromTime)) : null;
  const toDate = toTime ? new Date(Number(toTime)) : null;

  const submitBooking = async () => {
    const data = localStorage.getItem("data");
    const parsedData = data ? JSON.parse(data) : null;
    const userId = Number.parseInt(parsedData?.id || "0");

    const slotId = queryParams.get("slotId");

    if (!slotId) {
      alert("Please choose playing slot");
      return;
    }

    const bookingData = {
      userId: userId,
      playingSlotId: Number.parseInt(slotId),
      fromTime: Number(fromTime),
      toTime: Number(toTime),
      amount: amount,
    };

    console.log("bookingData:", bookingData);
    setLoading(true);

    try {
      const booking = await bookingRequestApi.booking(bookingData);
      window.location.href = `/payment/${booking.data}`;
      setToastData({
        type: "success",
        heading: "Booking Successful",
        message: "Booking Successful",
        duration: 3000,
      });
    } catch (e) {
      setToastData({
        type: "error",
        heading: "Booking Unsuccessful",
        message: "An error occurred while booking.",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <SonnerToast toast={toastData} />
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <button
            className="flex items-center text-black hover:text-black text-xl font-bold transition-colors mt-5"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-6 w-6 mr-2" />
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
            <div className="flex gap-6 overflow-x-auto pb-2">
              {centerInfor.imageUrls?.slice(1).map((img, index) => (
                <img
                  key={index}
                  alt={`Field ${index + 2}`}
                  className="rounded-lg object-cover cursor-pointer w-48 h-32 hover:opacity-80 transition-opacity"
                  src={getImageUrl(img) || "/placeholder.svg"}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Booking Details */}
          <div className="flex-1 justify-center max-w-md">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              <div className="bg-black text-white p-4">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  <h1 className="text-2xl font-bold">{centerInfor.name}</h1>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="ml-0.5 h-4 w-4 text-gray-300" />
                  <p className="text-gray-300 text-sm">{centerInfor.address}</p>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 flex gap-2">
                  <Info className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <div>{centerInfor.description}</div>
                </div>

                <div className="border-b pb-4">
                  <h3 className="text-black text-sm uppercase font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    BOOKING TIME
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg text-start">
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                        <Clock className="h-3 w-3" />
                        <p>From</p>
                      </div>
                      <div>
                        <p className="font-bold">
                          {fromDate
                            ? fromDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            : ""}
                        </p>

                        <p className="font-bold">
                          {toDate
                            ? toDate.toLocaleDateString([], {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg text-start">
                      <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                        <Clock className="h-3 w-3" />
                        <p>To</p>
                      </div>
                      <div>

                        <p className="font-bold">
                          {toDate
                            ? toDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                            : ""}
                        </p>
                        <p className="font-bold">
                          {toDate
                            ? toDate.toLocaleDateString([], {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-black text-sm uppercase font-semibold mb-2 flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    PRICING DETAILS
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-1">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        Price per hour :
                      </span>
                      <span>{formatCurrency(displayPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 flex items-center gap-1">
                        <HourglassIcon className="h-4 w-4 text-gray-500" />
                        Duration:
                      </span>
                      <span>{hours.toFixed(1)} Hour(s)</span>
                    </div>
                    <div className="h-px bg-gray-200 my-2" />
                    <div className="flex justify-between items-center font-bold text-lg">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        Total
                      </span>
                      <span className="text-green-600">
                        {formatCurrency(displayTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors text-lg font-semibold mt-4 flex items-center justify-center gap-2"
                  disabled={loading || hours <= 0}
                  onClick={submitBooking}
                >
                  {loading ? (
                    <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <>BOOKING</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;