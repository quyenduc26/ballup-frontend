"use client";

import type React from "react";
import type { BookingDetailResponse } from "@/types";

import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  X,
  User,
  Info,
  CreditCardIcon as PaymentIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

import bookingRequestApi from "@/service/bookingRequestApi";
import { formatTimestamp } from "@/utils/formatTimestamp";
import { useUser } from "@/context/UserContext";
import { SonnerToast } from "@/components/sonnerMesage";

type TabType = "pending" | "completed";

export function BookingHistory() {
  const { userId } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [translateX, setTranslateX] = useState("translate-x-full");
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [bookings, setBookings] = useState<BookingDetailResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedBookingId, setExpandedBookingId] = useState<number | null>(
    null,
  );
  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warning";
        duration?: number;
      }
    | undefined
  >();

  const handleCancel = async (bookingId: number) => {
    try {
      await bookingRequestApi.cancelBooking(bookingId);
      setToastData({
        type: "success",
        heading: "Cancel successfully",
        message: "Cancel booking successfully",
        duration: 3000,
      });
      setIsUpdate(true);
    } catch (error) {
      setToastData({
        type: "error",
        heading: "Error",
        message: "Cancel booking unsuccessfully!",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (userId) {
        setLoading(true);
        const data = await bookingRequestApi.getUserBooking(userId);

        if (data) setBookings(data.data);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId, isUpdate]);

  // Filter bookings based on active tab
  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === "pending") {
      return (
        booking.status === "REQUESTED" ||
        booking.status === "DEPOSITED" ||
        booking.status === "CONFIRMED"
      );
    } else {
      return (
        booking.status === "COMPLETED" ||
        booking.status === "CANCELLED" ||
        booking.status === "REJECTED"
      );
    }
  });

  // Handle opening the drawer with proper animation
  const handleOpen = () => {
    setIsOpen(true);
    // Use requestAnimationFrame to ensure the initial state is rendered before transitioning
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTranslateX("translate-x-0");
      });
    });
  };

  // Handle closing the drawer with proper animation
  const handleClose = () => {
    setTranslateX("translate-x-full");
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setIsOpen(false);
      setExpandedBookingId(null);
    }, 300);
  };

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Reset translateX when drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setTranslateX("translate-x-full");
    }
  }, [isOpen]);

  // Toggle expanded booking details
  const toggleBookingDetails = (bookingId: number) => {
    setExpandedBookingId(expandedBookingId === bookingId ? null : bookingId);
  };

  // Handle cancel booking
  const handleCancelBooking = (bookingId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    // Add your cancel booking logic here
    console.log("Cancel booking:", bookingId);
  };

  // Handle view details
  const handleViewDetails = (bookingId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    // Add your view details logic here
    console.log("View details:", bookingId);
  };

  // Handle payment
  const handlePayment = (bookingId: number, event: React.MouseEvent) => {
    router.push(`/payment/${bookingId}`);
    console.log("Process payment:", bookingId);
  };

  // Get status color and icon based on booking status
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "REQUESTED":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: <Clock className="h-3.5 w-3.5 mr-1.5" />,
        };
      case "DEPOSITED":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <CreditCard className="h-3.5 w-3.5 mr-1.5" />,
        };
      case "CONFIRMED":
        return {
          color: "bg-indigo-100 text-indigo-800 border-indigo-200",
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1.5" />,
        };
      case "COMPLETED":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <CheckCircle className="h-3.5 w-3.5 mr-1.5" />,
        };
      case "CANCELLED":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <XCircle className="h-3.5 w-3.5 mr-1.5" />,
        };
      case "REJECTED":
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: null,
        };
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  // Render action buttons based on booking status
  const renderActionButtons = (booking: BookingDetailResponse) => {
    switch (booking.status) {
      case "REQUESTED":
        return (
          <div className="flex space-x-2 mt-3 ">
            <button
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors flex items-center"
              onClick={() => handleCancel(booking.bookingId)}
            >
              <XCircle className="h-4 w-4 mr-1.5" />
              Cancel
            </button>
            <button
              className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center"
              onClick={() => toggleBookingDetails(booking.bookingId)}
            >
              <Info className="h-4 w-4 mr-1.5" />
              Detail
            </button>
          </div>
        );
      case "DEPOSITED":
        return (
          <div className="flex space-x-2 mt-3 ">
            <button
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors flex items-center"
              onClick={() => handleCancel(booking.bookingId)}
            >
              <XCircle className="h-4 w-4 mr-1.5" />
              Cancel
            </button>
            <button
              className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center"
              onClick={() => toggleBookingDetails(booking.bookingId)}
            >
              <Info className="h-4 w-4 mr-1.5" />
              Detail
            </button>
          </div>
        );
      case "CONFIRMED":
        return (
          <div className="flex space-x-2 mt-3">
            <button
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 transition-colors flex items-center"
              onClick={() => handleCancel(booking.bookingId)}
            >
              <XCircle className="h-4 w-4 mr-1.5" />
              Cancel
            </button>
            <button
              className="px-3 py-1.5 bg-green-50 text-green-600 rounded-md text-sm font-medium hover:bg-green-100 transition-colors flex items-center"
              onClick={(e) => handlePayment(booking.bookingId, e)}
            >
              <PaymentIcon className="h-4 w-4 mr-1.5" />
              Pay
            </button>
          </div>
        );
      case "COMPLETED":
        return (
          <div className="flex space-x-2 mt-3">
            <button
              className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors flex items-center"
              onClick={(e) => handleViewDetails(booking.bookingId, e)}
            >
              <Info className="h-4 w-4 mr-1.5" />
              Detail
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <SonnerToast toast={toastData} />
      <button
        aria-label="View booking history"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white z-50 transition-all duration-200 hover:scale-110"
        onClick={handleOpen}
      >
        <Calendar className="h-7 w-7" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex justify-end">
          <div
            ref={modalRef}
            className={`bg-white w-full max-w-md h-full overflow-y-auto transform transition-transform duration-300 ease-in-out ${translateX} shadow-xl`}
          >
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 bg-white z-10">
              <h2 className="text-xl font-semibold flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-700" />
                My Bookings
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-100 transition-colors"
                onClick={handleClose}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === "pending"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
              <button
                className={`flex-1 py-3 text-center font-medium transition-colors ${
                  activeTab === "completed"
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
            </div>

            {/* Bookings List */}
            <div className="p-4 space-y-4">
              {loading ? (
                // Loading state
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm animate-pulse"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                          </div>
                          <div className="h-6 w-24 bg-gray-200 rounded-full" />
                        </div>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-200 rounded-full mr-2" />
                            <div className="h-4 w-32 bg-gray-200 rounded" />
                          </div>
                          <div className="flex items-center">
                            <div className="h-4 w-4 bg-gray-200 rounded-full mr-2" />
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                          </div>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <div className="h-8 w-20 bg-gray-200 rounded" />
                          <div className="h-8 w-20 bg-gray-200 rounded" />
                        </div>
                      </div>
                    </div>
                  ))
              ) : filteredBookings.length === 0 ? (
                // Empty state
                <div className="text-center py-12">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    {activeTab === "pending" ? (
                      <Clock className="h-8 w-8 text-gray-500" />
                    ) : (
                      <CheckCircle className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    No {activeTab} bookings
                  </h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    {activeTab === "pending"
                      ? "You don&apos;t have any pending bookings at the moment."
                      : "You don&apos;t have any completed bookings yet."}
                  </p>
                </div>
              ) : (
                // Bookings list
                filteredBookings.map((booking) => {
                  const statusInfo = getStatusInfo(booking.status);
                  const isExpanded = expandedBookingId === booking.bookingId;

                  return (
                    <div
                      key={booking.bookingId}
                      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900 text-lg">
                              {booking.centerName}
                            </h3>
                            <p className="text-gray-600 text-sm mt-0.5">
                              {booking.slotName}
                            </p>
                          </div>
                          <span
                            className={`px-2.5 py-1 text-xs rounded-full flex items-center font-semibold ${statusInfo.color}`}
                          >
                            {statusInfo.icon}
                            {booking.status}
                          </span>
                        </div>

                        <div className="mt-3 space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                            {formatTimestamp(booking.fromTime)?.slice(9)}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                            {formatTimestamp(booking.fromTime)?.slice(
                              0,
                              8,
                            )} - {formatTimestamp(booking.toTime)?.slice(0, 8)}
                          </div>
                        </div>

                        {/* Action buttons based on status */}
                        {renderActionButtons(booking)}

                        {/* Expanded details */}
                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                            <div className="flex items-start">
                              <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  Center Address
                                </div>
                                <div className="text-sm text-gray-600">
                                  {booking.centerAddress}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <User className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  User
                                </div>
                                <div className="text-sm text-gray-600">
                                  {booking.user}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start">
                              <CreditCard className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  Amount
                                </div>
                                <div className="text-sm text-gray-600">
                                  {formatCurrency(booking.amount)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
