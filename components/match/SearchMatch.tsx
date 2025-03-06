"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
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
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between bg-white py-6 px-4 gap-4 ml-4">
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
  );
};

export default SearchBar;
