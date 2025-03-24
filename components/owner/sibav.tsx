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
import notificationApi from "@/service/notificationApi";
import PaymentMethodSettings from "@/components/owner/paymentSetting";

export default function SibavSidebar() {
  const [activeTab, setActiveTab] = useState("Field");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notifications, setNotification] = useState<NotificationType[]>([]);
  const [unReadBooking, setUnReadBooking] = useState(0);
  const [unReadPayment, setUnReadPayment] = useState(0);
  const [unReadBookingIds, setUnReadBookingIds] = useState<number[]>([]);
  const [unReadPaymentIds, setUnReadPaymentIds] = useState<number[]>([]);

  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parsedData?.id;
  const subscribeChannel =
    parsedData?.role === "USER" ? "/topic/user/" : "/topic/owner/";
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const handleOnConnect = (notification: NotificationType) => {
    setNotification((prev) => [notification, ...prev]);
    if (notification.type === "BOOKING_REQUESTED") {
      setUnReadBooking((prev) => prev + 1);
      setUnReadBookingIds((prev) => [...prev, notification.id]);
    } else if (notification.type === "BOOKING_DEPOSITED") {
      setUnReadPayment((prev) => prev + 1);
      setUnReadPaymentIds((prev) => [...prev, notification.id]);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleReadPayment = async () => {
    if (unReadPaymentIds) {
      await notificationApi.markPaymentReqAsRead(unReadPaymentIds);
      setUnReadPayment(0);
    }
  };

  const handleReadBooking = async () => {
    if (unReadBookingIds) {
      await notificationApi.markBookingReqAsRead(unReadBookingIds);
      setUnReadBooking(0);
    }
  };

  const handleTabClick = async (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const response = await notificationApi.getUserNotification(userId);
        const notifications: NotificationType[] = response.data;

        setNotification(notifications);

        const unreadBookingIds = notifications
          .filter((noti) => !noti.read && noti.type === "BOOKING_REQUESTED")
          .map((noti) => noti.id);

        const unreadPaymentIds = notifications
          .filter((noti) => !noti.read && noti.type === "BOOKING_DEPOSITED")
          .map((noti) => noti.id);

        console.log(unreadPaymentIds);

        setUnReadBookingIds(unreadBookingIds);
        setUnReadPaymentIds(unreadPaymentIds);
        setUnReadBooking(unreadBookingIds.length);
        setUnReadPayment(unreadPaymentIds.length);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, [userId]);

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
      <div
        className={`fixed md:static w-64 md:w-1/5 border-r border-gray-200 bg-white min-h-screen pl-5 pt-16 md:pt-10 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } z-40`}
      >
        <ul className="space-y-4">
          {[
            { key: "Field", label: "Manage Fields" },
            { key: "PaymentHistory", label: "Payment History" },
            {
              key: "BookingField",
              label: "Booking Requests",
              badgeCount: unReadBooking,
            },
            {
              key: "PaymentRequest",
              label: "Payment Requests",
              badgeCount: unReadPayment,
            },
            { key: "PaymentEdit", label: "Payment Settings" },
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
      <div className="flex-1 p-4 md:p-6 md:w-4/5 pt-16 md:pt-6">
        {activeTab === "Field" && <FieldList setActiveTab={setActiveTab} />}
        {activeTab === "PaymentHistory" && <PaymentHistory />}
        {activeTab === "PaymentEdit" && <PaymentMethodSettings />}
        {activeTab === "BookingField" && (
          <BookingTable handleReadBooking={handleReadBooking} />
        )}
        {activeTab === "PaymentRequest" && (
          <PaymentRequest handleReadPayment={handleReadPayment} />
        )}
        {activeTab === "CreateCenter" && (
          <PlayingCenter setActiveTab={setActiveTab} />
        )}
      </div>
    </div>
  );
}
