"use client";
import Link from "next/link";
import { Eye, Pencil, UserX } from "lucide-react";
import { useState } from "react";

import { SonnerToast } from "@/components/sonnerMesage";
import { Player } from "@/types/form";
import { getImageUrl } from "@/utils/getImage";
import TeamDetailApi from "@/service/teamDetail";

interface PlayerTableProps {
  players: Player[];
  teamId: number;
  onKickMember?: (id: number) => void;
}

const PlayerTable: React.FC<PlayerTableProps> = ({
  players,
  teamId,
  onKickMember,
}) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [toastData, setToastData] = useState<any>(null);

  // Xử lý danh sách players để đảm bảo tên được hiển thị đúng
  const processedPlayers = players.map((player) => {
    const nameFromApi = player.name && typeof player.name === "string" ? player.name : null;
    const lastName = player.lastName || "";
    const firstName = player.firstName || "";
    const fullName = nameFromApi || `${lastName} ${firstName}`.trim() || "Unknown";

    return {
      ...player,
      name: fullName,
    };
  });

  const handleKickMember = async (id: number) => {
    if (!window.confirm("Are you sure you want to remove this player?")) return;

    setLoadingId(id);
    try {
      const data = localStorage.getItem("data");
      const parsedData = data ? JSON.parse(data) : null;
      const userId = parsedData?.id;

      await TeamDetailApi.kickMember(id, { userId, teamId });

      setToastData({
        heading: "Success",
        message: "Player has been removed successfully!",
        type: "success",
      });

      onKickMember?.(id);
    } catch (error) {
      console.error("Error removing player:", error);

      setToastData({
        heading: "Error",
        message: "Failed to remove player!",
        type: "error",
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="overflow-x-auto mt-6">
      {toastData && <SonnerToast toast={toastData} />}

      <table className="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left">AVATAR</th>
            <th className="px-4 md:px-6 py-3 text-left">NAME</th>
            <th className="px-4 md:px-6 py-3 text-left">HEIGHT</th>
            <th className="px-4 md:px-6 py-3 text-left">WEIGHT</th>
            <th className="px-4 md:px-6 py-3 text-left">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {processedPlayers.map((player) => (
            <tr key={player.id} className="border-b">
              <td className="px-4 md:px-6 py-3">
                <img
                  alt={player.name}
                  className="w-20 h-20 object-cover"
                  src={
                    player.avatar
                      ? getImageUrl(player.avatar)
                      : "/images/userProfile.png"
                  }
                />
              </td>
              <td className="px-4 md:px-6 py-3 font-semibold">{player.name}</td>
              <td className="px-4 md:px-6 py-3">
                {player.height ? `${player.height} cm` : "N/A"}
              </td>
              <td className="px-4 md:px-6 py-3">
                {player.weight ? `${player.weight} kg` : "N/A"}
              </td>
              <td className="px-4 md:px-6 py-3 flex space-x-2">
                <Link href={`/team/players/${player.id}`}>
                  <span className="text-blue-500 cursor-pointer">
                    <Eye />
                  </span>
                </Link>
                <Link href={`/team/players/edit/${player.id}`}>
                  <span className="text-green-500 cursor-pointer">
                    <Pencil />
                  </span>
                </Link>
                <button
                  className="text-red-500"
                  disabled={loadingId === player.id}
                  onClick={() => handleKickMember(player.id)}
                >
                  {loadingId === player.id ? "Removing..." : <UserX />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;