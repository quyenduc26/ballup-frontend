"use client";

import { useEffect, useState } from "react";
import TeamHeader from "@/components/team/inforTeam/intro";
import TeamTable from "@/components/team/inforTeam/tableTeam";

export default function TeamIntro() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(
          "https://6520d354906e276284c4b3a6.mockapi.io/api/v1/user"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch teams");
        }
        const data = await response.json();
        setTeams(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <p className="text-center">Đang tải dữ liệu...</p>;
  if (error) return <p className="text-center text-red-500">Lỗi: {error}</p>;

  return (
    <div className="w-full mx-auto mt-10 p-4">
      <TeamHeader
        logo="/ARSENAL-logo.png"
        name="ARSENAL"
        description="Đội bóng đá 'hay' nhất Việt Nam. Nơi hội tụ các nhân tài đất Việt"
        frequency="2-3 trận / tuần"
        location="Đà Nẵng"
      />
      <TeamTable players={teams} />
    </div>
  );
}
