import React from "react";

import { DetailTeam } from "@/types";
import { getImageUrl } from "@/utils/getImage";

export default function TeamOverView({ team }: { team: DetailTeam }) {
  return (
    <>
      <div className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative rounded-full overflow-hidden bg-gray-200">
            {team.logo ? (
              <img
                alt={team.name}
                className="object-cover"
                src={getImageUrl(team.logo) || "/placeholder.svg"}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Logo
              </div>
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg">{team.name}</h3>
            <p className="text-sm text-gray-600">{team.sport}</p>
            <p className="text-sm text-gray-600">
              {team.members?.length} members
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
