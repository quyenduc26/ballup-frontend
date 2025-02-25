"use client";

import TeamCard from "@/components/CardTeam";

export default function Home() {

    const teamData = {
        name: "Manchester United",
        logo: "/manutd-logo.png",
        description: "Đá giao lưu cuối tuần hoặc khi có thời gian",
        createdAt: "14/2/2024",
        location: "Đà Nẵng",
        members: 6,
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <TeamCard team={teamData} />
        </div>
    );
}


