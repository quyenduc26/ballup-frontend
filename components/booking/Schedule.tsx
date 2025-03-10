"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";
import { SonnerToast } from "../sonnerMesage";
import Calendar from "@/components/booking/Calendar";

export default function Schedule() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [fromTime, setBookingTime] = useState("");
  const [toTime, setReturnTime] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleCheck = () => {
    if (!selectedDate) {
      setToast({ message: "Please select a date!", type: "error" } as any);
      return;
    }

    if (!fromTime) {
      setToast({ message: "Please select a start time!", type: "error" } as any);
      return;
    }

    if (!toTime) {
      setToast({ message: "Please select an end time!", type: "error" } as any);
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
      setToast({ message: "Invalid time format!", type: "error" } as any);
      return;
    }

    setLoading(true);

    if (address) {
      params.set("address", address);
    } else {
      params.delete("address");
    }

    if (fromTimestamp) {
      params.set("fromTime", fromTimestamp.toString());
    } else {
      params.delete("fromTime");
    }

    if (toTimestamp) {
      params.set("toTime", toTimestamp.toString());
    } else {
      params.delete("toTime");
    }

    router.replace(`/booking?${params.toString()}`, { scroll: false });
    setLoading(false);
  };
  const handleClear = () => {
    setSelectedDate(null);
    setBookingTime("");
    setReturnTime("");
    setAddress("");

    const clearParams = new URLSearchParams(window.location.search);
    clearParams.delete("fromTime");
    clearParams.delete("toTime");
    router.replace(`/booking?${clearParams.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-center items-center p-4 sm:p-8 mb-10 mt-20 ml-1">
      <div className="flex flex-col  md:flex-row gap-6 w-full max-w-[1200px] bg-white p-6 sm:p-8 shadow-lg rounded-md mr-3">
        <div className="w-full md:w-[50%]">
          <h2 className="text-2xl font-bold mb-4 text-center text-black md:text-left bg-clip-text">
            CALENDAR
          </h2>
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        <div className="w-full md:w-[45%]">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left text-black bg-clip-text">
            SCHEDULE
          </h2>

          <div className="mb-4">
            <p className="text-black text-left flex flex-col">Start Time</p>
            <input
              className="border p-2 w-full rounded-xl h-14"
              type="time"
              value={fromTime}
              onChange={(e) => setBookingTime(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <p className="text-black text-left flex flex-col">End Time</p>
            <input
              className="border p-2 w-full rounded-xl h-14"
              type="time"
              value={toTime}
              onChange={(e) => setReturnTime(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <p className="text-black text-left flex flex-col">Address</p>
            <input
              className="border p-2 w-full rounded-xl h-14 text-[13px] sm:text-sm"
              placeholder="Enter your address (Optional)"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex gap-4 text-[12px] sm:text-xl">
            <button
              className="p-3 w-full rounded-xl h-14 text-black border-2 border-black font-bold hover:scale-95 transition"
              onClick={handleClear}
            >
              CLEAR TIME
            </button>
            <button
              className={`p-3 w-full rounded-xl h-14 text-white font-bold hover:scale-95 transition ${
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
      {toast && <SonnerToast toast={toast} />}
    </div>
  );
}