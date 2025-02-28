"use client";
import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import Calendar from "@/components/booking/Calendar";
import { ScheduleType } from "@/types/form";

export default function Home() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [fromTime, setBookingTime] = useState("");
  const [toTime, setReturnTime] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (!selectedDate || !fromTime || !toTime) {
      alert("Please fill in all required fields!");
      return;
    }

    // Convert từ HH:mm sang timestamp (milliseconds)
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

    // Push dữ liệu lên URL
    router.push(
      `/center/search?location=${location || "Not specified"}&fromTime=${fromTimestamp}&toTime=${toTimestamp}`
    );
  };

  return (
    <div className="flex  w-[1200px] flex-col items-center p-4 sm:p-8 bg-gray-100 mb-10 mt-20 ml-44">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-[1200px] bg-white p-6 sm:p-8 shadow-lg rounded-md">
        {/* Calendar */}
        <div className="w-full md:w-[50%]">
          <h2 className="text-xl font-bold mb-4 text-center text-black md:text-left">
            MAY 2025
          </h2>
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Schedule */}
        <div className="w-full md:w-[45%]">
          <h2 className="text-xl font-bold mb-4 text-center md:text-left text-black">
            SCHEDULE
          </h2>

          <div className="mb-4">
            <p className="text-gray-500">BOOKING TIME</p>
            <input
              type="time"
              value={fromTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="border p-2 w-full rounded-xl h-14"
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-500">RETURN TIME</p>
            <input
              type="time"
              value={toTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="border p-2 w-full rounded-xl h-14"
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-500">LOCATION</p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location (Optional)"
              className="border p-2 w-full rounded-xl h-14"
            />
          </div>

          <button
            onClick={handleCheck}
            disabled={loading}
            className={`p-3 w-full mt-8 rounded-xl h-14 ${
              loading ? "bg-gray-400" : "bg-black hover:bg-gray-800 text-white"
            }`}
          >
            {loading ? "Processing..." : "CHECK"}
          </button>
        </div>
      </div>
    </div>
  );
}
