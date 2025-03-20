"use client";
import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { createStompClient } from "@/config/ws";
import { NotificationType } from "@/types";
import NotificationItem from "@/components/NotificationItem";
import { Badge } from "@heroui/react";
import { Bell } from "lucide-react";

export default function Page() {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [notifications, setNotification] = useState<NotificationType[]>([]);
  const [subscribeChannel, setSubscribeChannel] = useState<string>("/topic/user/");
  const [userId, setUserId] = useState<string>("");
  const [connected, setConnected] = useState(false);
  const [unRead, setUnRead] = useState(0);

  //prepare for ws param
  const handleOnConnect = (notification: NotificationType) => {
    setNotification((prev) => [...prev, notification]);
    setConnected(true);
    setUnRead(prev => prev + 1)
  }

  const onDisconnectCallback = () => {
    setConnected(false);
  }

  const handleOnclickNotification = () => {
    setUnRead(prev => prev - 1)
  }

  useEffect(() => {
    if (!userId) return;
    const client = createStompClient(userId, subscribeChannel, handleOnConnect, onDisconnectCallback);
    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [userId]);

  return (
    <div className="chat-container h-screen mt-32">
    <h2>📢 WebSocket for User</h2>
    <input
      disabled={connected}
      placeholder="Enter User ID..."
      type="text"
      value={userId}
      onChange={(e) => setUserId(e.target.value)}
    />
    
    {unRead > 0 ? (
      <Badge color="danger" content={unRead.toString()} placement="top-right">
         <Bell size={30} />
      </Badge>
    ) : (
       <Bell size={30} />
    )}
  
    <div className="chat-box">
      {notifications.map((notification, index) => (
        <NotificationItem key={index} notification={notification} onClickDetail={handleOnclickNotification} />
      ))}
    </div>
  </div>
  
  );
}
