import { useEffect, useState } from "react";

import TeamCard from "./CardTeam";

import teamApi from "@/service/teamCardApi";
import { Team } from "@/types/form";

interface ListTeamCardProps {
  onTeamJoined: () => void;
}

const ListTeamCard: React.FC<ListTeamCardProps> = ({ onTeamJoined }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await teamApi.getAllTeams({ timestamp: Date.now() });

        console.log("Fetched teams:", response.data);
        setTeams(response.data);
      } catch (err: any) {
        console.error("API error in getAllTeams:", err);
        setError(err.response?.data?.message || "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-6">Loading teams...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard
              key={`team-${team.id}`}
              team={team}
              onJoinSuccess={onTeamJoined}
            />
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-500">
            No teams found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ListTeamCard;
