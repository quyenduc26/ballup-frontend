"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import img from "@/public/images/image 3.png";

const Team = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [location, setLocation] = useState("");
    const [sport, setSport] = useState("");
    const [sort, setSort] = useState("");

    const router = useRouter();

    const handleSearch = () => {
        const query = new URLSearchParams();
        if (searchTerm) query.set("name", searchTerm);
        if (location) query.set("location", location);
        if (sport) query.set("sport", sport);
        if (sort) query.set("sort", sort);

        router.push(`/search?${query.toString()}`);
    };

    return (
        <div className="container mx-auto max-w-[1400px] px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white py-4 md:py-6 text-center md:text-left">
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
                    className="text-lg md:text-2xl font-semibold text-white hover:text-blue-500 transition-all hover:underline"
                >
                    EXPLORE
                </Link>
                <Link
                    href="/teamPage/team"
                    className="text-lg md:text-2xl font-semibold text-white hover:text-blue-500 transition-all hover:underline"
                >
                    MY TEAM
                </Link>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-white shadow-lg py-6 px-4 gap-4">
                {/* Search Input */}
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Enter keyword..."
                        className="w-full p-3 text-white outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="p-3 bg-black text-white hover:bg-gray-800 transition-all"
                    >
                        <Search />
                    </button>
                </div>

                {/* Dropdown Filters */}
                <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-2">
                    <select
                        className="p-2 md:p-3 border border-gray-300 rounded-md bg-black text-white shadow-sm cursor-pointer w-full md:w-[150px] flex-1"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    >
                        <option value="">PLACE</option>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP.HCM">TP.HCM</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                        <option value="Hải Phòng">Hải Phòng</option>
                        <option value="Nha Trang">Nha Trang</option>
                    </select>

                    <select
                        className="p-2 md:p-3 border border-gray-300 rounded-md bg-black text-white shadow-sm cursor-pointer w-full md:w-[150px] flex-1"
                        value={sport}
                        onChange={(e) => setSport(e.target.value)}
                    >
                        <option value="">SPORT</option>
                        <option value="Badminton">Badminton</option>
                        <option value="Football">Football</option>
                        <option value="Pickleball">Pickleball</option>
                    </select>

                    <select
                        className="p-2 md:p-3 border border-gray-300 rounded-md bg-black text-white shadow-sm cursor-pointer w-full md:w-[150px] flex-1"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="">SORT</option>
                        <option value="ASC">Ascending</option>
                        <option value="DESC">Descending</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default Team;
