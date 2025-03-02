"use client";
import CardField from "./CardField";

const fields = [
  {
    id: 1,
    name: "Sân bóng A",
    address: "123 Đường ABC, Quận 1",
    image: "/images/field1.jpg",
    bookingCount: 120,
    primaryPrice: 200000,
    nightPrice: 250000,
  },
  {
    id: 2,
    name: "Sân bóng B",
    address: "456 Đường XYZ, Quận 2",
    image: "/images/field2.jpg",
    bookingCount: 95,
    primaryPrice: 180000,
    nightPrice: 220000,
  },
  {
    id: 3,
    name: "Sân bóng C",
    address: "789 Đường LMN, Quận 3",
    image: "/images/field3.jpg",
    bookingCount: 150,
    primaryPrice: 220000,
    nightPrice: 270000,
  },
];

const CardList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {fields.map((field) => (
        <CardField key={field.id} {...field} />
      ))}
    </div>
  );
};

export default CardList;
