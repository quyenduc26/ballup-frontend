"use client";

import type React from "react";
import type {
  MyGameResponse,
  UpdateGameInfoRequest,
  UpdateGameTimeAndSlotRequest,
} from "@/types";

import { useState, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import { toast, Toaster } from "sonner";

import { getImageUrl } from "@/utils/getImage";
import { uploadImage } from "@/utils/uploadImage";
import { convertToTimestamp } from "@/utils/convertToTimestamp";
import matchApi from "@/service/matchApi";

interface MatchEditModalProps {
  match: MyGameResponse;
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export default function MatchEditModal({
  match,
  isOpen,
  onClose,
  onUpdate,
}: MatchEditModalProps) {
  const [activeTab, setActiveTab] = useState<"info" | "time">("info");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const publicUrl = match.cover ? getImageUrl(match.cover) : undefined;
  const [imagePreview, setImagePreview] = useState<string | null>(
    publicUrl || null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [info, setInfo] = useState<UpdateGameInfoRequest>({
    gameId: match.id,
    name: match.name || "",
    cover: match.cover || "",
    description: match.description || "",
    membersRequired: match.membersRequired || 0,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [timeInfo, setTimeInfo] = useState<UpdateGameTimeAndSlotRequest>({
    gameId: match.id,
    fromTime: match.fromTime ? new Date(match.fromTime).getTime() : null,
    toTime: match.toTime ? new Date(match.toTime).getTime() : null,
    newSlotId: match.slotId || null,
  });

  const [fromDate, setFromDate] = useState<Date | null>(
    match.fromTime ? new Date(match.fromTime) : null,
  );
  const [fromTimeStr, setFromTimeStr] = useState<string>(
    match.fromTime ? new Date(match.fromTime).toTimeString().slice(0, 5) : "",
  );
  const [toDate, setToDate] = useState<Date | null>(
    match.toTime ? new Date(match.toTime) : null,
  );
  const [toTimeStr, setToTimeStr] = useState<string>(
    match.toTime ? new Date(match.toTime).toTimeString().slice(0, 5) : "",
  );

  const handleInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setInfo((prev) => ({
      ...prev,
      [name]: name === "membersRequired" ? Number.parseInt(value) || 0 : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.match("image.*")) {
      setError("Please select an image file");

      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fromDate") {
      const newDate = value ? new Date(value) : null;

      setFromDate(newDate);
      const timestamp = convertToTimestamp(newDate!, fromTimeStr);

      setTimeInfo((prev) => ({ ...prev, fromTime: timestamp }));
    } else if (name === "fromTime") {
      setFromTimeStr(value);
      const timestamp = convertToTimestamp(fromDate!, value);

      setTimeInfo((prev) => ({ ...prev, fromTime: timestamp }));
    } else if (name === "toDate") {
      const newDate = value ? new Date(value) : null;

      setToDate(newDate);
      const timestamp = convertToTimestamp(newDate!, toTimeStr);

      setTimeInfo((prev) => ({ ...prev, toTime: timestamp }));
    } else if (name === "toTime") {
      setToTimeStr(value);
      const timestamp = convertToTimestamp(toDate!, value);

      setTimeInfo((prev) => ({ ...prev, toTime: timestamp }));
    } else if (name === "newSlotId") {
      setTimeInfo((prev) => ({
        ...prev,
        newSlotId: value ? Number.parseInt(value) : null,
      }));
    }
  };

  const resetInfoForm = () => {
    setInfo({
      gameId: match.id,
      name: match.name || "",
      cover: match.cover || "",
      description: match.description || "",
      membersRequired: match.membersRequired || 0,
    });
    setSelectedFile(null);
    setImagePreview(publicUrl || null);
    setError(null);
  };

  const resetTimeForm = () => {
    setTimeInfo({
      gameId: match.id,
      fromTime: match.fromTime ? new Date(match.fromTime).getTime() : null,
      toTime: match.toTime ? new Date(match.toTime).getTime() : null,
      newSlotId: match.slotId || null,
    });
    setFromDate(match.fromTime ? new Date(match.fromTime) : null);
    setFromTimeStr(
      match.fromTime ? new Date(match.fromTime).toTimeString().slice(0, 5) : "",
    );
    setToDate(match.toTime ? new Date(match.toTime) : null);
    setToTimeStr(
      match.toTime ? new Date(match.toTime).toTimeString().slice(0, 5) : "",
    );
    setError(null);
  };

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalCoverUrl = info.cover;

      if (selectedFile) {
        const uploadedFileName = await uploadImage(selectedFile);

        if (!uploadedFileName) {
          throw new Error("Failed to upload image");
        }
        finalCoverUrl = uploadedFileName;
      }

      await matchApi.updateMatchInfo({
        ...info,
        cover: finalCoverUrl,
      });

      // Show success toast
      toast.success("Match updated successfully!", {
        duration: 3000,
      });

      if (onUpdate) onUpdate();
      onClose();
    } catch (err) {
      console.error("Error updating match info:", err);
      // Show error toast instead of setting error state
      toast.error("Failed to update match information. Please try again.", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTimeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await matchApi.updateMatchTime(timeInfo);

      // Show success toast
      toast.success("Match time updated successfully!", {
        duration: 3000,
      });

      if (onUpdate) onUpdate();
      onClose();
    } catch (err) {
      console.error("Error updating match time:", err);
      // Show error toast instead of setting error state
      toast.error("Failed to update match time. Please try again.", {
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDateInput = (date: Date | null): string => {
    if (!date) return "";

    return date.toISOString().slice(0, 10);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Add Toaster component at the top level */}
      <Toaster richColors position="top-center" />
      <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <button
              className="ml-4 px-4 py-2 bg-black text-gray-700 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              onClick={onClose}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div className="flex gap-3 flex-2 ">
              <button
                className={`flex-2 py-2.5 px-4 rounded-lg font-medium text-base transition-all duration-200 ${
                  activeTab === "info"
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("info")}
              >
                Match
              </button>
              <button
                className={`flex-2 py-2.5 px-4 rounded-lg font-medium text-base transition-all duration-200 ${
                  activeTab === "time"
                    ? "bg-gray-900 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setActiveTab("time")}
              >
                Time
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg">
                {error}
              </div>
            )}

            {activeTab === "info" ? (
              <form className="space-y-5" onSubmit={handleInfoSubmit}>
                <div>
                  <label
                    className="block text-base text-left font-medium text-gray-700 mb-1.5"
                    htmlFor="name"
                  >
                    Match Name
                  </label>
                  <input
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    id="name"
                    name="name"
                    type="text"
                    value={info.name}
                    onChange={handleInfoChange}
                  />
                </div>

                <div>
                  <label
                    className="block text-base font-medium text-gray-700 mb-1.5 text-left"
                    htmlFor="coverImage"
                  >
                    Cover Image
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      type="button"
                      onClick={handleBrowseClick}
                    >
                      Choose File
                    </button>
                    <span className="text-sm text-gray-500 truncate max-w-[200px]">
                      {selectedFile ? selectedFile.name : "No file selected"}
                    </span>
                    <input
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      id="coverImage"
                      type="file"
                      onChange={handleImageChange}
                    />
                  </div>
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        alt="Preview"
                        className="h-48 w-full object-cover rounded-lg border border-gray-200"
                        src={imagePreview}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    className="block text-base font-medium text-gray-700 mb-1.5 text-left"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y"
                    id="description"
                    name="description"
                    rows={4}
                    value={info.description}
                    onChange={handleInfoChange}
                  />
                </div>

                <div>
                  <label
                    className="block text-base font-medium text-gray-700 mb-1.5 text-left"
                    htmlFor="membersRequired"
                  >
                    Members Required
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    id="membersRequired"
                    min="0"
                    name="membersRequired"
                    type="number"
                    value={info.membersRequired}
                    onChange={handleInfoChange}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    type="button"
                    onClick={resetInfoForm}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={handleTimeSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-base font-medium text-gray-700 mb-1.5 text-left"
                      htmlFor="fromDate"
                    >
                      From Date
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      id="fromDate"
                      name="fromDate"
                      type="date"
                      value={formatDateInput(fromDate)}
                      onChange={handleTimeChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-base font-medium text-gray-700 mb-1.5 text-left"
                      htmlFor="fromTime"
                    >
                      From Time
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      id="fromTime"
                      name="fromTime"
                      type="time"
                      value={fromTimeStr}
                      onChange={handleTimeChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-base font-medium text-gray-700 mb-1.5 text-left"
                      htmlFor="toDate"
                    >
                      To Date
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      id="toDate"
                      name="toDate"
                      type="date"
                      value={formatDateInput(toDate)}
                      onChange={handleTimeChange}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-base font-medium text-gray-700 mb-1.5 text-left"
                      htmlFor="toTime"
                    >
                      To Time
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      id="toTime"
                      name="toTime"
                      type="time"
                      value={toTimeStr}
                      onChange={handleTimeChange}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-base font-medium text-gray-700 mb-1.5 text-left"
                    htmlFor="newSlotId"
                  >
                    Slot ID
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    id="newSlotId"
                    name="newSlotId"
                    type="number"
                    value={timeInfo.newSlotId || ""}
                    onChange={handleTimeChange}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    type="button"
                    onClick={resetTimeForm}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors duration-200"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
