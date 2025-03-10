"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import FieldInfor from "@/components/center/FieldInfor";
import FieldSchedule from "@/components/center/FieldSchedule";
import { FieldDetailType } from "@/types/form";
import playingApi from "@/service/playingApi";
import { formatDate } from "@/utils/formatTime";
import { calculatePrice } from "@/utils/calculatePrice";

export default function BookingPage() {
  const params = useParams();
  const centerId = params.centerId;

  const queryParams = new URLSearchParams(location.search);
  const fromTime = queryParams.get("fromTime");
  const toTime = queryParams.get("toTime");

  const centerIdNumber = parseInt(
    Array.isArray(centerId) ? centerId[0] : centerId || "0",
  );

  const [bookingInfo, setBookingInfo] = useState<FieldDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!centerId) return;

    const fetchCenterInfo = async () => {
      try {
        if (centerIdNumber) {
          const response = await playingApi.getCenterInfor(centerIdNumber);
          const { price, totalPrice, hours } = calculatePrice(
            response.data.slots,
            fromTime,
            toTime,
          );

          setBookingInfo({
            ...response.data,
            bookingTime: formatDate(fromTime),
            returnTime: formatDate(toTime),
            price: price,
            hours: hours,
            total: totalPrice,
          });
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sân bóng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterInfo();
  }, [centerId]);

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (!bookingInfo)
    return <p className="text-center mt-10">Không tìm thấy sân bóng</p>;

  return (
    <div>
      <FieldInfor centerInfor={bookingInfo} />
      <FieldSchedule slotList={bookingInfo.slots} />
    </div>
  );
}
