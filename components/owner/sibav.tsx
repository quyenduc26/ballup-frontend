"use client";
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Client } from "@stomp/stompjs";
import { Badge } from "@heroui/react";

import PaymentHistory from "../../components/owner/paymentHistory";
import BookingTable from "../../components/owner/booking";
import PaymentRequest from "../../components/owner/paymentRequest";

import { FieldList } from "@/components/owner/field";
import PlayingCenter from "@/components/center/PlayingCenter";
import { NotificationType } from "@/types/common";
import { createStompClient } from "@/config/ws";

export default function SibavSidebar() {
  const [activeTab, setActiveTab] = useState("Field");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [owners, setOwners] = useState([]);

  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parsedData?.id;
  const subscribeChannel =
    parsedData?.role == "USER" ? "/topic/user/" : "/topic/owner/";
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [notifications, setNotification] = useState<NotificationType[]>([]);
  const [unReadBooking, setUnReadBooking] = useState(0);
  const [unReadPayment, setUnReadPayment] = useState(0);

  const handleOnConnect = (notification: NotificationType) => {
    setNotification((prev) => [...prev, notification]);
    if (notification.type == "BOOKING_REQUESTED") {
      setUnReadBooking((prev) => prev + 1);
    } else {
      setUnReadPayment((prev) => prev + 1);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (!userId) return;
    const client = createStompClient(userId, subscribeChannel, handleOnConnect);

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [userId]);

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" onClick={() => setIsSidebarOpen(false)} />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {/* {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )} */}

      {/* Sidebar */}
      <div
        className={`fixed md:static w-64 md:w-1/5 border-r border-gray-200 bg-white min-h-screen pl-5 pt-16 md:pt-10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        <ul className="space-y-4">
          {[
            { key: "Field", label: "Field" },
            { key: "PaymentHistory", label: "Payment History" },
            {
              key: "BookingField",
              label: "Booking Request",
              badgeCount: unReadBooking,
            },
            {
              key: "PaymentRequest",
              label: "Payment Request",
              badgeCount: unReadPayment,
            },
          ].map(({ key, label, badgeCount }) => (
            <li key={key} className="list-none">
              <Badge
                color="danger"
                content={
                  badgeCount && badgeCount > 0
                    ? badgeCount.toString()
                    : undefined
                }
                placement="top-right"
              >
                <button
                  className={`w-full text-left font-bold uppercase p-2 text-sm md:text-base transition-colors hover:bg-blue-50 ${
                    activeTab === key ? "text-blue bg-blue-50" : "text-gray-500"
                  }`}
                  onClick={() => handleTabClick(key)}
                >
                  {label}
                </button>
              </Badge>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 md:w-4/5 pt-16 md:pt-6">
        {activeTab === "Field" && <FieldList setActiveTab={setActiveTab} />}
        {activeTab === "PaymentHistory" && <PaymentHistory />}
        {activeTab === "BookingField" && <BookingTable />}
        {activeTab === "PaymentRequest" && <PaymentRequest />}
        {activeTab === "CreateCenter" && (
          <PlayingCenter setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}
