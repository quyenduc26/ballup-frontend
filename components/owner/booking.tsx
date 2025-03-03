"use client";
import React, { useState, useEffect } from "react";
import bookingRequestApi from "@/service/bookingRequestApi";

import {
    Card,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/react";

interface BookingField {
    id: string;
    slotId: string;
    creator: string;
    fromTime: string;
    toTime: string;
    createdAt: string;
}

export default function BookingTable() {
    const [bookings, setBookings] = useState<BookingField[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch booking list
    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const response = await bookingRequestApi.getBookings(1);
                console.log("Fetched bookings:", response.data);
                setBookings(response.data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);


    // Confirm booking (always send id = 1)
    const handleConfirm = async () => {
        try {
            await bookingRequestApi.confirmBooking(1);
            alert(`Booking 1 confirmed successfully!`);
        } catch (error) {
            console.error("Error confirming booking:", error);
            alert("Failed to confirm booking!");
        }
    };

    // Reject booking (always send id = 1)
    const handleReject = async () => {
        try {
            await bookingRequestApi.rejectBooking(1);
            alert(`Booking 1 rejected successfully!`);
        } catch (error) {
            console.error("Error rejecting booking:", error);
            alert("Failed to reject booking!");
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "N/A"; 
        return new Intl.DateTimeFormat("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(new Date(dateString));
    };
    


    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Management Booking Request</h1>
            <Card className="p-4">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>Playing Slot</TableColumn>
                            <TableColumn>Creator</TableColumn>
                            <TableColumn>From Time</TableColumn>
                            <TableColumn>To Time</TableColumn>
                            <TableColumn>Created At</TableColumn>
                            <TableColumn className="text-center">Action</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell>{booking.id}</TableCell>
                                    <TableCell>{booking.slotId}</TableCell>
                                    <TableCell>{booking.creator}</TableCell>
                                    <TableCell>{formatDate(booking.fromTime)}</TableCell>
                                    <TableCell>{formatDate(booking.toTime)}</TableCell>
                                    <TableCell>{formatDate(booking.createdAt)}</TableCell>

                                    <TableCell>
                                        <div className="flex flex-col sm:flex-row justify-center gap-2">
                                            <button
                                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                                onClick={handleConfirm}
                                            >
                                                Confirm
                                            </button>
                                            <button
                                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                                onClick={handleReject}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </Card>
        </div>
    );
}