"use client";

import { useState } from "react";
import Link from "next/link";
import { AlignJustify } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="text-3xl font-bold text-black">
          BALLUP
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <AlignJustify className="w-8 h-8 text-black" />
        </button>

        {/* Navigation Links - Hidden on mobile, shown on desktop */}
        <nav
          className={`absolute top-16 left-0 w-full bg-white shadow-md md:static md:flex md:items-center md:space-x-20 md:shadow-none ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            href="/"
            className="block sm:ml-16 px-6 py-1 text-black font-bold hover:text-[#FF8811] md:inline-block"
          >
            HOME
          </Link>
          <Link
            href="/booking"
            className="block px-6 py-1 text-gray-600  hover:text-[#FF8811] md:inline-block"
          >
            BOOKING
          </Link>
          <Link
            href="/team"
            className="block px-6 py-1 text-gray-600 hover:text-[#FF8811] md:inline-block"
          >
            TEAM
          </Link>
          <Link
            href="/schedule"
            className="block px-6 py-1 text-gray-600 hover:text-[#FF8811] md:inline-block"
          >
            SCHEDULE
          </Link>
          <Link
            href="/about"
            className="block px-6 py-1 text-gray-600 hover:text-[#FF8811] md:inline-block"
          >
            ABOUT US
          </Link>
        </nav>

        {/* Auth Buttons - Hidden on mobile, shown on desktop */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/signin"
            className="border w-[100px] border-black px-4 py-2 text-black hover:bg-gray-100"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="bg-black text-white px-4 py-2 hover:bg-gray-800"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
