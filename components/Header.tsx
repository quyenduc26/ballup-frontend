"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";

const Notification = dynamic(() => import("@/components/Notification"), {
  ssr: false,
});

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const updateAuthState = () => {
      const userData = localStorage.getItem("data");

      setIsLoggedIn(!!userData);
      setAvatar(localStorage.getItem("userAvatar"));
    };

    updateAuthState();

    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link className="text-3xl font-bold text-black" href="/">
          BALLUP
        </Link>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <AlignJustify className="w-8 h-8 text-black" />
        </button>

        {/* Navigation Links */}
        <nav
          className={`absolute top-16 left-0 w-full bg-white shadow-md md:static md:flex md:items-center md:space-x-20 md:shadow-none ${menuOpen ? "block" : "hidden"
            }`}
        >
          <Link
            className={`block sm:ml-40 px-6 py-1 hover:font-bold md:inline-block ${pathname === "/" ? "font-bold" : "text-black"
              }`}
            href="/"
            onClick={() => setMenuOpen(true)}
          >
            HOME
          </Link>
          <Link
            className={`block px-6 py-1 hover:font-bold md:inline-block ${pathname === "/booking" ? "font-bold" : "text-black"
              }`}
            href="/booking"
            onClick={() => setMenuOpen(false)}
          >
            BOOKING
          </Link>
          <Link
            className={`block px-6 py-1 hover:font-bold md:inline-block ${pathname === "/team" ? "font-bold" : "text-black"
              }`}
            href="/team"
            onClick={() => setMenuOpen(false)}
          >
            TEAM
          </Link>
          <Link
            className={`block px-6 py-1 hover:font-bold md:inline-block ${pathname === "/match" ? "font-bold" : "text-black"
              }`}
            href="/match"
            onClick={() => setMenuOpen(false)}
          >
            MATCH
          </Link>
          <Link
            className={`block px-6 py-1 hover:font-bold md:inline-block ${pathname === "/about" ? "font-bold" : "text-black"
              }`}
            href="/about"
            onClick={() => setMenuOpen(false)}
          >
            ABOUT US
          </Link>
        </nav>

        <div className="hidden md:flex gap-10">
          <Notification />
          {isLoggedIn ? (
            <Link
              className="flex items-center space-x-2"
              href={
                role === "admin"
                  ? "/admin"
                  : role === "owner"
                    ? "/owner"
                    : "/auth/profile"
              }
            >
              {avatar ? (
                <img
                  alt="User Avatar"
                  className="w-14 h-12 rounded-full object-cover mr-12"
                  src={avatar || "/images/userProfile.png"}
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
              )}
            </Link>
          ) : (
            <>
              <Link
                className="border-3 border-black px-4 py-2 text-black hover:bg-gray-100"
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className="bg-black border-3 border-black text-white px-4 py-2 hover:bg-gray-800"
                href="/auth/signUp"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
