"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { SonnerToast } from "@/components/sonnerMesage";
import { TeamCardProps } from "@/types/form";
import TeamApi from "@/service/teamCardApi";
import { getImageUrl } from "@/utils/getImage";

const truncateText = (text: string, maxLength: number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warning";
        duration?: number;
      }
    | undefined
  >();
  const router = useRouter();

  const handleJoinTeam = async () => {
    if (!team || !team.id || joined || loading) return;
    const user_id = 1;

    setLoading(true);

    try {
      await TeamApi.joinTeam(user_id, team.id);
      setJoined(true);
      setToastData({
        heading: "Success",
        message: "Successfully joined the team!",
        type: "success",
      });

      setTimeout(() => {
        router.replace(`/team/${team.id}`);
      }, 1500);
    } catch (error) {
      console.error("Error joining team:", error);
      setToastData({
        heading: "Error",
        message: "Failed to join the team",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!team) {
    return <p className="text-red-500">Invalid team data</p>;
  }

  return (
    <div className="relative">
      {toastData && (
        <div className="fixed top-4 right-4 z-50">
          <SonnerToast toast={toastData} />
        </div>
      )}

      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105">
        <div className="relative h-40">
          <img
            alt="Team Cover"
            className="w-full h-full object-cover"
            src={team.cover ? getImageUrl(team.cover) : "/images/field.png"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="relative -mt-12 flex justify-end mr-6">
          <img
            alt="Team Logo"
            className="w-28 h-28 rounded-full border-2 border-white object-cover"
            src={team.logo ? getImageUrl(team.logo) : "/images/arsenal.png"}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h2 className="text-xl font-bold text-black mb-2">{team.name}</h2>
          <p className="text-gray-600 text-base mb-4 flex-grow">{team.intro}</p>
          <div className="grid grid-cols-3 gap-3 text-gray-700 mb-4">
            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
              <span className="text-base mb-1">📍</span>
              <span className="font-medium truncate w-full text-center">
                {truncateText(team.address, 20)}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
              <span className="text-base mb-1">🏆</span>
              <span className="font-medium">{team.sport}</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
              <span className="text-base mb-1">👥</span>
              <span className="font-medium">{team.totalMembers}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-auto">
            <Link href={`/team/${team.id}`}>
              <button className="w-full py-2 px-4 border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-100 transition duration-300">
                DETAIL
              </button>
            </Link>
            <button
              className="w-full py-2 px-4 rounded-lg font-semibold transition duration-300 bg-black text-white hover:bg-gray-800 min-w-[120px] text-center"
              disabled={loading || joined}
              onClick={handleJoinTeam}
            >
              {joined ? "JOINED" : loading ? "JOINING..." : "JOIN TEAM"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
