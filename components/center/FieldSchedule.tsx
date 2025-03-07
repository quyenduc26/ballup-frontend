"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker, DateValue } from "@heroui/react";

import { Slot } from "@/types";
import { formatDateTime } from "@/utils/formatVNTime";

const FieldSchedule = ({ slotList }: { slotList: Slot[] }) => {
  const router = useRouter();
  const [selectedField, setSelectedField] = useState<Slot>(slotList[0]);

  const [checkDate, setCheckDate] = useState<DateValue | null>();

  const fields = ["Sân 1", "Sân 2", "Sân 3", "Sân 4"];
  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
  ];
  const weekDays = [
    { day: "MON", date: 2 },
    { day: "TUE", date: 3 },
    { day: "WED", date: 4 },
    { day: "THU", date: 5 },
    { day: "FRI", date: 6 },
    { day: "SAT", date: 7 },
    { day: "SUN", date: 8 },
  ];

  const bookings = [
    {
      field: "Sân 1",
      day: 2,
      time: "8:00 AM",
      name: "D. Quyen",
      color: "bg-blue-500",
    },
    {
      field: "Sân 2",
      day: 3,
      time: "9:00 AM",
      name: "D. Quyen",
      color: "bg-green-500",
    },
    {
      field: "Sân 3",
      day: 5,
      time: "10:00 AM",
      name: "D. Quyen",
      color: "bg-orange-500",
    },
    {
      field: "Sân 4",
      day: 6,
      time: "11:00 AM",
      name: "D. Quyen",
      color: "bg-pink-500",
    },
  ];

  const handleSelectSlot = (slot: Slot) => {
    setSelectedField(slot);
    const currentUrl = new URL(window.location.href);

    currentUrl.searchParams.set("slotId", slot.id.toString());
    router.push(currentUrl.toString(), { scroll: false });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-100 px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <button
            className="flex items-center text-black font-bold text-xl hover:text-black transition-colors"
            onClick={() => router.back()}
          >
            <svg
              className="h-6 w-6 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19l-7-7 7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Back
          </button>
          <div className="flex-grow" />
        </div>

        {/* Title and Field Selection Section */}
        <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between">
          <DatePicker
            className="max-w-[284px] text-start"
            label="Booking date"
            value={checkDate}
            onChange={(date) => setCheckDate(date)}
          />
          <p className="text-default-500 text-sm">
            Selected date: {formatDateTime(checkDate, false)}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {slotList.map((slot, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedField === slot
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => handleSelectSlot(slot)}
              >
                {slot.name}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Table */}
        <div className="p-6">
          <div className="border rounded-lg shadow-sm overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left border-r border-b border-gray-300 text-xs font-semibold text-gray-600">
                    Time
                  </th>
                  {weekDays.map((day, index) => (
                    <th
                      key={day.day}
                      className={`p-3 text-center border-b border-gray-300 text-xs font-semibold text-gray-600 
                        ${index < weekDays.length - 1 ? "border-r" : ""}`}
                    >
                      {day.day} <br /> {day.date}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((time) => (
                  <tr key={time} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 border-r border-b border-gray-300 text-sm font-medium text-gray-700">
                      {time}
                    </td>
                    {/* {weekDays.map((day, index) => {
                      const booking = bookings.find(
                        (b) =>
                          b.field === selectedField &&
                          b.time === time &&
                          b.day === day.date,
                      );

                      return (
                        <td
                          key={day.day}
                          className={`p-3 border-b border-gray-300 text-center 
                            ${index < weekDays.length - 1 ? "border-r" : ""}`}
                        >
                          {booking ? (
                            <div
                              className={`rounded-md p-2 ${booking.color} text-white`}
                            >
                              <p className="font-semibold text-xs">
                                {booking.name}
                              </p>
                              <p className="text-[10px] opacity-80">1 HOUR</p>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-xs">-</div>
                          )}
                        </td>
                      );
                    })} */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldSchedule;
