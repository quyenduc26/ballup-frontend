"use client";
import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { createStompClient } from "@/config/ws";
import { NotificationType } from "@/types";
import { Bell } from "lucide-react"
import NotificationItem from "@/components/NotificationItem";
import { Badge } from "@heroui/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parsedData.id;
  const subscribeChannel = parsedData.role == "USER" ? "/topic/user/" : "/topic/owner/"

  const [showNotifications, setShowNotifications] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [notifications, setNotification] = useState<NotificationType[]>([]);
  const [unRead, setUnRead] = useState(0);

  //prepare for ws param
  const handleOnConnect = (notification: NotificationType) => {
    setNotification((prev) => [...prev, notification]);
    setUnRead(prev => prev + 1)
  }

  const handleToggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleOnclickNotification = () => {
    setUnRead(prev => prev - 1)
  }

  useEffect(() => {
    if (!userId) return;
    const client = createStompClient(userId, subscribeChannel, handleOnConnect);
    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [userId, subscribeChannel, unRead]);

  return (
    <div className="chat-container h-screen mt-32">
      <h2>📢 WebSocket for Owner</h2>

      {/* Click vào Icon để toggle hiển thị thông báo */}
      <div onClick={handleToggleNotifications} className="cursor-pointer relative inline-block">
        {unRead > 0 ? (
          <Badge color="danger" content={unRead.toString()} placement="top-right">
            <Bell size={30} />
          </Badge>
        ) : (
          <Bell size={30} />
        )}
      </div>

      {/* Hiển thị danh sách thông báo khi showNotifications === true */}
      {showNotifications && (
        <div className="w-1/3 rounded-lg shadow-md ml-4">
          <div className="px-5 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-t-lg flex items-center justify-between">
            <span>Notifications</span>
          </div>

          {/* content */}
          {notifications.length > 0 ? (
            <div className="chat-box p-2 rounded-lg bg-white shadow-md">
              {notifications.slice().reverse().map((notification, index) => (
                <NotificationItem key={notification.id} notification={notification} onClickDetail={handleOnclickNotification} />
              ))}
            </div>  
          ) : (
            <div className="flex flex-col items-center justify-center max-h-[250px] py-4 px-4 text-center">
              <Bell size={40} className="text-gray-300 dark:text-gray-600 mb-3" />
              <p className="text-gray-500 dark:text-gray-400">You don't have any notifications yet</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">We'll notify you when something arrives</p>
            </div>
          )}
        </div>

      )}
    </div>
  );
}
