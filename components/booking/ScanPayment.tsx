"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { useRouter } from "next/navigation";

import { BookingDetailResponse } from "@/types";
import bookingRequestApi from "@/service/bookingRequestApi";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { formatCurrency } from "@/utils/formatCurrency";
import { SonnerToast } from "@/components/sonnerMesage";

export default function ScanPayment({ bookingId }: { bookingId: number }) {
  const [booking, setBooking] = useState<BookingDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDepositing, setIsDepositing] = useState<boolean>(false);
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

  useEffect(() => {
    async function fetchBooking() {
      try {
        const res = await bookingRequestApi.getBookingDetail(bookingId);

        setBooking(res.data);
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, []);

  const handleDeposit = async (booking: number) => {
    setIsDepositing(true);
    try {
      await bookingRequestApi.depositBooking(bookingId);
      setToastData({
        type: "success",
        heading: "Action success",
        message: "Deposited successfully",
        duration: 3000,
      });
      setTimeout(() => {
        router.push("/booking");
      }, 3000);
    } catch (error) {
      setToastData({
        type: "error",
        heading: "Action fail",
        message: "Deposited unsuccessfully",
        duration: 3000,
      });
      throw error;
    } finally {
      setIsDepositing(false);
    }
  };

  return loading ? (
    <Spinner className="h-screen w-screen" color="default" />
  ) : (
    <div className="w-[1500px]  mx-auto py-8 px-4">
      <SonnerToast toast={toastData} />
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center ">
          <div className="w-1/2 mx-auto py-8  h-full">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b">
                <h1 className="text-xl font-bold text-center">
                  Thanh toán đặt sân
                </h1>
                <p className="text-center text-gray-500 mt-1">
                  Quét mã QR để thanh toán
                </p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {booking?.status === "REQUESTED" ? (
                  <div className="bg-yellow-50 border border-yellow-500 text-orange-500 p-4 rounded-lg">
                    <div className="flex justify-center font-medium">
                      WAITING FOR THE OWNER CONFIRMATION
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-center">
                      {/* <QRCode value={`https://payment.example.com/${booking.paymentCode}`} size={200} className="mx-auto" /> */}
                    </div>
                    <p className="text-center mt-2 text-sm text-gray-500">
                      Mã thanh toán: gjasgwejbrj
                    </p>
                  </div>
                )}

                {/* Booking Details */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sân</span>
                    <span className="font-medium">{`${booking?.centerName} - ${booking?.slotName}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Địa chỉ</span>
                    <span className="font-medium">
                      {booking?.centerAddress}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Thời gian đặt</span>
                    <span className="font-medium">
                      {formatTimestamp(booking?.fromTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Thời gian trả</span>
                    <span className="font-medium">
                      {formatTimestamp(booking?.toTime)}
                    </span>
                  </div>
                  <div className="border-t my-2" />
                  {booking?.status === "COMPLETED" && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Thanh toán vào</span>
                      <span className="font-medium">
                        {formatTimestamp(booking?.bookingTime)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tổng tiền</span>
                    <span className="font-bold text-lg">
                      {formatCurrency(booking?.amount)}
                    </span>
                  </div>
                </div>

                {/* Status Messages */}
                {booking?.status === "COMPLETED" && (
                  <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center justify-center gap-2">
                    <svg
                      fill="none"
                      height="18"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>Thanh toán thành công!</span>
                  </div>
                )}
              </div>
              <div className="p-6 border-t">
                {booking?.status === "REQUESTED" && (
                  <>
                    <button
                      className={`w-full bg-gray-400 text-white hover:bg-gray-500 hover:scale-105 transition py-2 px-4 rounded-md flex items-center justify-center mb-3`}
                      onClick={() => router.back()}
                    >
                      <span>Quay lại</span>
                    </button>
                  </>
                )}
              </div>

              {/* Footer with Buttons */}
              <div className="p-6 border-t">
                {booking?.status === "CONFIRMED" && (
                  <>
                    <button
                      className={`w-full ${
                        isDepositing
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
                      } text-white py-2 px-4 rounded-md flex items-center justify-center mb-3`}
                      disabled={isDepositing}
                      onClick={() => handleDeposit(booking.bookingId)}
                    >
                      {isDepositing ? (
                        <Spinner color="white" />
                      ) : (
                        <>
                          <svg
                            className="mr-2"
                            fill="none"
                            height="16"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>ĐÃ THANH TOÁN</span>
                        </>
                      )}
                    </button>
                    <div className="flex gap-3">
                      <button
                        className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md flex items-center justify-center"
                        onClick={() => router.back()}
                      >
                        <svg
                          className="mr-2"
                          fill="none"
                          height="16"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="19" x2="5" y1="12" y2="12" />
                          <polyline points="12 19 5 12 12 5" />
                        </svg>
                        QUAY LẠI
                      </button>
                      <button
                        className="flex-1 border border-gray-300 hover:bg-gray-50 py-2 px-4 rounded-md flex items-center justify-center"
                        onClick={() => router.push("/booking")}
                      >
                        <svg
                          className="mr-2"
                          fill="none"
                          height="16"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        ĐỂ SAU
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
