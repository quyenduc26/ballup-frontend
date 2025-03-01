import Image from "next/image";
import image from "../public/images/player.png";

interface TeamCardProps {
    team: {
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
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Background Image */}
            <div className="relative h-40">
                <Image
                    src={image}
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            <div className="relative -mt-12 flex justify-center">
                <Image
                    src={team.logo}
                    alt={team.name}
                    width={80}
                    height={80}
                    className="rounded-full border-4 border-white"
                />
            </div>

            {/* Team Info */}
            <div className="p-4 text-center">
                <h2 className="text-xl font-bold">{team.name}</h2>
                <p className="text-gray-600">{team.description}</p>

                {/* Additional Info */}
                <div className="mt-2 text-gray-500 text-sm">
                    <p>📅 Tạo đội ngày {team.createdAt}</p>
                    <p>📍 {team.location}</p>
                    <p>👥 {team.members} thành viên</p>
                </div>

                {/* Buttons */}
                <div className="mt-4">
                    <button className="w-full py-2 px-4 border border-black text-black font-semibold rounded-lg hover:bg-gray-200">
                        DETAIL
                    </button>
                    <button className="w-full mt-2 py-2 px-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-800">
                        JOIN TEAM
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamCard;
