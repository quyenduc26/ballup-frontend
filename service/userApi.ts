import api from "@/config/api";

const userApi = {
  getAll: () => api.get("/hello"),

  getUserInfo: (userId: string) => api.get(`/user/${userId}/info`),

  UpdateInfo: (userId: string, data: any) => api.patch(`/user/${userId}`, data),

  changePassword: (
    userId: string,
    data: { oldPassword: string; newPassword: string; confirmPassword: string },
  ) => api.patch(`/user/${userId}/change`, data),
};

export default userApi;
