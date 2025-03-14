"use client";

import { useState, useEffect } from "react";
import { Pencil, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import EditProfile from "../profile/editProfile";
import { SonnerToast } from "../sonnerMesage";

import { UserInfo } from "@/types/form";
import { getImageUrl } from "@/utils/getImage";
import authApi from "@/service/authApi";
import userApi from "@/service/userApi";
import { uploadImage } from "@/utils/uploadImage";

export default function ModernProfileLayout() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [editedUser, setEditedUser] = useState<UserInfo | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [toastData, setToastData] = useState<any>(null);

  const getUserInfo = async () => {
    try {
      const storedData = localStorage.getItem("data");

      if (!storedData) return;

      const parsedData = JSON.parse(storedData);
      const userId = parsedData.id;

      const response = await userApi.getUserInfo(userId);

      console.log("User data from API:", response.data);

      // Kiểm tra avatar từ API và localStorage
      const storedAvatar = localStorage.getItem("userAvatar");
      const finalAvatar = storedAvatar || response.data.avatar;

      setUser({ ...response.data, avatar: finalAvatar });
      setEditedUser({ ...response.data, avatar: finalAvatar });

      // Nếu API có avatar mới, lưu lại vào localStorage
      if (response.data.avatar) {
        localStorage.setItem("userAvatar", response.data.avatar);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      localStorage.removeItem("data");
      router.push("/auth/login");
      setToastData({ type: "success", message: "Logged out successfully!" });
    } catch (error) {
      console.error("Logout failed:", error);
      setToastData({
        type: "error",
        message: "Logout failed. Please try again!",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Tạo URL tạm thời để hiển thị ngay ảnh mới
      const localImageUrl = URL.createObjectURL(file);

      setEditedUser((prev) =>
        prev ? { ...prev, avatar: localImageUrl } : null,
      );
      setUser((prev) => (prev ? { ...prev, avatar: localImageUrl } : null));

      try {
        const filename = await uploadImage(file); // Upload ảnh lên server

        if (filename) {
          const newAvatarUrl = getImageUrl(filename.toString());

          // 🌟 **Cập nhật state**
          setEditedUser((prev) =>
            prev ? { ...prev, avatar: newAvatarUrl } : null,
          );
          setUser((prev) => (prev ? { ...prev, avatar: newAvatarUrl } : null));

          // 🌟 **Lưu avatar vào localStorage**
          localStorage.setItem("userAvatar", newAvatarUrl || "");
          window.dispatchEvent(new Event("storage"));

          // 🌟 **Gọi API cập nhật vào database**
          const userId = localStorage.getItem("data")
            ? JSON.parse(localStorage.getItem("data")!).id
            : null;

          if (userId) {
            await userApi.UpdateInfo(userId, { avatar: newAvatarUrl });
            console.log("Avatar saved to database:", newAvatarUrl);
          } else {
            console.error("User ID not found in localStorage");
          }

          setToastData({
            type: "success",
            message: "Avatar updated successfully!",
          });
        } else {
          setToastData({ type: "error", message: "Upload failed!" });
        }
      } catch (error) {
        console.error("Upload error:", error);
        setToastData({ type: "error", message: "Upload error!" });
      }
    }
  };

  const handleUpdateSuccess = (updatedUser: UserInfo) => {
    setUser(updatedUser);
    setEditedUser(updatedUser);
    setIsEditing(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white-100 py-12 px-4 sm:px-6 lg:px-8 mt-10">
      {toastData && <SonnerToast toast={toastData} />}
      <div className="max-w-3xl mx-auto shadow-lg overflow-hidden rounded-lg">
        {/* Header */}
        <div className="bg-white overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500 relative">
            <button
              className="absolute top-4 right-4 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg transition-colors flex items-center"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-1" />
              Logout
            </button>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="-mt-16 relative">
                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white bg-white relative">
                  <img
                    alt="Avatar"
                    className="object-cover w-full h-full"
                    src={
                      editedUser?.avatar
                        ? `${editedUser.avatar}?t=${new Date().getTime()}`
                        : ""
                    }
                  />

                  <label className="absolute bottom-2 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                    <Pencil className="h-5 w-5 text-gray-700" />
                    <input
                      accept="image/*"
                      className="hidden"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>

              <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">
                  {editedUser?.firstName} {editedUser?.lastName}
                </h1>
                <p className="text-gray-500">@{editedUser?.username}</p>
              </div>
              {!isEditing && (
                <button
                  className="ml-auto mt-4 sm:mt-0 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        {!isEditing && (
          <div className="bg-white">
            <div className="flex border-b">
              {["info", "stats", "contact"].map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-purple-500 text-purple-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Nội dung */}
        <div className="p-6">
          {isEditing ? (
            <EditProfile
              editedUser={editedUser!}
              handleInputChange={handleInputChange}
              setEditedUser={setEditedUser}
              handleCancel={() => setIsEditing(false)}
              // onUpdateSuccess={handleUpdateSuccess}
            />
          ) : (
            <>
              {activeTab === "info" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {["firstName", "lastName", "username"].map((key) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </p>
                        <p className="mt-1 text-lg text-gray-900">
                          {editedUser?.[key as keyof UserInfo]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "stats" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Physical Stats
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {["weight", "height"].map((key) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </p>
                        <p className="mt-1 text-lg text-gray-900">
                          {editedUser?.[key as keyof UserInfo] || "Not set"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "contact" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Contact Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {["email", "number"].map((key) => (
                      <div key={key} className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </p>
                        <p className="mt-1 text-lg text-gray-900">
                          {editedUser?.[key as keyof UserInfo] ?? "Not set"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
