// websocketConfig.ts
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { DEFAULT_CONFIG, Message, WebSocketConfig } from "@/types/ws-config";

export const createStompClient = (
  config: WebSocketConfig = DEFAULT_CONFIG,
  onMessageReceived: (message: Message) => void,
  onConnectCallback?: () => void,
  onDisconnectCallback?: () => void,
) => {
  const socket = new SockJS(`${config.apiUrl}/ws`);

  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: config.reconnectDelay,
    onConnect: () => {
      console.log("✅ Connected to WebSocket");
      client.subscribe(config.topicEndpoint, (msg) => {
        const receivedMessage: Message = JSON.parse(msg.body);

        onMessageReceived(receivedMessage);
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

export const sendWebSocketMessage = (
  client: Client,
  endpoint: string,
  message: Message,
): void => {
  if (client && client.connected) {
    client.publish({
      destination: endpoint,
      body: JSON.stringify(message),
    });
  } else {
    console.error("Cannot send message: WebSocket not connected");
  }
};
