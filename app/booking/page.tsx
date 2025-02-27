"use client";
import CardList from "@/components/CardList";
import CardField from "@/components/CardField";
import React from "react";
import { CardFieldType } from "@/types"; // Đảm bảo import type chính xác

export default function Page() {
  const cardFieldProps: CardFieldType = {
    id: 1,
    name: "Sân bóng ABC",
    address: "123 Đường ABC, TP. HCM",
    type: "Football", // Đảm bảo giá trị hợp lệ với PlayingCenterType
    bookingCount: 5,
    image: "https://example.com/image.jpg",
    primaryPrice: 200000,
    nightPrice: 250000,
  };

  return (
    <div>
      <CardField {...cardFieldProps} />
      <CardList />
    </div>
  );
}
