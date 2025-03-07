"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";

import Calendar from "@/components/booking/Calendar";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [fromTime, setBookingTime] = useState("");
  const [toTime, setReturnTime] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (!selectedDate) {
      alert("Please select a date!");

      return;
    }

    if (!fromTime) {
      alert("Please select a start time!");

      return;
    }

    if (!toTime) {
      alert("Please select an end time!");

      return;
    }

    const convertToTimestamp = (time: string) => {
      const [hours, minutes] = time.split(":").map(Number);

      return selectedDate
        ? new Date(selectedDate.setHours(hours, minutes, 0, 0)).getTime()
        : null;
    };

    const fromTimestamp = convertToTimestamp(fromTime);
    const toTimestamp = convertToTimestamp(toTime);

    if (!fromTimestamp || !toTimestamp) {
      alert("Invalid time format!");

      return;
    }

    setLoading(true);

    params.set("location", location || "Not specified");
    params.set("fromTime", fromTimestamp.toString());
    params.set("toTime", toTimestamp.toString());

    router.replace(`/booking?${params.toString()}`, { scroll: false });
    setLoading(false);
  };

  return (
    <div className="flex  sm: flex-col p-4 sm:p-8 mb-10 mt-20 ml-1 ">
      <div className="flex flex-col sm:ml-32 md:flex-row gap-6 w-full max-w-[1200px] bg-white p-6 sm:p-8 shadow-lg rounded-md">
        {/* Calendar */}
        <div className="w-full md:w-[50%]">
          <h2 className="text-2xl  font-bold mb-4 text-center text-black md:text-left bg-clip-text">
            MAY 2025
          </h2>
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Schedule */}
        <div className="w-full md:w-[45%]">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-black bg-clip-text">
            SCHEDULE
          </h2>

          <div className="mb-4">
            <p className="text-black text-left flex flex-col ">BOOKING TIME</p>
            <input
              className="border p-2 w-full rounded-xl h-14"
              type="time"
              value={fromTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <p className="text-black text-left flex flex-col">RETURN TIME</p>
            <input
              className="border p-2 w-full rounded-xl h-14"
              type="time"
              value={toTime}
              onChange={(e) => setReturnTime(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <p className="text-black text-left flex flex-col">LOCATION</p>
            <input
              className="border p-2 w-full rounded-xl h-14"
              placeholder="Enter your location (Optional)"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button
            className={`p-3 w-full mt-8 rounded-xl h-14 text-white ${
              loading ? "bg-black" : "bg-black hover:bg-gray-800 text-white"
            }`}
            disabled={loading}
            onClick={handleCheck}
          >
            {loading ? <Spinner color="default" /> : "CHECK"}
          </button>
        </div>
      </div>
    </div>
  );
}
