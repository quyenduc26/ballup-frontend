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
        description: string;
        createdAt: string;
        location: string;
        members: number;
    };
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
    return (
        <div className=" bg-white rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 ">
            <div className="relative h-40">
                <Image src={Field} alt="Background" layout="fill" objectFit="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
            <div className="relative -mt-12 flex justify-end mr-6">
                <Image
                    src={team.logo || Arsenal}
                    alt={team.name}
                    width={0}
                    height={0}
                    className="rounded-full border-4 border-white shadow-lg w-36 h-36"
                />
            </div>
            <div className="p-5">
                <h2 className="text-xl font-bold text-black mb-2">{team.name}</h2>
                <p className="text-gray-600 text-base mb-4">{team.description}</p>
                <div className="grid grid-cols-3 gap-3 text-gray-700 mb-4">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                        <span className="text-base mb-1">📅</span>
                        <span className="font-medium">{team.createdAt}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                        <span className="text-base mb-1">📍</span>
                        <span className="font-medium">{team.location}</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50">
                        <span className="text-base mb-1">👥</span>
                        <span className="font-medium">{team.members}</span>
                    </div>
                </div>
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