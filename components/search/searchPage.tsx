"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [address, setAddress] = useState("");
  const [sport, setSport] = useState("");
  const [sort, setSort] = useState("");

  const router = useRouter();

  const handleSearch = () => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchTerm) {
      searchParams.set("name", searchTerm);
    } else {
      searchParams.delete("name");
    }

    if (address) searchParams.set("address", address);
    else searchParams.delete("address");

    if (sport) searchParams.set("sport", sport);
    else searchParams.delete("sport");

    if (sort) searchParams.set("sort", sort);
    else searchParams.delete("sort");

    router.push(`?${searchParams.toString()}`, { scroll: false });
  };

  return (
    <div className="flex w-[1520px] self-center flex-col md:flex-row items-center justify-center md:justify-between bg-white py-6 px-4 gap-4">
      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-full md:w-1/3">
        <input
          className="w-full p-3 text-black outline-none"
          placeholder="Enter keyword..."
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="p-3 bg-black text-white hover:bg-gray-800 transition-all"
          onClick={handleSearch}
        >
          <Search />
        </button>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-end gap-2">
        <div className="relative w-full md:w-[150px] flex-1">
          <select
            className="p-2 md:p-3 border border-gray-300 rounded-md bg-black text-white shadow-sm cursor-pointer w-full appearance-none pr-8"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          >
            <option value="">PLACE</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP.HCM">TP.HCM</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Hải Phòng">Hải Phòng</option>
            <option value="Nha Trang">Nha Trang</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
        </div>

        <div className="relative w-full md:w-[150px] flex-1">
          <select
            className="p-2 md:p-3 border border-gray-300 rounded-md bg-black text-white shadow-sm cursor-pointer w-full appearance-none pr-8"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          >
            <option value="">SPORT</option>
            <option value="Badminton">Badminton</option>
            <option value="Football">Football</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
