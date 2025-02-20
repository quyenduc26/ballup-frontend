"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";

export default function Calendar({ selected, onSelect }: { selected: Date | null; onSelect: (date: Date) => void }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handleDateClick = (day: Date) => {
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

  return (
    <div className="w-full max-w-[500px] p-4 bg-white shadow-md rounded-md">
      {/* Điều hướng tháng */}
      <div className="flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth} className="text-black  px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">{"<"}</button>
        <h2 className="text-black text-lg font-bold text-center ">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={handleNextMonth} className="text-black px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">{">"}</button>
      </div>

      {/* Hiển thị ngày trong tuần */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-red-500 font-semibold mt-8 mr-5">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center">{day}</div>
        ))}
      </div>

      {/* Hiển thị ngày trong tháng */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2 text-black mt-5">
        {days.map((day) => (
          <button
            key={day.toString()}
            onClick={() => handleDateClick(day)}
            className={`p-2 sm:p-3 text-sm w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md 
              ${isSameMonth(day, currentDate) ? "text-black" : "text-gray-400"}
              ${selected && isSameDay(selected, day) ? "bg-black text-white" : "hover:bg-gray-200"}`}
          >
            {format(day, "d")}
          </button>
        ))}
      </div>
    </div>
  );
}
