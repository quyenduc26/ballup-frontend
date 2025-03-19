"use client"
import { useState, useEffect } from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

interface Message {
  sender: string;
  content: string;
}

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

  const sendMessage = () => {
    if (stompClient && message.trim() !== "") {
      const chatMessage: Message = { sender: "Owner", content: message };
      stompClient.publish({
        destination: "/app/sendToOwner",
        body: JSON.stringify(chatMessage),
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container h-screen mt-20">
      <h2>📢 WebSocket for Owner</h2>
      <input
        placeholder="Enter Owner ID..."
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        disabled={connected}
      />
      <button onClick={() => setUserId(userId)} disabled={connected}>
        Connect as Owner
      </button>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        placeholder="Type a message..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
