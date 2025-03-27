"use client";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import UpdateTeamDetail from "../inforTeam/UpdateTeamDetail"; // Giả sử đường dẫn đúng

import TeamDetailApi from "@/service/teamDetail";
import { DetailTeam, Player } from "@/types/form";
import { getImageUrl } from "@/utils/getImage";
import { SonnerToast } from "@/components/sonnerMesage";
export default function TeamDetail() {
  const [team, setTeam] = useState<DetailTeam | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [headerLoading, setHeaderLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [toastData, setToastData] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);

  const router = useRouter();
  const editDialogRef = useRef<HTMLDialogElement>(null);

  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parsedData?.id;

  const { detailID } = useParams();
  const parsedTeamId = detailID ? parseInt(detailID as string, 10) : NaN;

  const [teamId, setTeamId] = useState<string | null>(
    parsedTeamId ? String(parsedTeamId) : null,
  );

  useEffect(() => {
    if (!parsedTeamId) {
      const storedTeamId = localStorage.getItem("teamId");

      if (storedTeamId) {
        setTeamId(storedTeamId);
      }
    }
  }, [parsedTeamId]);

  const fetchTeamDetail = async () => {
    if (isNaN(parsedTeamId) || !userId) {
      console.log(isNaN(parsedTeamId) || !userId);
      setError("Thông tin đội hoặc người dùng không hợp lệ");
      setLoading(false);

      return;
    }

    try {
      console.log(
        "Fetching team detail for teamId:",
        parsedTeamId,
        "userId:",
        userId,
      );
      const response = await TeamDetailApi.getTeamDetail(parsedTeamId, userId);

      console.log("Team detail response:", response);

      if (response?.data) {
        setTeam(response.data);

        console.log("Members data:", response.data.members);

        const processedPlayers = Array.isArray(response.data.members)
          ? response.data.members.map((player: any) => {
            const nameFromApi =
              player.name && typeof player.name === "string"
                ? player.name
                : null;
            const lastName = player.lastName || "";
            const firstName = player.firstName || "";
            const fullName =
              nameFromApi || `${lastName} ${firstName}`.trim() || "Unknown";

            console.log(
              `Player ID: ${player.id}, nameFromApi: ${nameFromApi}, lastName: ${lastName}, firstName: ${firstName}, fullName: ${fullName}`,
            );

            return {
              ...player,
              name: fullName,
            };
          })
          : [];

        setPlayers(processedPlayers);
      } else {
        throw new Error("Dữ liệu không hợp lệ");
      }
    } catch (err: any) {
      console.error("API Error:", err.response?.data || err);
      setError(
        err?.response?.data?.message ||
        "Lỗi khi tải dữ liệu. Vui lòng thử lại.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamDetail();
  }, [detailID, userId, refresh]);

  // Hàm xử lý khi nhấn Edit
  const hanUpdateForm = () => {
    if (!teamId) {
      alert("No team ID available. Cannot edit.");

      return;
    }
    editDialogRef.current?.showModal();
  };

  const handleDeleteTeam = async () => {
    if (!teamId) {
      alert("No team ID found. Cannot delete team.");

      return;
    }

    if (!window.confirm("Are you sure you want to delete this team?")) return;

    setHeaderLoading(true);
    try {
      const data = localStorage.getItem("data");
      const parsedData = data ? JSON.parse(data) : null;
      const userId = parsedData?.id;

      if (!userId) {
        setToastData({
          heading: "Error",
          message: "User not found. Please log in again.",
          type: "error",
        });

        return;
      }

      await TeamDetailApi.deleteTeam(parseInt(teamId), userId);

      setToastData({
        heading: "Success",
        message: "Team has been deleted successfully!",
        type: "success",
      });

      setTimeout(() => {
        router.push("/team");
      }, 1000);
    } catch (error) {
      console.error("Error deleting team:", error);
      setToastData({
        heading: "Error",
        message: "Failed to delete team!",
        type: "error",
      });
    } finally {
      setHeaderLoading(false);
      setShowOptions(false);
    }
  };

  const handleLeaveTeam = async () => {
    if (!window.confirm("Are you sure you want to leave this team?")) return;

    setHeaderLoading(true);
    try {
      const data = localStorage.getItem("data");
      const parsedData = data ? JSON.parse(data) : null;
      const memberId = parsedData?.id;

      if (!memberId) {
        setToastData({
          heading: "Error",
          message: "User not found. Please log in again.",
          type: "error",
        });

        return;
      }

      if (teamId) await TeamDetailApi.leaveTeam(parseInt(teamId), memberId);

      setToastData({
        heading: "Success",
        message: "You have left the team successfully!",
        type: "success",
      });

      setTimeout(() => {
        router.push("/team");
      }, 1000);
    } catch (error) {
      console.error("Error leaving team:", error);
      setToastData({
        heading: "Error",
        message: "Failed to leave the team!",
        type: "error",
      });
    } finally {
      setHeaderLoading(false);
      setShowOptions(false);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="w-full mx-auto mt-10 p-4">
      {team && (
        <>
          {/* Phần TeamHeader được gộp vào đây */}
          <div className="w-full border-t border-gray-200 bg-white">
            {toastData && <SonnerToast toast={toastData} />}
            <div className="flex justify-center md:justify-start">
              <img
                alt="Team Cover"
                className="w-full h-64 border-2 border-white object-cover"
                src={team.cover ? getImageUrl(team.cover) : "/images/field.png"}
              />
            </div>
            <div className="flex flex-col md:flex-row items-center p-4">
              <div className="pr-0 md:pr-4 flex justify-center md:block">
                <img
                  alt="Team Logo"
                  className="w-36 h-36 rounded-full border-2 border-white object-cover"
                  src={
                    team.logo ? getImageUrl(team.logo) : "/images/arsenal.png"
                  }
                />
              </div>
              <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                <h1 className="text-xl md:text-2xl font-bold text-black">
                  {team.name}
                </h1>
                <p className="text-sm text-gray-600">{team.intro}</p>
                <p className="text-sm text-gray-600">{team.address}</p>
              </div>
            </div>
            <dialog
              ref={editDialogRef}
              className="p-6 bg-white rounded-lg shadow-lg w-200"
            >
              <div className="flex justify-end items-end pb-2">
                <button
                  className="text-black text-large"
                  onClick={() => editDialogRef.current?.close()}
                >
                  ✕
                </button>
              </div>
              {teamId ? (
                <UpdateTeamDetail
                  teamId={teamId}
                  onClose={() => editDialogRef.current?.close()}
                  onUpdateSuccess={() => setRefresh((prev) => !prev)}
                />
              ) : (
                <p className="text-red-500">
                  No team ID available. Cannot edit.
                </p>
              )}
            </dialog>
          </div>

          {/* Phần danh sách players */}
          <div className="overflow-x-auto mt-6">
            {players.length > 0 ? (
              <table className="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="px-4 md:px-6 py-3 text-left">AVATAR</th>
                    <th className="px-4 md:px-6 py-3 text-left">NAME</th>
                    <th className="px-4 md:px-6 py-3 text-left">HEIGHT</th>
                    <th className="px-4 md:px-6 py-3 text-left">WEIGHT</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr
                      key={player.id}
                      className={`border-b ${player.id === userId ? "bg-blue-200 text-blue-800 font-bold" : ""}`}
                    >
                      <td className="px-4 md:px-6 py-3">
                        <img
                          alt={player.name}
                          className="w-20 h-20 object-cover"
                          src={player?.avatar ? `${player.avatar}?t=${new Date().getTime()}` : "/images/userProfile.png"}
                        />
                      </td>
                      <td className="px-4 md:px-6 py-3 font-semibold">{player.name}</td>
                      <td className="px-4 md:px-6 py-3">{player.height ? `${player.height} cm` : "N/A"}</td>
                      <td className="px-4 md:px-6 py-3">{player.weight ? `${player.weight} kg` : "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 mt-4">Don&apos;t have players</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
