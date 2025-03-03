import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export default function Home() {
    const sports = [
        { name: "FOOTBALL", link: "/football" },
        { name: "BADMINTON", link: "/badminton" },
        { name: "PICKLEBALL", link: "/pickleball" },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-5xl w-full">
                <div>
                    <h2 className="text-2xl font-bold text-black">OUR SPORTS</h2>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                        Sports not only provide health benefits but also help develop teamwork,
                        perseverance, and a winning spirit. From football and badminton to other sports,
                        each discipline offers unique experiences and challenges.
                        Discover and embrace the spirit of sports today!
                    </p>

                </div>

                <div>
                    {sports.map((sport, index) => (
                        <div key={index} className="flex justify-between items-center border-b border-black py-4">
                            <Link href={sport.link} className="font-bold text-lg text-black">
                                {sport.name}
                            </Link>
                            <FiExternalLink className="text-xl text-black cursor-pointer" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
