

export interface WebSocketConfig {
  apiUrl: string;
  topicEndpoint: string;
  reconnectDelay: number;
}

export const DEFAULT_CONFIG: WebSocketConfig = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL + "/ws" || "",
  topicEndpoint: "/topic/notification",
  reconnectDelay: 5000,
};
