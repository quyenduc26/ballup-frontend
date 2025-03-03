"use client";

import Image from "next/image";
import Link from "next/link";
import img from "@/public/images/image 3.png";
import SearchBar from "../search/searchPage";
import Banner from "@/components/Banner"

const Team = () => {

    return (
        <div className="container mx-auto max-w-[1400px] px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-black py-4 md:py-6 text-center md:text-left">
                TEAM
            </h1>

                <Banner/>

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
