"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FieldSchedule = () => {
  const router = useRouter();

  // Danh sách sân
  const fields = ["Sân 1", "Sân 2", "Sân 3", "Sân 4"];

  // Danh sách khung giờ (8:00 AM → 1:00 PM)
  const timeSlots = ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"];

  // Danh sách ngày trong tuần
  const weekDays = [
    { day: "MON", date: 2 },
    { day: "TUE", date: 3 },
    { day: "WED", date: 4 },
    { day: "THU", date: 5 },
    { day: "FRI", date: 6 },
    { day: "SAT", date: 7 },
    { day: "SUN", date: 8 },
  ];

  // Dữ liệu đặt sân
  const bookings = [
    { field: "Sân 1", day: 2, time: "8:00 AM", name: "D. Quyen", color: "bg-blue-500" },
    { field: "Sân 2", day: 3, time: "9:00 AM", name: "D. Quyen", color: "bg-green-500" },
    { field: "Sân 3", day: 5, time: "10:00 AM", name: "D. Quyen", color: "bg-orange-500" },
    { field: "Sân 4", day: 6, time: "11:00 AM", name: "D. Quyen", color: "bg-pink-500" },
  ];

  // Trạng thái sân đang chọn
  const [selectedField, setSelectedField] = useState("Sân 1");

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Button Back */}
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-gray-300 rounded-md"
      >
        Back
      </button>

      {/* Tiêu đề + Thanh chọn sân */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">FIELD SCHEDULE</h1>
          <h2 className="text-lg font-semibold mt-2">MAY 24, 2025</h2>
        </div>

        {/* Thanh chọn sân (nằm bên phải) */}
        <div className="flex gap-2">
          {fields.map((field) => (
            <button
              key={field}
              onClick={() => setSelectedField(field)}
              className={`px-4 py-2 rounded-md border ${
                selectedField === field ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {field}
            </button>
          ))}
        </div>
      </div>

      {/* Lịch đặt sân */}
      <div className="border mt-4 rounded-lg shadow-lg bg-white overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left border border-gray-300">Time</th>
              {weekDays.map((day) => (
                <th key={day.day} className="p-2 text-center border border-gray-300">
                  {day.day} <br /> {day.date}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {timeSlots.map((time) => (
              <tr key={time}>
                <td className="p-2 border border-gray-300">{time}</td>
                {weekDays.map((day) => {
                  const booking = bookings.find(
                    (b) => b.field === selectedField && b.time === time && b.day === day.date
                  );

                  return (
                    <td key={day.day} className="p-2 text-center border border-gray-300">
                      {booking ? (
                        <div className={`text-white p-2 rounded-md ${booking.color}`}>
                          <p className="text-sm font-semibold">{booking.name}</p>
                          <p className="text-xs">1 HOUR</p>
                        </div>
                      ) : (
                        <div className="p-2 text-gray-400"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FieldSchedule;