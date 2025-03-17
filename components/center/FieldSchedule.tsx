"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DatePicker, DateValue, Spinner } from "@heroui/react";
import { getLocalTimeZone, today } from "@internationalized/date";

import { BlockedSlot, ConvertedBlockedSlot, Slot } from "@/types";
import { formatDateTime } from "@/utils/formatVNTime";
import playingApi from "@/service/playingApi";
import { formatTimestamp } from "@/utils/formatTimestamp";

const FieldSchedule = ({ slotList }: { slotList: Slot[] }) => {
  const router = useRouter();
  let defaultDate = today(getLocalTimeZone());
  const [selectedField, setSelectedField] = useState<Slot>(slotList[0]);
  const [checkDate, setCheckDate] = useState<DateValue | null>(defaultDate);
  const [blockedSlots, setBlockedSlots] = useState<BlockedSlot[] | null>();
  const [convertedBlockedSlots, setConvertedBlockedSlots] = useState<
    ConvertedBlockedSlot[] | null
  >();
  const [isLoading, setIsLoading] = useState(true);

  const timeSlots = Array.from({ length: 25 }, (_, i) => {
    return `${String(i % 24).padStart(2, "0")}:00`;
  });

  const handleSelectSlot = (slot: Slot) => {
    setSelectedField(slot);
    const currentUrl = new URL(window.location.href);

    currentUrl.searchParams.set("slotId", slot.id.toString());
    router.push(currentUrl.toString(), { scroll: false });
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchBlockedSlots = async () => {
      if (!checkDate) return;
      const date = new Date(checkDate.year, checkDate.month - 1, checkDate.day);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0)).getTime();
      const endOfDay = new Date(date.setHours(23, 59, 59, 999)).getTime();

      try {
        console.log(selectedField.id, startOfDay, endOfDay);
        const response = await playingApi.getBlockedSlot(
          selectedField.id,
          startOfDay,
          endOfDay,
        );

        setBlockedSlots(response.data);

        const convertedBookings = response.data.map((booking: BlockedSlot) => {
          const fromTime = new Date(booking.fromTime).getTime();
          const toTime = new Date(booking.toTime).getTime();
          const duration = (toTime - fromTime) / 60000;

          return {
            username: booking.creatorName,
            fromTime: formatTimestamp(booking.fromTime)?.slice(0, 5),
            toTime: formatTimestamp(booking.toTime)?.slice(0, 5),
            duration,
            createdBy: booking.createBy,
          };
        });

        console.log(convertedBookings);
        setConvertedBlockedSlots(convertedBookings);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blocked slots", error);
      }
    };

    fetchBlockedSlots();
  }, [selectedField, checkDate]);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-gray-100 text-xl font-bold px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          Slot available checking
          <div className="flex-grow" />
        </div>

        {/* Title and Field Selection Section */}
        <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center justify-between">
          <DatePicker
            className="max-w-[284px] text-start"
            label="Booking date"
            minValue={defaultDate}
            value={checkDate}
            onChange={(date) => setCheckDate(date)}
          />

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
          <div className="border rounded-lg shadow-sm overflow-x-auto max-h-[500px] overflow-y-auto">
            {isLoading ? ( // ✅ Hiển thị khi đang tải
              <div className="p-4 text-center text-gray-600">
                <Spinner color="default" />
              </div>
            ) : (
              <table className="w-full border-collapse min-w-[200px] relative">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left border-b border-gray-300 text-xs font-semibold text-gray-600">
                      Time
                    </th>
                    <th className="p-3 border-b border-gray-300 text-xs font-semibold text-gray-600 w-full">
                      {formatDateTime(checkDate, false)
                        ? `${formatDateTime(checkDate, false)?.slice(6)} - ${selectedField?.name}`
                        : formatDateTime(checkDate, false)}
                    </th>
                  </tr>
                </thead>
                <tbody className="relative">
                  {timeSlots.map((time, index) => {
                    const booking = convertedBlockedSlots?.find(
                      (b) => time >= b.fromTime && time < b.toTime,
                    );

                    return (
                      <tr key={index} className="transition-colors relative">
                        <td className="p-3 border-b border-gray-300 text-sm font-medium text-gray-700">
                          {time}
                        </td>
                        <td className="relative p-3 border-b border-gray-300 text-sm text-gray-700 h-16">
                          {booking && time === booking.fromTime && (
                            <div
                              className={`hover:scale-95 transition absolute p-3 left-0 top-0 w-full ${
                                booking.createdBy === "BY_OWNER"
                                  ? "bg-gray-500"
                                  : "bg-blue-500"
                              } text-white text-xs rounded-md`}
                              style={{
                                height: `${(booking.duration / 60) * 64}px`,
                              }}
                            >
                              {booking.createdBy === "BY_OWNER"
                                ? "CLOSED"
                                : booking.username}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldSchedule;
