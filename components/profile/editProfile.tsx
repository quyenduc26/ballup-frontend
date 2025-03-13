"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import userApi from "@/service/userApi";
import { SonnerToast } from "../sonnerMesage";
import { UserInfo } from "@/types/form";

type EditProfileProps = {
    editedUser: UserInfo;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleCancel: () => void;
    setEditedUser: Dispatch<SetStateAction<UserInfo | null>>
};

const EditProfile: React.FC<EditProfileProps> = ({ editedUser, handleInputChange, handleCancel, setEditedUser }) => {
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
            setToastData({ type: "success", message: "Profile updated successfully!" });
        } catch (error: unknown) {
            console.error("Update failed:", error);
            if (error instanceof Error) {
                setToastData({ type: "error", message: (error as any).response?.data?.message || "Failed to update profile. Please try again!" });
            } else {
                setToastData({ type: "error", message: "An unknown error occurred. Please try again!" });
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (!editedUser.oldPassword || !editedUser.newPassword || !editedUser.confirmPassword) {
            setToastData({ type: "warning", message: "Please fill in all fields." });
            return;
        }

        if (editedUser.newPassword !== editedUser.confirmPassword) {
            setToastData({ type: "error", message: "New password and confirm password do not match!" });
            return;
        }

        setIsSaving(true);
        try {
            await userApi.changePassword(editedUser.id, {
                oldPassword: editedUser.oldPassword,
                newPassword: editedUser.newPassword,
                confirmPassword: editedUser.confirmPassword,
            });
            setToastData({ type: "success", message: "Password changed successfully!" });
            setEditedUser({ ...editedUser, oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error: unknown) {
            console.error("Failed to change password:", error);
            if (error instanceof Error && 'response' in error) {
                setToastData({ type: "error", message: (error as any).response?.data?.message || "Failed to change password." });
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
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={editedUser.firstName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={editedUser.lastName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={editedUser.username}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Contact Information Group */}
            <div className="bg-gray-50 p-5 rounded-lg space-y-4">
                <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Contact Information</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={editedUser.phone}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Change Password */}
            <div className="bg-gray-50 p-5 rounded-lg space-y-4">
                <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Change Password</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div className="sm:col-span-2 relative">
                        <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">Old Password</label>
                        <div className="relative">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                name="oldPassword"
                                id="oldPassword"
                                value={editedUser.oldPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={toggleOldPasswordVisibility}
                            >
                                {showOldPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="sm:col-span-2 relative">
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                id="newPassword"
                                value={editedUser.newPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                onClick={toggleNewPasswordVisibility}
                            >
                                {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="sm:col-span-2 relative">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                id="confirmPassword"
                                value={editedUser.confirmPassword}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
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
                        onClick={handleChangePassword}
                        disabled={isSaving}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                        {isSaving ? "Changing..." : "Save Password"}
                    </button>
                </div>
            </div>

            {/* Physical Statistics */}
            <div className="bg-gray-50 p-5 rounded-lg space-y-4">
                <h3 className="text-md font-medium text-gray-700 border-b border-gray-200 pb-2">Physical Statistics</h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                    <div>
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            id="weight"
                            value={editedUser.weight}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (cm)</label>
                        <input
                            type="number"
                            name="height"
                            id="height"
                            value={editedUser.height}
                            onChange={handleInputChange}
                            className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 mr-6">
                <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
};

export default EditProfile;