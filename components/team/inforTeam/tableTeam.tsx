import Link from "next/link";
import Image from "next/image";
import { Eye, Pencil } from "lucide-react";
import { Player } from "@/types/form";

interface PlayerTableProps {
    players: Player[];
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
    return (
        <div className="overflow-x-auto mt-6">
            <table className="min-w-full bg-white shadow-md rounded-lg text-sm md:text-base">
                <thead className="bg-black text-white">
                    <tr>
                        <th className="px-4 md:px-6 py-3 text-left">AVATAR</th>
                        <th className="px-4 md:px-6 py-3 text-left">NAME</th>
                        <th className="px-4 md:px-6 py-3 text-left hidden md:table-cell">HEIGHT</th>
                        <th className="px-4 md:px-6 py-3 text-left hidden md:table-cell">WEIGHT</th>
                        <th className="px-4 md:px-6 py-3 text-left">ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.id} className="border-b">
                            <td className="px-4 md:px-6 py-3">
                                <Image
                                    src={player.avatar || "/default-avatar.png"}
                                    alt={player.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover"
                                />
                            </td>
                            <td className="px-4 md:px-6 py-3 font-semibold">{player.name}</td>
                            <td className="px-4 md:px-6 py-3 hidden md:table-cell">{player.height ? `${player.height} cm` : "N/A"}</td>
                            <td className="px-4 md:px-6 py-3 hidden md:table-cell">{player.weight ? `${player.weight} kg` : "N/A"}</td>
                            <td className="px-4 md:px-6 py-3 flex space-x-2">
                                <Link href={`/team/players/${player.id}`}>
                                    <span className="text-blue-500 cursor-pointer"><Eye /></span>
                                </Link>
                                <Link href={`/team/players/edit/${player.id}`}>
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