"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, Pencil, Save } from "lucide-react";
import { Profile } from "@/types/form";
import { getImageUrl } from "@/utils/getImage";
import { uploadImage } from "@/utils/uploadImage";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [coverPreview, setCoverPreview] = useState("");
    const [logoPreview, setLogoPreview] = useState("");
    const [profile, setProfile] = useState<Profile | null>(null);

    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            const parsedData: Profile = JSON.parse(data);
            setProfile(parsedData);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (profile) {
            setProfile((prev) => ({ ...prev!, [e.target.name]: e.target.value }));
        }
    };

    const handleImageUpload = async ({
        e,
        type,
    }: {
        e: React.ChangeEvent<HTMLInputElement>;
        type: string;
    }) => {
        const file = e?.target.files?.[0];

        if (file) {
            const imageUrl = await uploadImage(file);

            if (!imageUrl) {
                alert("Failed to upload image.");
                return;
            }
            const imgSrc = getImageUrl(imageUrl);

            if (!imgSrc) return;
            if (type === "cover") {
                setCoverPreview(imgSrc);
                setProfile((prev) => ({ ...prev!, cover: imageUrl }));
            } else {
                setLogoPreview(imgSrc);
                setProfile((prev) => ({ ...prev!, logo: imageUrl }));
            }
        }
    };

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
            {/* Sidebar Toggle Button (Mobile) */}
            <button
                className="md:hidden p-3 fixed top-16 left-3 z-50 "
                onClick={() => setShowSidebar(!showSidebar)}
            >
                <Menu size={20} />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed md:relative top-0 left-0 w-64 h-full bg-white border-r border-gray-200 transform transition-transform ${showSidebar ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                <div className="p-6 text-lg font-semibold text-gray-800">My Profile</div>
                <nav className="mt-10 text-sm">
                    <ul>
                        <li className="px-6 py-3 bg-blue-50 text-blue-500 font-medium">My Profile</li>
                        <li className="px-6 py-3 text-gray-500 hover:bg-gray-100">Security</li>
                        <li className="px-6 py-3 text-gray-500 hover:bg-gray-100">Teams</li>
                        <li className="px-6 py-3 text-gray-500 hover:bg-gray-100">Team Member</li>
                        <li className="px-6 py-3 hover:bg-gray-100 text-red-500">Log Out</li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8">
                <h1 className="text-lg md:text-2xl font-bold text-gray-800 mb-6 mt-14 text-center md:text-left">
                    My Profile
                </h1>

                <div className="bg-white border border-gray-200 rounded-md p-4 md:p-6 mb-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-6">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                            <img
                                src={profile.avatar || "/images/soccer.png"}
                                alt="Profile picture"
                                className="rounded-full object-cover w-24 h-24 md:w-40 md:h-40"
                            />
                            <span className="text-base md:text-lg font-semibold text-gray-800">
                                {profile.username || "N/A"}
                            </span>
                        </div>
                        <div className="flex gap-2 mt-4 md:mt-0">
                            {isEditing && (
                                <button
                                    className="text-gray-500 border border-gray-300 rounded-md px-3 py-1 text-sm"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                className="flex items-center gap-1 text-gray-500 border border-gray-300 rounded-md px-3 py-1 text-sm"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? <Save size={16} /> : <Pencil size={16} />}
                                <span>{isEditing ? "Save" : "Edit"}</span>
                            </button>
                        </div>
                    </div>

                    {/* Form Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        {[
                            { label: "Username", name: "username" },
                            { label: "Email address", name: "email" },
                            { label: "Password", name: "password" },
                            { label: "Phone number", name: "phone" },
                            { label: "Height (cm)", name: "height" },
                            { label: "Weight (kg)", name: "weight" },
                        ].map(({ label, name }) => (
                            <div key={name} className="w-full">
                                <h4 className="text-xs md:text-sm text-gray-500 mb-1">{label}</h4>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name={name}
                                        value={profile[name as keyof Profile] || ""}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded-md px-2 py-1 text-sm"
                                    />
                                ) : (
                                    <p className="text-gray-700 text-xs md:text-sm">{profile[name as keyof Profile] || "N/A"}</p>
                                )}
                            </div>
                        ))}
                    </div>


                    {/* Image Upload */}
                    {isEditing && (
                        <div className="mt-6">
                            <label className="block text-xs md:text-sm text-gray-500 mb-1">Upload Avatar</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload({ e, type: "avatar" })}
                                className="block w-full border border-gray-300 rounded-md px-2 py-1 text-xs"
                            />
                            {logoPreview && (
                                <img src={logoPreview} width={80} height={80} alt="Avatar preview" className="mt-2" />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
