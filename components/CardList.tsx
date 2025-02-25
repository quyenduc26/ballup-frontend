"use client";
import { useEffect, useState } from "react";
import CardField, { CardFieldType } from "./CardField";
import axios from "axios";

const CardList = () => {
  const [fields, setFields] = useState<CardFieldType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get("https://6520d2b6906e276284c4b174.mockapi.io/product");
        setFields(response.data);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchFields();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Đang tải...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {fields.map((field) => (
        <CardField key={field.id} {...field} />
      ))}
    </div>
  );
};

export default CardList;
