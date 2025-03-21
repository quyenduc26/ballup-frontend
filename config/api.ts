import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const authRoutes = ["/auth/login", "/auth/signUp"];

  if (data && config.url && !authRoutes.includes(config.url)) {
    config.headers.Authorization = `Bearer ${parsedData.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return {
      ...response,
      success: true,
      data: response.data,
      message: response.data.message || "Success",
    };
  },
  (error) => {
    return Promise.reject({
      success: false,
      data: null,
      message: error.response?.data?.message || "Something went wrong",
      status: error.response?.status || 500,
    });
  },
);

export default api;
