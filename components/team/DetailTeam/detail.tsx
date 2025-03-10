"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import TeamHeader from "../inforTeam/intro";

import TeamDetailApi from "@/service/teamDetail";
import { DetailTeam, Player } from "@/types/form";
import { getImageUrl } from "@/utils/getImage";

export default function TeamDetail() {
  const { teamId } = useParams();
  const [team, setTeam] = useState<DetailTeam | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = 1;
  const params = useParams();
  const { detailID } = useParams();
  const parsedTeamId = parseInt(detailID as string, 10);

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        const response = await TeamDetailApi.getTeamDetail(
          parsedTeamId,
          userId,
        );

        if (response?.data) {
          setTeam(response.data);
          setPlayers(
            Array.isArray(response.data.members) ? response.data.members : [],
          );
        } else {
          throw new Error("Dữ liệu không hợp lệ");
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetail();
  }, [detailID, userId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;

  return (
    <div className="w-full mx-auto mt-10 p-4">
      {team && (
        <>
          <TeamHeader teamId={team.id} {...team} />
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
                    <tr key={player.id} className="border-b">
                      <td className="px-4 md:px-6 py-3">
                        <img
                          alt={player.name}
                          className="w-20 h-20 object-cover"
                          src={
                            player.avatar
                              ? getImageUrl(player.avatar)
                              : "/default-avatar.png"
                          }
                        />
                      </td>
                      <td className="px-4 md:px-6 py-3 font-semibold">
                        {player.name}
                      </td>
                      <td className="px-4 md:px-6 py-3">
                        {player.height ? `${player.height} cm` : "N/A"}
                      </td>
                      <td className="px-4 md:px-6 py-3">
                        {player.weight ? `${player.weight} kg` : "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500 mt-4">
                Don't have players
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
