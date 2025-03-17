export interface Message {
    sender: string;
    content: string;
  }
  
  export interface WebSocketConfig {
    apiUrl: string;
    topicEndpoint: string;
    sendEndpoint: string;
    reconnectDelay: number;
  }

  export const DEFAULT_CONFIG: WebSocketConfig = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "",
    topicEndpoint: "/topic/notification",
    sendEndpoint: "/app/sendMessage",
    reconnectDelay: 5000,
  };