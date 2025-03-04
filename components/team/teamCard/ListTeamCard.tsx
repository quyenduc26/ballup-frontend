import { useEffect, useState } from "react";
import TeamCard from "./CardTeam";
import teamApi from "@/service/teamCardApi";

interface Team {
  id: number;
  name: string;
  logo: string;
  cover: string;
  intro: string;
  address: string;
  sport: string;
  totalMembers: number;
}

const ListTeamCard: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await teamApi.getAllTeams({ });
        console.log("API response:", response.data);
        setTeams(response.data);
      } catch (err: any) {
        console.error("API error:", err);
        setError(err.response?.data?.message || "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);
  if (loading)
    return <p className="text-center text-gray-500 mt-6">Loading teams...</p>;

  if (error)
    return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {teams.length > 0 ? (
         teams.map((team, index) => <TeamCard key={team.id || index} team={team} />)
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
