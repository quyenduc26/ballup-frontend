"use client";
import { useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import Calendar from "@/components/Calendar";
import { ScheduleType } from "@/types/form";
import Schedule from "@/service/ScheduleApi";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingTime, setBookingTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!selectedDate || !bookingTime || !returnTime) {
      alert("Please fill in all required fields!");
      return;
    }
  
    const scheduleData: ScheduleType = {
      date: format(selectedDate, "yyyy-MM-dd"),
      bookingTime,
      returnTime,
      location: location || "Not specified",
    };
  
    try {
      setLoading(true);
      const response = await Schedule.Schedule(scheduleData); // Gọi API từ service
      alert("Booking successful! 🎉");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while booking!");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex w-full flex-col items-center p-4 sm:p-8 bg-gray-100">
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-[1200px] bg-white p-6 sm:p-8 shadow-lg rounded-md">
        {/* Calendar */}
        <div className="w-full md:w-[50%]">
          <h2 className="text-xl font-bold mb-4 text-center text-black md:text-left">MAY 2025</h2>
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Schedule */}
        <div className="w-full md:w-[45%]">
          <h2 className="text-xl font-bold mb-4 text-center md:text-left text-black">SCHEDULE</h2>

          <div className="mb-4">
            <p className="text-gray-500">BOOKING TIME</p>
            <input
              type="time"
              value={bookingTime}
              onChange={(e) => setBookingTime(e.target.value)}
              className="border p-2 w-full rounded-xl"
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-500">RETURN TIME</p>
            <input
              type="time"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="border p-2 w-full rounded-xl"
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-500">LOCATION</p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location (Optional)"
              className="border p-2 w-full rounded-xl"
            />
          </div>

          <button
            onClick={handleCheck}
            disabled={loading}
            className={`p-3 w-full mt-10 rounded-xl ${
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
