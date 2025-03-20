"use client";

import type { GameResponse } from "@/types";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { getImageUrl } from "@/utils/getImage";
import { formatTimestamp } from "@/utils/formatTimestamp";
import matchApi from "@/service/matchApi";

interface MatchCardProps {
  match: GameResponse;
  onUpdate?: () => void;
}

export default function MatchCard({ match, onUpdate }: MatchCardProps) {
  const [teamBPlayers, setTeamBPlayers] = useState<any[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [joinMessage, setJoinMessage] = useState("");
  const router = useRouter();
  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parsedData?.id;

  useEffect(() => {
    if (match.teamB?.members && match.teamB.members.length > 0) {
      setTeamBPlayers(match.teamB.members);

      // Check if current user is already in the team
      const isUserInTeam = match.teamB.members.some(
        (member) => member.id === userId,
      );

      if (isUserInTeam) {
        setHasJoined(true);
        setJoinMessage("You have already joined this match");
      }
    }
  }, [match, userId]);

  const handleJoinSingle = async () => {
    if (hasJoined) {
      toast.warning("You have already joined this match!");
      return;
    }

    try {
      setLoadingSingle(true);
      const response = await matchApi.joinGame(match.id, userId);

      if (response.status === 200) {
        // Tạo thông tin người dùng hiện tại
        const userData = {
          id: userId,
          lastName: parsedData.lastName || "Current",
          firstName: parsedData.firstName || "User",
          avatar: parsedData.avatar || "/image/image1.png",
        };

        // Cập nhật danh sách thành viên team B
        if (
          response.data?.teamB?.members &&
          response.data.teamB.members.length > 0
        ) {
          setTeamBPlayers(response.data.teamB.members);
        } else {
          // Nếu không có thành viên từ API, thêm người dùng hiện tại
          setTeamBPlayers([userData]);
        }

        setHasJoined(true);
        setJoinMessage("You've joined as a single player");
        toast.success("Successfully joined the game!");
        onUpdate?.();
      }
    } catch (error) {
      console.error("Error joining game:", error);
      toast.error("Failed to join game");
    } finally {
      setLoadingSingle(false);
    }
  };

  const handleJoinTeam = async () => {
    if (hasJoined) {
      toast.warning("You have already joined this match!");
      return;
    }

    try {
      setLoadingTeam(true);
      const response = await matchApi.joinGameAsTeam(match.id, userId);

      if (response.status === 200) {
        const updatedMatch = response.data;

        if (updatedMatch?.teamB?.members) {
          setTeamBPlayers(updatedMatch.teamB.members);
        }

        setHasJoined(true);
        setJoinMessage("You've joined as a team");
        toast.success("Successfully joined as team!");
        onUpdate?.();
        router.push("/match?view=myMatch");
      }
    } catch (error) {
      console.error("Error joining team:", error);
      toast.error("Failed to join as team");
    } finally {
      setLoadingTeam(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 h-full transition transform hover:scale-105">
      {/* Cover Image */}
      <div className="relative">
        <img
          alt="Match Cover"
          className="w-full h-28 sm:h-36 object-cover border-b border-gray-300"
          src={getImageUrl(match.cover) || "/placeholder.svg"}
        />
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
          {match.type}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-4 pt-12 sm:pt-16 relative">
        <div className="absolute left-0 right-0 sm:-top-12 flex justify-between px-4 sm:px-8">
          <div className="w-20 h-20 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
            <img
              alt={match.teamA?.name || "Team A"}
              className="w-full h-full object-cover"
              src={getImageUrl(match.teamA?.logo) || "/placeholder.svg"}
            />
          </div>
          <div className="w-20 h-20 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
            <img
              alt="Team B"
              className="w-full h-full object-cover"
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

        <div className="grid grid-cols-3 gap-2 items-start">
          <div className="flex flex-col items-center mt-20">
            <h2 className="text-sm sm:text-lg font-bold text-center">
              {match.teamA?.name || "TEAM A"}
            </h2>
            <ul className="text-xs text-gray-600 space-y-1 mt-1 w-full max-w-[100px] mx-auto">
              {match.teamA?.members && match.teamA.members.length > 0 ? (
                match.teamA.members.slice(0, 3).map((member, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center gap-1"
                  >
                    <img
                      alt={`${member.firstName} ${member.lastName}`}
                      className="w-5 h-5 rounded-full"
                      src={getImageUrl(member.avatar) || "/default-avatar.png"}
                    />
                    <span className="truncate text-xs">
                      {member.lastName} {member.firstName}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-center text-xs">No team</li>
              )}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center">
              <img
                alt="VS"
                className="w-12 h-12 sm:w-16 sm:h-16"
                src="/images/VS.png"
              />
            </div>
            <div className="text-center mt-1">
              <p className="text-xs font-bold">
                {formatTimestamp(match.fromTime)}
              </p>
              <p className="text-xs sm:text-lg mt-4 text-gray-700 truncate max-w-full">
                {match.centerName || match.slotName}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center mt-20">
            <h2 className="text-sm sm:text-base font-bold text-center">
              TEAM B
            </h2>
            <ul className="text-xs text-gray-600 space-y-1 mt-1 w-full max-w-[100px] mx-auto">
              {teamBPlayers.length > 0 ? (
                teamBPlayers.slice(0, 3).map((player, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-center gap-1"
                  >
                    <img
                      alt={`${player.firstName} ${player.lastName}`}
                      className="w-5 h-5 rounded-full"
                      src={getImageUrl(player.avatar) || "/default-avatar.png"}
                    />
                    <span className="truncate text-xs">
                      {player.lastName} {player.firstName}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-center text-xs">No players yet</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10">
          {hasJoined ? (
            <div className="bg-green-100 border border-green-500 text-green-700 p-3 rounded text-center">
              {joinMessage}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                className="border-2 border-black py-3 text-sm font-bold text-black rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={loadingTeam || hasJoined}
                onClick={handleJoinTeam}
              >
                {loadingTeam ? "Joining..." : "JOIN MATCH"}
              </button>
              <button
                className="bg-black text-white py-3 text-sm font-bold rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                disabled={loadingSingle || hasJoined}
                onClick={handleJoinSingle}
              >
                {loadingSingle ? "Joining..." : "JOIN SINGLE"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}