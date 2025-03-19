"use client";
import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export default function Page() {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    if (!userId) return;
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        setConnected(true);
        client.subscribe(`/topic/user/${userId}`, (msg) => {
          const receivedMessage: string = msg.body;

          setMessages((prev) => [...prev, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log("🛑 Disconnected from WebSocket");
        setConnected(false);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      client.deactivate();
    };
  }, [userId]);

  return (
    <div className="chat-container h-screen mt-20">
      <h2>📢 WebSocket for Owner</h2>
      <input
        disabled={connected}
        placeholder="Enter Owner ID..."
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button disabled={connected} onClick={() => setUserId(userId)}>
        Connect as Owner
      </button>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
    </div>
  );
}
