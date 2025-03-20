"use client";

import type { Client } from "@stomp/stompjs";
import type { NotificationType } from "@/types";

import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@heroui/react";

import { createStompClient } from "@/config/ws";
import NotificationItem from "@/components/NotificationItem";

export default function Notification() {
  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parsedData?.id;
  const subscribeChannel =
    parsedData?.role == "USER" ? "/topic/user/" : "/topic/owner/";

  const [showNotifications, setShowNotifications] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [notifications, setNotification] = useState<NotificationType[]>([]);
  const [unRead, setUnRead] = useState(0);

  // Add ref for notification container and button
  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  //prepare for ws param
  const handleOnConnect = (notification: NotificationType) => {
    setNotification((prev) => [...prev, notification]);
    setUnRead((prev) => prev + 1);
  };

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleOnclickNotification = () => {
    setUnRead((prev) => prev - 1);
  };

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showNotifications &&
        notificationRef.current &&
        buttonRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

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
    <div className="chat-container flex items-center ">

      {/* Click vào Icon để toggle hiển thị thông báo */}
      <div className="relative">
        <button
          ref={buttonRef}
          className="cursor-pointer relative inline-block border-none bg-none"
          onClick={handleToggleNotifications}
        >
          {unRead > 0 ? (
            <Badge
              color="danger"
              content={unRead.toString()}
              placement="top-right"
            >
              <Bell  size={30} />
            </Badge>
          ) : (
            <Bell size={30} />
          )}
        </button>

        {/* Hiển thị danh sách thông báo khi showNotifications === true */}
        {showNotifications && (
          <div
            ref={notificationRef}
            className="absolute top-full right-[-20px] mt-2 w-[450px] rounded-lg shadow-md z-50"
          >
            <div className="px-5 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-t-lg flex items-center justify-between">
              <span>Notifications</span>
            </div>

            {/* content */}
            {notifications.length > 0 ? (
              <div className="chat-box p-2 rounded-b-lg bg-white shadow-md max-h-[300px] overflow-y-auto">
                {notifications
                  .slice()
                  .reverse()
                  .map((notification, index) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onClickDetail={handleOnclickNotification}
                    />
                  ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center max-h-[250px] py-4 px-4 text-center bg-white rounded-b-lg">
                <Bell
                  className="text-gray-300 dark:text-gray-600 mb-3"
                  size={40}
                />
                <p className="text-gray-500 dark:text-gray-400">
                  You don&apos;t have any notifications yet
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                  We&apos;ll notify you when something arrives
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
