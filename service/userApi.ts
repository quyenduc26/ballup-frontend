import api from "@/config/api";

const userApi = {
  getAll: () => api.get("/hello"),
};

export default userApi;
