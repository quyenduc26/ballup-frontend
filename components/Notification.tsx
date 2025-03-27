"use client";

import type { Client } from "@stomp/stompjs";
import type { NotificationType } from "@/types";

import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Badge } from "@heroui/react";

import { createStompClient } from "@/config/ws";
import notificationApi from "@/service/notificationApi";
import NotificationItem from "@/components/NotificationItem";

export default function Notification() {
  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parsedData?.id;
  const subscribeChannel =
    parsedData?.role == "USER" ? "/topic/user/" : "/topic/owner/";

  const [showNotifications, setShowNotifications] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [unRead, setUnRead] = useState(0);

  // Add ref for notification container and button
  const notificationRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fetch notifications from API
  useEffect(() => {
    if (!userId) return;

    async function fetchNotifications() {
      try {
        const response = await notificationApi.getUserNotification(userId);

        if (response?.data) {
          setNotifications(response.data);
          setUnRead(
            response.data.filter((noti: NotificationType) => !noti.read).length,
          );
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

    fetchNotifications();
  }, [userId]);

  // WebSocket event handler
  const handleOnConnect = (notification: NotificationType) => {
    setNotifications((prev) => [notification, ...prev]);
    setUnRead((prev) => prev + 1);
  };

  // Toggle notification dropdown
  const handleToggleNotifications = async () => {
    setShowNotifications((prev) => !prev);

    if (!showNotifications) {
      // Mark all unread notifications as read
      const unreadIds = notifications
        .filter((noti) => !noti.read)
        .map((noti) => noti.id);

      if (unreadIds.length > 0) {
        try {
          await notificationApi.markAsRead(unreadIds);
          setNotifications((prev) =>
            prev.map((noti) =>
              unreadIds.includes(noti.id) ? { ...noti, read: true } : noti,
            ),
          );
          setUnRead(0);
        } catch (error) {
          console.error("Error marking notifications as read:", error);
        }
      }
    }
  };

  // Click on notification item
  const handleOnclickNotification = () => {
    setUnRead((prev) => prev - 1);
  };

  // Click outside handler
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

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications]);

  // Connect WebSocket
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
    <div className="chat-container flex items-center">
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
              <Bell size={30} />
            </Badge>
          ) : (
            <Bell size={30} />
          )}
        </button>

        {showNotifications && (
          <div
            ref={notificationRef}
            className="absolute top-full right-[-20px] mt-2 w-[450px] rounded-lg shadow-md z-50"
          >
            <div className="px-5 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-t-lg flex items-center justify-between">
              <span>Notifications</span>
            </div>

            {notifications.length > 0 ? (
              <div className="chat-box p-2 rounded-b-lg bg-white shadow-md max-h-[300px] overflow-y-auto">
                {notifications.map((notification) => (
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
