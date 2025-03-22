import { DetailTeam } from '@/types/form';
import React from 'react';
import { getImageUrl } from "@/utils/getImage";

const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export default function ListMyTeam({ listMyTeam, setMyTeamIndex }: { listMyTeam: DetailTeam[] | null, setMyTeamIndex: (index: number) => void }) {
    console.log("listMyTeam:", listMyTeam);
    if (!listMyTeam) {
        return <p>Dữ liệu listMyTeam là null</p>;
    }
    if (listMyTeam.length === 0) {
        return <p>Danh sách đội trống</p>;
    }
    console.log("Members of each team:", listMyTeam.map(team => ({ id: team.id, members: team.members })));
    return (
        <div className="space-y-4">
            {listMyTeam.map((team, index) => (
                <div
                    key={team.id}
                    className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden  flex flex-col sm:flex-row"
                >
                    <div className="relative h-28 sm:h-40 sm:w-1/4 flex-shrink-0">
                        <img
                            alt="Team Cover"
                            className="w-full h-full object-cover"
                            src={team.cover ? getImageUrl(team.cover) : "/images/field.png"}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:flex-1 p-3 sm:p-4">
                        <div className="relative flex-shrink-0 sm:-ml-10 -mt-10 sm:mt-0 sm:mr-3">
                            <img
                                alt="Team Logo"
                                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-3 border-white object-cover bg-white/80 shadow-sm"
                                src={team.logo ? getImageUrl(team.logo) : "/images/arsenal.png"}
                            />
                        </div>
                        <div className="flex flex-row items-center flex-grow  sm:mt-0 justify-between">
                            <h2 className="text-base sm:text-lg font-semibold text-black">{team.name}</h2>
                            <div className="grid grid-cols-2 gap-4 text-gray-700">
                                <div className="flex flex-col items-center p-1 rounded-lg bg-gray-50">
                                    <span className="text-sm mb-1">🏆</span>
                                    <span className="text-sm font-medium">{team.sport}</span>
                                </div>
                                <div className="flex flex-col items-center p-1 rounded-lg bg-gray-50">
                                    <span className="text-sm mb-1">👥</span>
                                    <span className="text-sm font-medium">{team.totalMembers}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end sm:ml-3">
                            
                                <button onClick={() => setMyTeamIndex(index)} className="py-1.5 px-3 sm:py-2 sm:px-4 border text-sm sm:text-base border-black text-black font-semibold rounded-md hover:bg-gray-100 transition duration-300">
                                    DETAIL
                                </button>

                        </div>
                    </div>
                </div>

            ))}
        </div>
    );
}