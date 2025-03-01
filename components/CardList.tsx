"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CardField from "./CardField";
import { CardFieldType } from "@/types";

const CardList = () => {
  const [fields, setFields] = useState<CardFieldType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("https://6520d2b6906e276284c4b174.mockapi.io/product");
        console.log("API Response:", response.data);

        if (Array.isArray(response.data)) {
          setFields(response.data);
        } else {
          setFields([]);
          setError("Dữ liệu trả về không hợp lệ.");
        }
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-full max-w-lg mx-auto p-6 bg-gray-200 animate-pulse rounded-lg h-60"
          ></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {fields.length > 0 ? (
        fields.map((field) => <CardField key={field.id} {...field} />)
      ) : (
        <p className="text-center text-gray-500 col-span-full">Không có dữ liệu</p>
      )}
    </div>
  );
};

export default CardList;
