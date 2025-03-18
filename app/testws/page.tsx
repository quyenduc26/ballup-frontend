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

  useEffect(() => {
    const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WebSocket");
        client.subscribe("/topic/user/1", (msg) => {
          const receivedMessage: string = msg.toString();
          setMessages((prev) => [...prev, receivedMessage]);
        });
      },
      onDisconnect: () => {
        console.log("🛑 Disconnected from WebSocket");
      },
    });

    client.activate(); // Kích hoạt kết nối
    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && message.trim() !== "") {
      const chatMessage: Message = { sender: "User", content: message };

      stompClient.publish({
        destination: "/app/sendToOwner",
        body: JSON.stringify(chatMessage),
      });
      setMessage("");
    }
  };

  return (
    <div className="chat-container h-screen mt-20">
      <h2>📝 WebSocket Chat</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <p key={index}>
            {msg}
          </p>
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
