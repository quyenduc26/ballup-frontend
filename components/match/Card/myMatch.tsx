"use client";
import type { MyGameResponse } from "@/types";

import { useState } from "react";
import { toast } from "sonner";

import MatchEditModal from "./FormEditMatch/MatchEditModal";

import { getImageUrl } from "@/utils/getImage";
import { formatTimestamp } from "@/utils/formatTimestamp";
import matchApi from "@/service/matchApi";
import { SonnerToast } from "@/components/sonnerMesage";

interface CardMyMatchProps {
  match: MyGameResponse;
  onUpdate?: () => void;
}

export default function CardMyMatch({ match, onUpdate }: CardMyMatchProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const data = localStorage.getItem("data");
  const [toastData, setToastData] = useState<any>(null);
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parsedData.id;

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateSuccess = () => {
    toast.success("Match updated successfully");
    if (onUpdate) {
      onUpdate(); // Trigger refetch of data in parent component
    }
  };

  const handleCancelMatch = () => {
    // Using toast.promise with a confirmation dialog
    toast.custom(
      (t) => (
        <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
          <h3 className="font-bold text-lg mb-2">Cancel Match</h3>
          <p className="mb-4">Are you sure you want to cancel this match?</p>
          <div className="flex justify-end gap-2">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => toast.dismiss(t)}
            >
              No
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={() => {
                toast.dismiss(t);
                performCancellation();
              }}
            >
              Yes, Cancel
            </button>
          </div>
        </div>
      ),
      {
        duration: 10000, // 10 seconds to make a decision
      },
    );
  };

  const performCancellation = async () => {
    try {
      setIsCancelling(true);
      await toast.promise(matchApi.cancelGame(match.id, userId), {
        loading: "Cancelling match...",
        success: "Match cancelled successfully",
        error: "Failed to cancel match",
      });

      // Call onUpdate to refresh the matches list
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error("Error cancelling match:", error);
    } finally {
      setIsCancelling(false);
    }
  };
  const leaveMatch = async () => {
    if (!match?.id || !userId) {
      setToastData({
        heading: "Error",
        message: "Invalid match or user information!",
        type: "error",
      });
      return;
    }

    try {
      await matchApi.leaveGame(match.id, userId);
      setToastData({
        heading: "Success",
        message: "You have successfully left the match!",
        type: "success",
      });
    } catch (error) {
      console.error("Error leaving match:", error);
      setToastData({
        heading: "Error",
        message: "Failed to leave the match!",
        type: "error",
      });
    }
  };


  return (
    <>
      {toastData && <SonnerToast toast={toastData} />}
      <div className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105 border border-gray-200 w-full mx-auto my-4">
        {/* Cover image section */}
        <div className="relative">
          <img
            alt="Cover"
            className="w-full h-24 sm:h-32 md:h-48 object-cover border-b border-gray-300"
            src={getImageUrl(match.cover) || "/placeholder.svg"}
          />
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs sm:text-sm font-bold rounded">
            {match.type || "Unknown"}
          </div>

          {/* Overlapping Team Logos */}
          <div className="absolute w-full px-4 sm:px-8 -bottom-12 sm:-bottom-16 md:-bottom-20 flex justify-between">
            {/* Team A Logo */}
            <div className="bg-white rounded-full p-1 border-2 border-gray-200 shadow-lg">
              <img
                alt={match.teamA?.name || "Team A"}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover"
                src={getImageUrl(match.teamA?.logo) || "/placeholder.svg"}
              />
            </div>

            {/* VS Icon */}
            <div className="bg-gray-100 rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center self-end mb-2">
              <img
                alt="VS"
                className="w-8 h-8 sm:w-10 sm:h-10"
                src="/images/VS.png"
              />
            </div>

            {/* Team B Logo */}
            <div className="bg-white rounded-full p-1 border-2 border-gray-200 shadow-lg">
              <img
                alt={match.teamB?.name || "Team B"}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full object-cover"
                src={
                  match.teamB?.logo
                    ? getImageUrl(match.teamB.logo)
                    : match.teamB?.members && match.teamB.members.length > 0
                      ? getImageUrl("default-team-logo.png")
                      : getImageUrl("unknow-team-logo.png")
                }
              />
            </div>
          </div>
        </div>

        {/* Teams Section with adjusted padding for logo overlap */}
        <div className="p-2 sm:p-4 pt-14 sm:pt-20 md:pt-24">
          <div className="flex items-center justify-between mt-2">
            {/* Team A Name */}
            <div className="text-center w-1/3">
              <h2 className="sm:text-lg text-xs font-bold truncate px-1">
                {match.teamA?.name || "Team A"}
              </h2>
            </div>

            {/* Match Info */}
            <div className="text-center w-1/3">
              <p className="text-xs text-gray-500">
                {formatTimestamp(match.fromTime)}
              </p>
              <p className="text-xs sm:text-sm font-bold sm:mt-2">
                {formatTimestamp(match.toTime)}
              </p>
              <p className="sm:text-lg text-xs mt-2 text-gray-500">
                {match.center || "Location not set"}
              </p>
            </div>

            {/* Team B Name */}
            <div className="text-center w-1/3">
              <h2 className="sm:text-lg text-xs font-bold truncate px-1">
                {match.teamB?.name || "Team B"}
              </h2>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1 sm:gap-2 mt-4 sm:mt-10 mb-2">
            <button
              className="border border-gray-300 w-1/3 py-2 sm:py-3 sm:text-sm text-xs font-medium text-gray-700 rounded hover:bg-gray-200"
              onClick={handleEditClick}
            >
              EDIT
            </button>
            <button
              className="bg-black text-white w-1/3 py-2 sm:py-3 sm:text-sm text-xs font-medium rounded hover:bg-gray-800"
              onClick={leaveMatch}
            >
              Leave match
            </button>
            <button
              className="border border-red-400 text-black w-1/3 py-2 sm:py-3 sm:text-sm text-xs font-medium rounded hover:bg-red-500 hover:text-white"
              disabled={isCancelling}
              onClick={handleCancelMatch}
            >
              {isCancelling ? "CANCELLING..." : "CANCEL"}
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <MatchEditModal
        isOpen={isEditModalOpen}
        match={match}
        onClose={handleCloseModal}
        onUpdate={handleUpdateSuccess}
      />
    </>
  );
}
