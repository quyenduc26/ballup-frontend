import Link from "next/link";
import Soccer from "@/public/images/soccer.png";
import Image from "next/image";
import { Eye, Pencil } from "lucide-react";

interface Player {
    id: number;
    name: string;
    username: string;
    position: string;
    country: string;
    height: number;
    weight: number;
}

interface PlayerTableProps {
    players: Player[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="px-4 md:px-6 py-3 text-left">NAME</th>
                        <th className="px-4 md:px-6 py-3 text-left">POSITION</th>
                        <th className="px-4 md:px-6 py-3 text-left">COUNTRY</th>
                        <th className="px-4 md:px-6 py-3 text-left hidden md:table-cell">HEIGHT</th>
                        <th className="px-4 md:px-6 py-3 text-left hidden md:table-cell">WEIGHT</th>
                        <th className="px-4 md:px-6 py-3 text-left">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.id} className="border-b">
                            <td className="px-4 md:px-6 py-3 flex items-center space-x-2">
                                <Image src={Soccer} alt="Team Logo" className="w-10 h-10 md:w-14 md:h-14 rounded-full" />
                                <div>
                                    <p className="font-semibold">{player.name}</p>
                                    <p className="text-xs md:text-sm text-gray-500">@{player.username}</p>
                                </div>
                            </td>
                            <td className="px-4 md:px-6 py-3">{player.position}</td>
                            <td className="px-4 md:px-6 py-3 flex items-center">
                                <img src="/vietnam-flag.png" alt="Vietnam Flag" className="w-4 h-3 md:w-6 md:h-4 mr-2" />
                                {player.country}
                            </td>
                            <td className="px-4 md:px-6 py-3 hidden md:table-cell">{player.height} cm</td>
                            <td className="px-4 md:px-6 py-3 hidden md:table-cell">{player.weight} kg</td>
                            <td className="px-4 md:px-6 py-3 flex space-x-2">
                                <Link href={`/players/${player.id}`}>
                                    <span className="text-blue-500 cursor-pointer"><Eye /></span>
                                </Link>
                                <Link href={`/players/edit/${player.id}`}>
                                    <span className="text-green-500 cursor-pointer"><Pencil /></span>
                                </Link>
                                <button className="text-red-500">❌</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PlayerTable;