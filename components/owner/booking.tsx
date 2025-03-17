"use client"

import { useState, useEffect } from "react"
import { Card, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from "@heroui/react"

import bookingRequestApi from "@/service/bookingRequestApi"
import type { BookingField } from "@/types/owner"

export default function BookingTable() {
  const [bookings, setBookings] = useState<BookingField[]>([])
  const [loading, setLoading] = useState(false)
  const [ownerId, setOwnerId] = useState<number | null>(null)

  // Lấy ownerId từ localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("data")
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData)
        setOwnerId(parsedData?.id || null)
      } catch (error) {
        console.error("Error parsing owner ID:", error)
      }
    }
  }, [])

  // Fetch booking list khi ownerId đã có
  useEffect(() => {
    if (!ownerId) return

    const fetchBookings = async () => {
      setLoading(true)
      try {
        const response = await bookingRequestApi.getBookings(ownerId)
        setBookings(response.data)
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [ownerId])

  // Confirm booking (dùng id từ booking thay vì đặt cứng)
  const handleConfirm = async (id: number) => {
    try {
      await bookingRequestApi.confirmBooking(id)
      alert(`Booking ${id} confirmed successfully!`)
      setBookings((prev) => prev.filter((b) => b.id !== id))
    } catch (error) {
      console.error("Error confirming booking:", error)
      alert("Failed to confirm booking!")
    }
  }

  // Reject booking (dùng id từ booking thay vì đặt cứng)
  const handleReject = async (id: number) => {
    try {
      await bookingRequestApi.rejectBooking(id)
      alert(`Booking ${id} rejected successfully!`)
      setBookings((prev) => prev.filter((b) => b.id !== id))
    } catch (error) {
      console.error("Error rejecting booking:", error)
      alert("Failed to reject booking!")
    }
  }

  // Format thời gian
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(dateString))
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Management Booking Request</h1>

      <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Spinner color="primary" size="lg" />
              <p className="mt-4 text-gray-600 font-medium">Loading booking requests...</p>
            </div>
          ) : bookings.length === 0 ? (
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Booking Requests</h3>
              <p className="text-gray-600 max-w-md">
                There are currently no booking requests to display. New booking requests will appear here when they are
                created.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">ID</TableColumn>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    Playing Slot
                  </TableColumn>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    Creator
                  </TableColumn>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    From Time
                  </TableColumn>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    To Time
                  </TableColumn>
                  <TableColumn className="text-left py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    Created At
                  </TableColumn>
                  <TableColumn className="text-center py-4 px-6 bg-gray-50 font-semibold text-gray-700">
                    Action
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <TableCell className="py-4 px-6">{booking.id}</TableCell>
                      <TableCell className="py-4 px-6">{booking.slotId}</TableCell>
                      <TableCell className="py-4 px-6">{booking.creator}</TableCell>
                      <TableCell className="py-4 px-6">{formatDate(booking.fromTime)}</TableCell>
                      <TableCell className="py-4 px-6">{formatDate(booking.toTime)}</TableCell>
                      <TableCell className="py-4 px-6">{formatDate(booking.createdAt)}</TableCell>
                      <TableCell className="py-3 px-6">
                        <div className="flex flex-col sm:flex-row justify-center gap-3">
                          <button
                            className="px-4 py-2 bg-green-500 text-white rounded font-medium min-w-[90px] transition-all duration-200 hover:bg-green-600"
                            onClick={() => handleConfirm(booking.id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded font-medium min-w-[90px] transition-all duration-200 hover:bg-red-600"
                            onClick={() => handleReject(booking.id)}
                          >
                            Reject
                          </button>
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

