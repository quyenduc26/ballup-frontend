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
      try {
        const userData = localStorage.getItem("data");
        const parsedData = userData ? JSON.parse(userData) : null;

        setIsLoggedIn(!!userData);
        setAvatar(localStorage.getItem("userAvatar") || null);
        setRole(parsedData?.role || null);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setRole(null);
      }
    };

    updateAuthState();

    window.addEventListener("storage", updateAuthState);

    return () => {
      window.removeEventListener("storage", updateAuthState);
    };
  }, []);

  console.log("User Role:", role); // Debug xem role có đúng không

  // Nếu role là "owner", không render header
  if (role === "OWNER") {
    return null;
  }

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link
        className={`block px-4 py-2 text-center hover:font-bold md:inline-block ${pathname === "/" ? "font-bold" : "text-black"
          }`}
        href="/"
        onClick={handleLinkClick}
      >
        HOME
      </Link>
      <Link
        className={`block px-4 py-2 text-center hover:font-bold md:inline-block ${pathname === "/booking" ? "font-bold" : "text-black"
          }`}
        href="/booking"
        onClick={handleLinkClick}
      >
        BOOKING
      </Link>
      <Link
        className={`block px-4 py-2 text-center hover:font-bold md:inline-block ${pathname === "/team" ? "font-bold" : "text-black"
          }`}
        href="/team"
        onClick={handleLinkClick}
      >
        TEAM
      </Link>
      <Link
        className={`block px-4 py-2 text-center hover:font-bold md:inline-block ${pathname === "/match" ? "font-bold" : "text-black"
          }`}
        href="/match"
        onClick={handleLinkClick}
      >
        MATCH
      </Link>
      <Link
        className={`block px-4 py-2 text-center hover:font-bold md:inline-block ${pathname === "/about" ? "font-bold" : "text-black"
          }`}
        href="/about"
        onClick={handleLinkClick}
      >
        ABOUT US
      </Link>
    </>
  );

  return (
    <header className="w-full border-b bg-white fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
        {/* Logo */}
        <Link className="text-2xl font-bold text-black sm:text-3xl" href="/">
          BALLUP
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
          {navLinks}
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
              {avatar ? (
                <img
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition-opacity"
                  src={avatar || "/images/userProfile.png"}
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
              )}
            </Link>
          ) : (
            <div className="flex gap-4">
              <Link
                className="border border-black px-3 py-1 text-black hover:bg-gray-100 text-sm"
                href="/auth/login"
              >
                Login
              </Link>
              <Link
                className="bg-black text-white px-3 py-1 hover:bg-gray-800 text-sm"
                href="/auth/signUp"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (Navigation + User Actions) */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col">
            {navLinks}
            {/* Notification as text in mobile */}
            <Link
              className={`block px-4 py-2 text-center hover:font-bold ${pathname === "/notifications" ? "font-bold" : "text-black"
                }`}
              href="/notifications"
              onClick={handleLinkClick}
            >
              NOTIFICATION
            </Link>
            {/* Profile as text in mobile when logged in */}
            {isLoggedIn && (
              <Link
                className={`block px-4 py-2 text-center hover:font-bold ${pathname ===
                  (role === "admin" ? "/admin" : "/profile")
                  ? "font-bold"
                  : "text-black"
                  }`}
                href={role === "admin" ? "/admin" : "/profile"}
                onClick={handleLinkClick}
              >
                PROFILE
              </Link>
            )}
          </nav>
          {/* Login/Signup buttons for mobile when not logged in */}
          {!isLoggedIn && (
            <div className="flex flex-col gap-2 w-full px-4 py-4 border-t">
              <Link
                className="border border-black px-4 py-2 text-black hover:bg-gray-100 text-center"
                href="/auth/login"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                className="bg-black text-white px-4 py-2 hover:bg-gray-800 text-center"
                href="/auth/signUp"
                onClick={handleLinkClick}
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
