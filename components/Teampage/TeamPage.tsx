"use client";

import Image from "next/image";
import Link from "next/link";
import img from "@/public/images/image 3.png";
import SearchBar from "../search/searchPage";

const Team = () => {

    return (
        <div className="container mx-auto max-w-[1400px] px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-black py-4 md:py-6 text-center md:text-left">
                TEAM
            </h1>

            <div className="relative w-full h-[200px] md:h-[300px] overflow-hidden">
                <Image
                    src={img}
                    alt="Badminton"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8 p-4">
                <Link
                    href="/teamPage/explore"
                    className="text-lg md:text-2xl font-semibold text-black hover:text-blue-500 transition-all hover:underline"
                >
                    EXPLORE
                </Link>
                <Link
                    href="/teamPage/team"
                    className="text-lg md:text-2xl font-semibold text-black hover:text-blue-500 transition-all hover:underline"
                >
                    MY TEAM
                </Link>
            </div>
            <SearchBar/>

        </div>
    );
};

export default Team;
