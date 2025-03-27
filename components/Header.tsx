"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify, X } from "lucide-react";

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

      if (!userData) {
        setIsLoggedIn(false);
        setAvatar(null);
        setRole(null);
        return;
      }

      try {
        const parsedData = JSON.parse(userData);

        setIsLoggedIn(true);
        setAvatar(parsedData?.avatar || null);
        setRole(parsedData?.role || null);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setIsLoggedIn(false);
        setAvatar(null);
        setRole(null);
      }
    };

    updateAuthState();

    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

  if (role === "OWNER") {
    return null;
  }

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Điều kiện để avatar hiển thị ảnh mặc định nếu null
  const avatarSrc = avatar || "/images/userProfile.png";

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-2 sm:px-4">
        {/* Logo */}
        <Link className="ml-10" href="/">
          <img
            alt="BALLUP Logo"
            className="object-contain"
            height={30}
            src="/images/logo_ballUp.jpg"
            width={90}
          />
        </Link>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle Menu"
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-7 h-7 text-black" />
          ) : (
            <AlignJustify className="w-7 h-7 text-black" />
          )}
        </button>

        {/* Navigation Links (Desktop Only) */}
        <nav className="hidden md:flex md:items-center md:space-x-8">
          <Link
            className={`block px-10 py-2 text-center hover:font-bold md:inline-block ${
              pathname === "/" ? "font-bold" : "text-black"
            }`}
            href="/"
            onClick={handleLinkClick}
          >
            HOME
          </Link>
          <Link
            className={`block px-10 py-2 text-center hover:font-bold md:inline-block ${
              pathname === "/booking" ? "font-bold" : "text-black"
            }`}
            href="/booking"
            onClick={handleLinkClick}
          >
            BOOKING
          </Link>
          <Link
            className={`block px-10 py-2 text-center hover:font-bold md:inline-block ${
              pathname === "/team" ? "font-bold" : "text-black"
            }`}
            href="/team"
            onClick={handleLinkClick}
          >
            TEAM
          </Link>
          <Link
            className={`block px-10 py-2 text-center hover:font-bold md:inline-block ${
              pathname === "/match" ? "font-bold" : "text-black"
            }`}
            href="/match"
            onClick={handleLinkClick}
          >
            MATCH
          </Link>
          <Link
            className={`block px-10 py-2 text-center hover:font-bold md:inline-block ${
              pathname === "/about" ? "font-bold" : "text-black"
            }`}
            href="/about"
            onClick={handleLinkClick}
          >
            ABOUT US
          </Link>
        </nav>

        {/* User Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <Notification />
          {isLoggedIn ? (
            <Link
              className="flex items-center"
              href={
                role === "admin"
                  ? "/admin"
                  : role === "owner"
                    ? "/owner"
                    : "/auth/profile"
              }
            >
              <img
                alt="User Avatar"
                className="w-14 h-14 rounded-full object-cover mr-12"
                src={avatarSrc}
              />
            </Link>
          ) : (
            <div className="flex gap-4">
              <Link
                className="border border-black px-6 py-3 text-black hover:bg-gray-100 text-lg"
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className="bg-black text-white px-6 py-3 hover:bg-gray-800 text-lg"
                href="/auth/signUp"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
