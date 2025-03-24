"use client";

import TeamHeader from "../inforTeam/intro";
import PlayerTable from "../inforTeam/tableTeam";

import { DetailTeam } from "@/types/form";

export default function TeamIntro({ teamDetail }: { teamDetail: DetailTeam }) {
  console.log("teamDetail:", teamDetail);

  return (
    <div className="w-full mx-auto mt-10 p-4">
      {teamDetail ? (
        <>
          <TeamHeader
            address={teamDetail.address}
            cover={teamDetail.cover}
            intro={teamDetail.intro}
            logo={teamDetail.logo}
            name={teamDetail.name}
            sport={teamDetail.sport}
            teamId={teamDetail.id}
          />
          <PlayerTable
            players={teamDetail.members || []}
            teamId={teamDetail.id}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">
          You have not joined any teams yet.
        </p>
      )}
    </div>
  );
}
