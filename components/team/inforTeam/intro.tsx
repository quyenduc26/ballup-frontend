"use client";

import Image from "next/image";
import player from "@/public/images/player.png";
import Field from "@/public/images/field.png";
import Arsenal from "@/public/images/arsenal.png";
import { TeamHeaderProps } from "@/types/form";


const  TeamHeader: React.FC<TeamHeaderProps> = ({
    logo,
    name,
    intro,  
    address,
    sport
}) => {
    return (
        <div className="w-full border-t border-gray-200 bg-white">
            <div className="flex justify-center md:justify-start">
                <Image src={Field} alt="Team Logo" className="w-full h-64 object-cover" />
            </div>
            <div className="flex flex-col md:flex-row items-center p-4">
                {/* Logo Section */}
                <div className="pr-0 md:pr-4 flex justify-center md:block">
                    <Image src={Arsenal} alt="Team Logo" className="w-24 h-24 md:w-40 md:h-48 rounded-full" />
                </div>

                {/* Team Info Section */}
                <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                    <h1 className="text-xl md:text-2xl font-bold text-black">{name}</h1>
                    <p className="text-sm text-gray-600">Intro: {intro}</p>
                    <p className="text-sm text-gray-600">Address: {address}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 mt-4 md:mt-0">
                    <button className="bg-black text-white px-4 md:px-6 py-2 font-medium">CHAT</button>
                    <button className="border border-gray-300 bg-white text-black px-4 md:px-6 py-2 font-medium">LIKE</button>
                    <button className="border border-gray-300 bg-white text-black px-4 py-2 font-medium">...</button>
                </div>
            </div>
        </div>
    );
};

export default TeamHeader;
