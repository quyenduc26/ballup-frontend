// websocketConfig.ts
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

import { DEFAULT_CONFIG, WebSocketConfig } from "@/types/ws-config";

export const createStompClient = (
  config: WebSocketConfig = DEFAULT_CONFIG,
  onMessageReceived: (message: Object) => void,
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
        const receivedMessage: Object = JSON.parse(msg.body);

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
