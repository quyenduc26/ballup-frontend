"use client";
import Image from "next/image";
import image from "@/public/images/image 3.png";
import Arsenal from "@/public/images/arsenal.png";
import Field from "@/public/images/field.png";


interface TeamCardProps {
    team: {
        id: number;
        name: string;
        logo: string;
        cover: string;
        intro: string;
        address: string;
        sport: string;
        totalMembers: number;
    };
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
    console.log("TeamCard received team:", team);

    if (!team) {
        return <p className="text-red-500">Invalid team data</p>;
    }

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105">
            {/* Cover Image */}
            <div className="relative h-40">
                <Image
                    src={Arsenal}
                    alt="Team Cover"
                    layout="fill"
                    objectFit="cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Logo */}
            <div className="relative -mt-12 flex justify-end mr-6">
                <Image
                    src={Field}
                    alt="Team Cover"
                    layout="fill"
                    objectFit="cover"
                />

            </div>

            {/* Team Info */}
            <div className="p-5">
                <h2 className="text-xl font-bold text-black mb-2">{team.name}</h2>
                <p className="text-gray-600 text-base mb-4">{team.intro}</p>

                {/* Details */}
                <div className="grid grid-cols-3 gap-3 text-gray-700 mb-4">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                        <span className="text-base mb-1">📍</span>
                        <span className="font-medium">{team.address}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                        <span className="text-base mb-1">🏆</span>
                        <span className="font-medium">{team.sport}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                        <span className="text-base mb-1">👥</span>
                        <span className="font-medium">{team.totalMembers}</span>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-4">
                    <button className="w-full py-2 px-4 border-2 border-black text-black font-semibold rounded-lg hover:bg-gray-100 transition duration-300">
                        DETAIL
                    </button>
                    <button className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition duration-300">
                        JOIN TEAM
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
