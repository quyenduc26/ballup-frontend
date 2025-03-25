"use client";

import { useEffect, useState } from "react";

import TeamHeader from "../inforTeam/intro";
import PlayerTable from "../inforTeam/tableTeam";

import { DetailTeam } from "@/types/form";
import TeamDetailApi from "@/service/teamDetail";

export default function TeamIntro({ teamDetail }: { teamDetail: DetailTeam }) {
  const [teamData, setTeamData] = useState<DetailTeam | null>(teamDetail);

  useEffect(() => {
    const fetchTeamDetail = async () => {
      try {
        const data = localStorage.getItem("data");
        const parsedData = data ? JSON.parse(data) : null;
        const userId = parsedData?.id;

        if (!teamDetail?.id || !userId) return;

        const response = await TeamDetailApi.getTeamDetail(
          teamDetail.id,
          userId,
        );

        setTeamData(response.data);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchTeamDetail();
  }, [teamDetail.id]);

  return (
    <div className="w-full mx-auto mt-10 p-4">
      {teamData ? (
        <>
          <TeamHeader
            address={teamData.address}
            cover={teamData.cover}
            intro={teamData.intro}
            logo={teamData.logo}
            name={teamData.name}
            sport={teamData.sport}
            teamId={teamData.id}
          />
          <PlayerTable players={teamData.members || []} teamId={teamData.id} />
        </>
      ) : (
        <p className="text-center text-gray-500">
          You have not joined any teams yet.
        </p>
      )}
    </div>
  );
}
