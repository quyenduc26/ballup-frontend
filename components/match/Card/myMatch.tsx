"use client";
import type { MyGameResponse } from "@/types";

import { useState } from "react";

import MatchEditModal from "./FormEditMatch/MatchEditModal";

import { getImageUrl } from "@/utils/getImage";
import { formatTimestamp } from "@/utils/formatTimestamp";
import matchApi from "@/service/matchApi"; // Add this import

interface CardMyMatchProps {
  match: MyGameResponse;
  onUpdate?: () => void;
}

export default function CardMyMatch({ match, onUpdate }: CardMyMatchProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false); // Add loading state for cancel

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  const handleUpdateSuccess = () => {
    if (onUpdate) {
      onUpdate(); // Trigger refetch of data in parent component
    }
  };

  // Add this function to handle cancel
  const handleCancelMatch = async () => {
    if (window.confirm("Are you sure you want to cancel this match?")) {
      try {
        setIsCancelling(true);
        const data = localStorage.getItem("data");
        const parsedData = data ? JSON.parse(data) : null;
        const userId = parsedData.id;

        await matchApi.cancelGame(match.id, userId);

        // Call onUpdate to refresh the matches list
        if (onUpdate) {
          onUpdate();
        }
      } catch (error) {
        console.error("Error cancelling match:", error);
        alert("Failed to cancel match. Please try again.");
      } finally {
        setIsCancelling(false);
      }
    }
  };

  return (
    <>
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
              onClick={() => {
                if (match.conversationId) {
                  window.location.href = `/conversation/${match.conversationId}`;
                } else {
                  console.error("No conversation ID available");
                }
              }}
            >
              MESSAGE
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
