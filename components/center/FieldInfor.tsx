"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { FieldDetailType } from "@/types/form";
import playingApi from "@/service/playingApi";

const BookingDetail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const centerId = searchParams.get("id"); // Lấy ID từ URL

  const [bookingInfo, setBookingInfo] = useState<FieldDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!centerId) return;

    const fetchCenterInfo = async () => {
      try {
        const response = await playingApi.getCenterInfor(centerId);
        console.log(response)
        setBookingInfo({
          ...response.data,
          bookingTime: "20:00 12/12/2012", // Giữ nguyên giá trị fix cứng
          returnTime: "21:00 12/12/2012",
          type: "5-player",
          price: "200,000 vnd",
          hours: 1,
          total: "200,000 vnd",
        });
        console.log(response.data)
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sân bóng:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterInfo();
  }, [centerId]);

  if (loading) return <p className="text-center mt-10">Đang tải...</p>;
  if (!bookingInfo) return <p className="text-center mt-10">Không tìm thấy sân bóng</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      {/* Nút BACK */}
      <button onClick={() => router.back()} className="flex items-center text-black font-semibold mb-4">
        <span className="text-2xl mr-2">←</span> BACK
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Bên trái - Hiển thị ảnh */}
        <div className="flex-1">
          <Image
            src={bookingInfo.imageUrls?.[0] || "/images/default.png"}
            alt="Main field"
            width={600}
            height={400}
            className="rounded-lg w-full h-auto object-cover"
          />
          <div className="flex gap-2 mt-2">
            {bookingInfo.imageUrls?.slice(1).map((img, index) => (
              <Image key={index} src={img} alt={`Field ${index + 2}`} width={150} height={100} className="rounded-lg object-cover cursor-pointer" />
            ))}
          </div>
        </div>

        {/* Bên phải - Form đặt sân */}
        <div className="flex-1 border p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold">{bookingInfo.name}</h2>
          <p className="text-gray-500">{bookingInfo.address}</p>
          <p className="text-gray-500">{bookingInfo.description}</p>

          {/* Google Map */}
          <div className="mt-2">
            <iframe src={bookingInfo.mapUrl} width="100%" height="200" className="rounded-lg border" allowFullScreen loading="lazy"></iframe>
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <p className="font-semibold">From</p>
              <p>{bookingInfo.bookingTime}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">To</p>
              <p>{bookingInfo.returnTime}</p>
            </div>
          </div>

          <div className="mt-4 border-t pt-2">
            <div className="flex justify-between">
              <p className="font-semibold">Type</p>
              <p>{bookingInfo.type}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Price</p>
              <p>{bookingInfo.price}</p>
            </div>
            <div className="flex justify-between">
              <p className="font-semibold">Hour(s)</p>
              <p>{bookingInfo.hours}</p>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-2">
              <p>Total</p>
              <p>{bookingInfo.total}</p>
            </div>
          </div>

          <button className="w-full bg-black text-white py-2 mt-4 rounded-lg">DEPOSIT</button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
