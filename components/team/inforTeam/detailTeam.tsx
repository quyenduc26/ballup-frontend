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

  const team_id = Number(localStorage.getItem("teamId"));
  const user_id = Number(localStorage.getItem("userId"));

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        const response = await TeamApi.getTeamDetail(team_id, user_id);

        setTeam(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamDetail();
  }, []);

  if (loading) return <p className="text-center">Loading data...</p>;
  if (error) return <p className="text-center text-red-500">error: {error}</p>;

  return (
    <div className="w-full mx-auto mt-10 p-4">
      {team && (
        <>
          <TeamHeader
            address={team.address}
            cover={team.cover}
            intro={team.intro}
            logo={team.logo}
            name={team.name}
            sport={team.sport}
            teamId={team.id}
          />
          <PlayerTable players={team.members || []} teamId={team.id} />
        </>
      )}
    </div>
  );
}
