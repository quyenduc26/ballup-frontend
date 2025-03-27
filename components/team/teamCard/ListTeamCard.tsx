"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Spinner } from "@heroui/react";

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

  // State to store search parameters
  const [params, setParams] = useState<Record<string, string>>({
    name: "",
    address: "",
    sport: "",
  });

  const searchParams = useSearchParams();

  // Update params from URL
  const updateParams = () => {
    const newParams: Record<string, string> = {};

    if (searchParams.get("name")) newParams.name = searchParams.get("name")!;
    if (searchParams.get("address")) newParams.address = searchParams.get("address")!;
    if (searchParams.get("sport")) newParams.sport = searchParams.get("sport")?.toUpperCase()!;

    setParams(newParams);
  };

  // Fetch teams with search parameters
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const response = await teamApi.getAllTeams(params);

      console.log("Fetched teams:", response.data);
      setTeams(response.data);
      setError(null);
    } catch (err: any) {
      console.error("API error in getAllTeams:", err);
      setError(err.response?.data?.message || "Failed to fetch teams");
      setTeams([]);
    } finally {
      setLoading(false);
    }
  };

  // Update params when search params change
  useEffect(() => {
    updateParams();
  }, [searchParams]);

  // Fetch teams when params change
  useEffect(() => {
    fetchTeams();
  }, [params]);

  if (loading)
    return (
      <div className="flex justify-center items-center">
        <Spinner className="mb-5" color="default" />
      </div>
    );

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