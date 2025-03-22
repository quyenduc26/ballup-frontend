import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";

export default function IntroHomePage() {
  const sports = [
    { name: "FOOTBALL", link: "/football" },
    { name: "BADMINTON", link: "/badminton" },
    { name: "PICKLEBALL", link: "/pickleball" },
  ];

  return (
    <div className=" flex items-center justify-center bg-white px-10 py-10 mt-10 mb-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-40 max-w-7xl w-full">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-black">
            OUR SPORTS
          </h2>
          <p className="mt-4 text-gray-700 text-sm md:text-lg leading-relaxed">
            Sports not only provide health benefits but also help develop
            teamwork, perseverance, and a winning spirit. From football and
            badminton to other sports, each discipline offers unique experiences
            and challenges. Discover and embrace the spirit of sports today!
          </p>
        </div>

        <div>
          {sports.map((sport, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-black py-3 md:py-4"
            >
              <Link
                className="font-bold text-sm md:text-lg text-black"
                href={sport.link}
              >
                {sport.name}
              </Link>
              <FiExternalLink className="text-lg md:text-xl text-black cursor-pointer" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
