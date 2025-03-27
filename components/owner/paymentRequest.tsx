"use client";

import type { PaymentRequest } from "@/types/owner";

import { useEffect, useState } from "react";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from "@heroui/react";
import { toast, Toaster } from "sonner";

import bookingRequestApi from "@/service/bookingRequestApi";

export default function PaymentTable({
  handleReadPayment,
}: {
  handleReadPayment: () => Promise<void>;
}) {
  const [payments, setPayments] = useState<PaymentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [refresh, setRefresh] = useState(false);

  const getUserId = () => {
    const data = localStorage.getItem("data");
    const parsedData = data ? JSON.parse(data) : null;

    return parsedData?.id || null;
  };

  const fetchPayments = async () => {
    const ownerId = getUserId();

    if (!ownerId) return;
    setIsLoading(true);

    try {
      const response = await bookingRequestApi.getPayments(ownerId);

      setPayments(response.data);
      handleReadPayment();
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Unable to load payment list", {
        description: "Please try again later",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [refresh]);

  const handleConfirm = async (paymentId: number) => {
    setLoadingId(paymentId);
    try {
      await bookingRequestApi.receivePayment(paymentId);
      toast.success("Payment Confirmation Successful!", {
        duration: 3000,
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error("Payment confirmation failed", {
        description: "Please try again later",
        duration: 3000,
      });
    }
    setLoadingId(null);
  };

  const handleReject = async (paymentId: number) => {
    setLoadingId(paymentId);
    try {
      await bookingRequestApi.rejectBooking(paymentId);
      toast.success("Payment declined successfully!", {
        duration: 3000,
      });
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error rejecting payment:", error);
      toast.error("Payment decline failed", {
        description: "Please try again later",
        duration: 3000,
      });
    }
    setLoadingId(null);
  };

  return (
    <div className="p-4 px-2 max-w-6xl mx-auto">
      <Toaster richColors position="top-center" />
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Management Payment Request
      </h1>

      <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Spinner color="primary" size="lg" />
              <p className="mt-4 text-gray-600 font-medium">
                Loading payment requests...
              </p>
            </div>
          ) : payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                No Payment Requests
              </h3>
              <p className="text-gray-600 max-w-md">
                There are currently no payment requests to display. New requests
                will appear here when they are created.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    Booking ID
                  </TableColumn>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    Amount
                  </TableColumn>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    Creator
                  </TableColumn>
                  <TableColumn className="text-center py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    Action
                  </TableColumn>
                </TableHeader>

                <TableBody>
                  {payments
                  .slice()
                  .reverse()
                  .map((payment) => (
                    <TableRow
                      key={payment.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <TableCell className="py-4 px-6">{payment.id}</TableCell>
                      <TableCell className="py-4 px-6 font-medium">
                        {payment.amount.toLocaleString()} VND
                      </TableCell>
                      <TableCell className="py-4 px-6">
                        {payment.creator}
                      </TableCell>
                      <TableCell className="py-3 px-6">
                        <div className="flex items-center justify-center gap-3">
                          {/* Confirm Button */}
                          <Button
                            className="text-white font-medium px-4 py-2 min-w-[90px] transition-all duration-200 hover:opacity-90"
                            color="success"
                            disabled={loadingId === payment.id}
                            onPress={() => handleConfirm(payment.id)}
                          >
                            {loadingId === payment.id ? (
                              <Spinner color="white" size="sm" />
                            ) : (
                              "Confirm"
                            )}
                          </Button>

                          {/* Reject Button */}
                          <Button
                            className="font-medium px-4 py-2 min-w-[90px] transition-all duration-200 hover:opacity-90"
                            color="danger"
                            disabled={loadingId === payment.id}
                            onPress={() => handleReject(payment.id)}
                          >
                            {loadingId === payment.id ? (
                              <Spinner color="white" size="sm" />
                            ) : (
                              "Reject"
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
