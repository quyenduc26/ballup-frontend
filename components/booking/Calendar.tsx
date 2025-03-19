"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  getDay,
} from "date-fns";

export default function Calendar({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (date: Date) => void;
}) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleDateClick = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00 để so sánh chính xác

    if (day < today) {
      return; // Không cho phép chọn ngày trong quá khứ
    }

    onSelect(day);
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => addMonths(prev, 1));
  };

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start, end });

  const startDayIndex = (getDay(start) + 6) % 7; // Điều chỉnh vì date-fns bắt đầu từ Chủ Nhật

  // Thêm ngày trống đầu tháng (nếu cần)
  const blankDays = Array(startDayIndex).fill(null);

  return (
    <div className="w-full max-w-[500px] p-4 bg-white shadow-md rounded-md">
      {/* Điều hướng tháng */}
      <div className="flex justify-between items-center mb-2">
        <button
          className="text-black px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={handlePrevMonth}
        >
          {"<"}
        </button>
        <h2 className="text-black text-lg font-bold text-center">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          className="text-black px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
          onClick={handleNextMonth}
        >
          {">"}
        </button>
      </div>

      {/* Hiển thị ngày trong tuần */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-red-500 font-semibold mt-5">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-[11px] sm:text-sm">
            {day}
          </div>
        ))}
      </div>

      {/* Hiển thị ngày trong tháng */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-black mt-5">
        {/* Hiển thị ngày trống đầu tháng */}
        {blankDays.map((_, index) => (
          <div
            key={`blank-${index}`}
            className="p-2 sm:p-3 w-8 h-8 sm:w-10 sm:h-10"
          />
        ))}

        {/* Hiển thị ngày trong tháng */}
        {days.map((day) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const isPastDay = day < today;

          return (
            <button
              key={day.toString()}
              className={`p-2 sm:p-3 text-sm w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md 
                ${isSameMonth(day, currentDate) ? "text-black" : "text-gray-400"}
                ${selected && isSameDay(selected, day) ? "bg-black text-white" : "hover:bg-gray-200"}
                ${isPastDay ? "opacity-50 cursor-not-allowed" : ""}`} // Làm mờ ngày đã qua
              onClick={() => !isPastDay && handleDateClick(day)} // Chặn chọn ngày đã qua
              disabled={isPastDay} // Vô hiệu hóa button
            >
              {format(day, "d")} 
            </button>
          );
        })}
      </div>
    </div>
  );
}
