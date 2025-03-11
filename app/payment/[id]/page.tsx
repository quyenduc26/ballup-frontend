"use client";

import { useParams } from "next/navigation";
import React from "react";

import ScanPayment from "@/components/booking/ScanPayment";

export default function Page() {
  const params = useParams();
  const bookingId = params.id ? Number(params.id) : null;

  if (!bookingId) {
    return <div>Error: Booking ID is missing or invalid</div>;
  }

  return <ScanPayment bookingId={bookingId} />;
}
