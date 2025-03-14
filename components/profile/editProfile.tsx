"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { SonnerToast } from "../sonnerMesage";

import userApi from "@/service/userApi";
import { UserInfo } from "@/types/form";

type EditProfileProps = {
  editedUser: UserInfo;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
  setEditedUser: Dispatch<SetStateAction<UserInfo | null>>;
};

const EditProfile: React.FC<EditProfileProps> = ({
  editedUser,
  handleInputChange,
  handleCancel,
  setEditedUser,
}) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toastData, setToastData] = useState<any>(null);

  const toggleOldPasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowOldPassword(!showOldPassword);
  };

  const toggleNewPasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const response = await userApi.UpdateInfo(editedUser.id, editedUser);

      localStorage.setItem("userData", JSON.stringify(response.data));
      setToastData({
        type: "success",
        message: "Profile updated successfully!",
      });
    } catch (error: unknown) {
      console.error("Update failed:", error);
      if (error instanceof Error) {
        setToastData({
          type: "error",
          message:
            (error as any).response?.data?.message ||
            "Failed to update profile. Please try again!",
        });
      } else {
        setToastData({
          type: "error",
          message: "An unknown error occurred. Please try again!",
        });
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (
      !editedUser.oldPassword ||
      !editedUser.newPassword ||
      !editedUser.confirmPassword
    ) {
      setToastData({ type: "warning", message: "Please fill in all fields." });

      return;
    }

    if (editedUser.newPassword !== editedUser.confirmPassword) {
      setToastData({
        type: "error",
        message: "New password and confirm password do not match!",
      });

      return;
    }

    setIsSaving(true);
    try {
      await userApi.changePassword(editedUser.id, {
        oldPassword: editedUser.oldPassword,
        newPassword: editedUser.newPassword,
        confirmPassword: editedUser.confirmPassword,
      });
      setToastData({
        type: "success",
        message: "Password changed successfully!",
      });
      setEditedUser({
        ...editedUser,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: unknown) {
      console.error("Failed to change password:", error);
      if (error instanceof Error && "response" in error) {
        setToastData({
          type: "error",
          message:
            (error as any).response?.data?.message ||
            "Failed to change password.",
        });
      } else {
        setToastData({ type: "error", message: "Failed to change password." });
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {toastData && <SonnerToast toast={toastData} />}
      <h2 className="text-xl font-semibold text-gray-900">Edit Your Profile</h2>

      <div className="bg-gray-50 p-5 rounded-lg space-y-4">
        <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              id="firstName"
              name="firstName"
              type="text"
              value={editedUser.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              id="lastName"
              name="lastName"
              type="text"
              value={editedUser.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              id="username"
              name="username"
              type="text"
              value={editedUser.username}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Contact Information Group */}
      <div className="bg-gray-50 p-5 rounded-lg space-y-4">
        <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              id="email"
              name="email"
              type="email"
              value={editedUser.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="phone"
            >
              Phone Number
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              id="phone"
              name="phone"
              type="text"
              value={editedUser.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-gray-50 p-5 rounded-lg space-y-4">
        <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">
          Change Password
        </h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div className="sm:col-span-2 relative">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="oldPassword"
            >
              Old Password
            </label>
            <div className="relative">
              <input
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                id="oldPassword"
                name="oldPassword"
                type={showOldPassword ? "text" : "password"}
                value={editedUser.oldPassword}
                onChange={handleInputChange}
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                type="button"
                onClick={toggleOldPasswordVisibility}
              >
                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="sm:col-span-2 relative">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="newPassword"
            >
              New Password
            </label>
            <div className="relative">
              <input
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                id="newPassword"
                name="newPassword"
                type={showNewPassword ? "text" : "password"}
                value={editedUser.newPassword}
                onChange={handleInputChange}
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                type="button"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="sm:col-span-2 relative">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={editedUser.confirmPassword}
                onChange={handleInputChange}
              />
              <button
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                type="button"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>
        {/* Nút để lưu mật khẩu */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            disabled={isSaving}
            onClick={handleChangePassword}
          >
            {isSaving ? "Changing..." : "Save Password"}
          </button>
        </div>
      </div>

      {/* Physical Statistics */}
      <div className="bg-gray-50 p-5 rounded-lg space-y-4">
        <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">
          Physical Statistics
        </h3>
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="weight"
            >
              Weight (kg)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              id="weight"
              name="weight"
              type="number"
              value={editedUser.weight}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="height"
            >
              Height (cm)
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              id="height"
              name="height"
              type="number"
              value={editedUser.height}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 mr-6">
        <button
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          disabled={isSaving}
          onClick={handleSaveProfile}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
