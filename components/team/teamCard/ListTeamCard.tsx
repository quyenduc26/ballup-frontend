import { useEffect, useState } from "react";

import TeamCard from "./CardTeam";

import teamApi from "@/service/teamCardApi";
import { Team } from "@/types/form";

const ListTeamCard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(false); // Thêm state refresh

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await teamApi.getAllTeams({ timestamp: Date.now() });

        setTeams(response.data);
        console.log("Fetched teams after update:", response.data); // Debug dữ liệu mới
      } catch (err: any) {
        console.error("API error:", err);
        setError(err.response?.data?.message || "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, [refresh]);

  if (loading)
    return <p className="text-center text-gray-500 mt-6">Loading teams...</p>;

  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
        {teams.length > 0 ? (
          teams.map((team) => <TeamCard key={`team-${team.id}`} team={team} />)
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
