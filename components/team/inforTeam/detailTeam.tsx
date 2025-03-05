"use client";
import { useEffect, useState } from "react";

import TeamHeader from "../inforTeam/intro";
import PlayerTable from "../inforTeam/tableTeam";

import TeamApi from "@/service/teamCardApi";
import { DetailTeam } from "@/types/form";

export default function TeamIntro() {
  const [team, setTeam] = useState<DetailTeam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        const response = await TeamApi.getTeamDetail(20, 1);

        console.log("detail team: ", response.data);
        setTeam(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Lỗi khi tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetail();
  }, []);

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;

  return (
    <div className="w-full mx-auto mt-10 p-4">
      {team && (
        <>
          <TeamHeader
            address={team.address}
            intro={team.intro}
            logo={team.logo}
            name={team.name}
            sport={team.sport}
          />
          <PlayerTable players={team.members || []} teamId={team.id} />
        </>
      )}
    </div>
  );
}
