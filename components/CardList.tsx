"use client";
import { useEffect, useState } from "react";
import CardField from "./CardField";
import playingApi from "@/service/playingApi";
import { CardFieldType } from "@/types";

const ListCard = () => {
  const [fields, setFields] = useState<CardFieldType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await playingApi.getAllCenter();
        const data = response.data;

        if (data?.content && Array.isArray(data.content)) {
          setFields(data.content);
        } else {
          console.error("API không trả về danh sách sân hợp lệ:", data);
          setFields([]);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sân bóng:", error);
        setFields([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-6xl font-bold text-center mb-4">Danh sách sân bóng</h1> */}
      {fields.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fields.map((field) => (
            <CardField key={field.id} field={field} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Không có dữ liệu sân bóng.</p>
      )}
    </div>
  );
};

export default ListCard;
