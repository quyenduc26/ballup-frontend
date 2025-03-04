"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();


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

        {/* Navigation Links */}
        <nav
          className={`absolute top-16 left-0 w-full bg-white shadow-md md:static md:flex md:items-center md:space-x-20 md:shadow-none ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <Link
            href="/"
            className={`block sm:ml-16 px-6 py-1  hover:font-bold md:inline-block ${
              pathname === "/" ? "font-bold" : "text-black"
            }`}
            onClick={() => setMenuOpen(true)}
          >
            HOME
          </Link>
          <Link
            href="/booking"
            className={`block px-6 py-1 hover:font-boldmd:inline-block ${
              pathname === "/booking" ? "font-bold" : "text-black"
            }`}
            onClick={() => setMenuOpen(false)}

          >
            BOOKING
          </Link>
          <Link
            href="/team"
            className={`block px-6 py-1 hover:font-boldmd:inline-block ${
              pathname === "/team" ? "font-bold" : "text-black"
            }`}
            onClick={() => setMenuOpen(false)}

          >
            TEAM
          </Link>
          <Link
            href="/match"
            className={`block px-6 py-1 hover:font-bold md:inline-block ${
              pathname === "/match" ? "font-bold" : "text-black"
            }`}
            onClick={() => setMenuOpen(false)}

          >
            MATCH
          </Link>
          <Link
            href="/about"
            className={`block px-6 py-1 hover:font-bold md:inline-block ${
              pathname === "/about" ? "font-bold" : "text-black"
            }`}
            onClick={() => setMenuOpen(false)}

          >
            ABOUT US
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            href="/auth/login"
            className="border w-[70px] rounded-full px-4 py-2 text-black hover:bg-gray-100"

          >
            Login 
          </Link>
          <Link
            href="/auth/signUp"
            className="bg-black border rounded-full text-white px-4 py-2 hover:bg-gray-800 w-[90px]"

          >
            Signup
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;