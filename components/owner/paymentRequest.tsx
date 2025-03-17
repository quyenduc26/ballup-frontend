"use client"

import { useEffect, useState } from "react"
import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Spinner } from "@heroui/react"
import type { PaymentRequest } from "@/types/owner"
import bookingRequestApi from "@/service/bookingRequestApi"

export default function PaymentTable() {
  const [payments, setPayments] = useState<PaymentRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [refresh, setRefresh] = useState(false)

  // Lấy userId từ localStorage
  const getUserId = () => {
    const data = localStorage.getItem("data")
    const parsedData = data ? JSON.parse(data) : null
    return parsedData?.id || null
  }

  // Gọi API lấy danh sách payments
  const fetchPayments = async () => {
    const ownerId = getUserId()
    if (!ownerId) return
    setIsLoading(true)

    try {
      const response = await bookingRequestApi.getPayments(ownerId)
      setPayments(response.data)
    } catch (error) {
      console.error("Error fetching payments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // useEffect chạy lại khi refresh thay đổi
  useEffect(() => {
    fetchPayments()
  }, [refresh]) // Mỗi khi refresh thay đổi, danh sách cập nhật lại

  // Xử lý Confirm Payment
  const handleConfirm = async (paymentId: number) => {
    setLoadingId(paymentId)
    try {
      await bookingRequestApi.receivePayment(paymentId)
      alert("Payment confirmed successfully!")
      setRefresh((prev) => !prev) // Kích hoạt cập nhật danh sách
    } catch (error) {
      console.error("Error confirming payment:", error)
      alert("Failed to confirm payment.")
    }
    setLoadingId(null)
  }

  // Xử lý Reject Payment
  const handleReject = async (paymentId: number) => {
    setLoadingId(paymentId)
    try {
      await bookingRequestApi.rejectBooking(paymentId)
      alert("Payment rejected successfully!")
      setRefresh((prev) => !prev) // Kích hoạt cập nhật danh sách
    } catch (error) {
      console.error("Error rejecting payment:", error)
      alert("Failed to reject payment.")
    }
    setLoadingId(null)
  }

  return (
    <div className="p-4 px-2 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Management Payment Request</h1>

      <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-2">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Spinner color="primary" size="lg" />
              <p className="mt-4 text-gray-600 font-medium">Loading payment requests...</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Payment Requests</h3>
              <p className="text-gray-600 max-w-md">
                There are currently no payment requests to display. New requests will appear here when they are created.
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
                  {payments.map((payment) => (
                    <TableRow key={payment.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <TableCell className="py-4 px-6">{payment.id}</TableCell>
                      <TableCell className="py-4 px-6 font-medium">{payment.amount.toLocaleString()} VND</TableCell>
                      <TableCell className="py-4 px-6">{payment.creator}</TableCell>
                      <TableCell className="py-3 px-6">
                        <div className="flex items-center justify-center gap-3">
                          {/* Confirm Button */}
                          <Button
                            color="success"
                            onPress={() => handleConfirm(payment.id)}
                            disabled={loadingId === payment.id}
                            className="text-white font-medium px-4 py-2 min-w-[90px] transition-all duration-200 hover:opacity-90"
                          >
                            {loadingId === payment.id ? <Spinner color="white" size="sm" /> : "Confirm"}
                          </Button>

                          {/* Reject Button */}
                          <Button
                            color="danger"
                            onPress={() => handleReject(payment.id)}
                            disabled={loadingId === payment.id}
                            className="font-medium px-4 py-2 min-w-[90px] transition-all duration-200 hover:opacity-90"
                          >
                            {loadingId === payment.id ? <Spinner color="white" size="sm" /> : "Reject"}
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
  )
}

