// websocketConfig.ts
import { NotificationType } from "@/types/common";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";


export const createStompClient = (
  id: string,
  subscribeChannel: string,
  handleOnConnect: (notification: NotificationType) => void,
  onConnectCallback?: () => void,
  onDisconnectCallback?: () => void,
) => {
  const socket = new SockJS(`${process.env.NEXT_PUBLIC_API_URL}/ws`);

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("✅ Connected to WebSocket");
      client.subscribe(subscribeChannel + id, (msg) => {
        const receivedMessage: NotificationType = JSON.parse(msg.body);
        handleOnConnect(receivedMessage);
      });

      if (onConnectCallback) {
        onConnectCallback();
      }
    },
    onDisconnect: () => {
      console.log("🛑 Disconnected from WebSocket");
      if (onDisconnectCallback) {
        onDisconnectCallback();
      }
    },
  });

  return client;
};
