import { useEffect, useState } from "react";
import {
  Card,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { CompletedBookingResponse } from "@/types/api";
import bookingRequestApi from "@/service/bookingRequestApi";

export default function CompletedBookingTable() {
  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const ownerId = parsedData.id;
  const [bookings, setBookings] = useState<CompletedBookingResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getBookings = async () => {
      setLoading(true);
      const completedBooking = await bookingRequestApi.getCompleted(ownerId);

      setBookings(completedBooking.data);
      setLoading(false);
    };

    getBookings();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Completed Bookings</h1>
      <Card className="p-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Table>
            {/* Table Header */}
            <TableHeader>
              <TableColumn>Booking ID</TableColumn>
              <TableColumn>Slot ID</TableColumn>
              <TableColumn>Creator</TableColumn>
              <TableColumn>Center Name</TableColumn>
              <TableColumn>From</TableColumn>
              <TableColumn>To</TableColumn>
              <TableColumn>Amount</TableColumn>
              <TableColumn>Created At</TableColumn>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.slotId}</TableCell>
                    <TableCell>{booking.creator}</TableCell>
                    <TableCell>{booking.centerName}</TableCell>
                    <TableCell>
                      {new Date(booking.fromTime).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {new Date(booking.toTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{booking.amount.toLocaleString()} VND</TableCell>
                    <TableCell>
                      {new Date(booking.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center" colSpan={8}>
                    No completed bookings found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Card>
    </div>
  );
}
