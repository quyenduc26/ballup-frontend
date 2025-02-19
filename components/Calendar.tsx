"use client";

import { useState } from "react";
import { format } from "date-fns";

export default function Calendar({ selected, onSelect }: { selected: Date | null; onSelect: (date: Date) => void }) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    onSelect(newDate);
  };

  return (
    <div className="w-full  max-w-[500px] p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold text-center mb-2">{format(currentDate, "MMMM yyyy")}</h2>
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {Array(firstDay)
          .fill(null)
          .map((_, i) => (
            <div key={i} />
          ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            onClick={() => handleDateClick(day)}
            className={`p-2 sm:p-3 text-sm w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-md ${
              selected && selected.getDate() === day ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
