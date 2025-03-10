"use client";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";

import Schedule from "@/components/booking/Schedule";
import Banner from "@/components/Banner";
import CardList from "@/components/center/CardList";
import SearchBar from "@/components/search/searchPage";
import { CardFieldType } from "@/types/form";
import playingApi from "@/service/playingApi";

export default function Booking() {
  const [fields, setFields] = useState<CardFieldType[]>([]);

  // State lưu trữ các params
  const [params, setParams] = useState<Record<string, string>>({
    name: "",
    address: "",
    fromTime: "",
    toTime: "",
    sport: "",
    sort: "",
  });

  // State kiểm tra quá trình tải dữ liệu
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const searchParams = useSearchParams();

  const updateParams = () => {
    const newParams: Record<string, string> = {};

    if (searchParams.get("name")) newParams.name = searchParams.get("name")!;
    if (searchParams.get("address"))
      newParams.address = searchParams.get("address")!;
    if (searchParams.get("fromTime"))
      newParams.fromTime = searchParams.get("fromTime")!;
    if (searchParams.get("toTime"))
      newParams.toTime = searchParams.get("toTime")!;
    if (searchParams.get("sport")) newParams.sport = searchParams.get("sport")!;
    if (searchParams.get("sort")) newParams.sort = searchParams.get("sort")!;

    setParams(newParams);
  };

  // Hàm fetch dữ liệu
  const fetchData = async () => {
    setIsFetching(true); // Đặt isFetching là true khi bắt đầu fetch dữ liệu
    try {
      const response = await playingApi.getAllCenter(params);

      setFields(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu sân bóng:", error);
      setFields([]);
    } finally {
      setIsFetching(false); // Đặt isFetching là false khi fetch hoàn thành (hoặc lỗi)
    }
  };

  useEffect(() => {
    updateParams(); // Cập nhật tham số từ URL khi component load
  }, [searchParams]); // Thực hiện lại khi searchParams thay đổi

  useEffect(() => {
    fetchData(); // Fetch lại khi params thay đổi
  }, [params]); // Gọi lại khi params thay đổi

  return (
    <Suspense>
      <div className="container mx-auto max-w-[1500px] p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black  md:py-6 text-center md:text-left ml-4 mt-20">
          BOOKING
        </h1>
        <Banner />
        <Schedule />
        <div className="flex justify-center">
          <SearchBar />
        </div>

        {/* Hiển thị Spinner khi đang fetch */}
        {isFetching ? (
          <div className="flex justify-center items-center">
            <Spinner className="mb-5" color="default" />
          </div>
        ) : (
          <div>
            {params.fromTime && params.toTime ? (
              <CardList
                fields={fields}
                queryTime={{
                  fromTime: params.fromTime.toString(),
                  toTime: params.toTime.toString(),
                }}
              />
            ) : (
              <CardList fields={fields} />
            )}
          </div>
        )}
      </div>
    </Suspense>
  );
}
