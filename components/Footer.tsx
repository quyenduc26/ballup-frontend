"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("data");
      const parsedData = data ? JSON.parse(data) : null;

      setRole(parsedData?.role || null);
    }
  }, []);

  if (role === "OWNER") {
    return null;
  }

  return (
    <footer className="w-full bg-gray-100 text-black py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Grid chia 4 cột trên mọi thiết bị */}
        <div className="grid grid-cols-4 gap-4 text-start">
          {/* Main navigation column */}
          <div className="space-y-1">
            <Link className="block text-xs md:text-base lg:text-2xl" href="/">
              Home
            </Link>
            <Link
              className="block text-xs md:text-base lg:text-2xl"
              href="/team"
            >
              Team
            </Link>
            <Link
              className="block text-xs md:text-base lg:text-2xl"
              href="/booking"
            >
              Booking
            </Link>
            <Link
              className="block text-xs md:text-base lg:text-2xl"
              href="/about"
            >
              About us
            </Link>
          </div>

          {/* Product column */}
          <div className="space-y-1">
            <Link
              className="block text-xs md:text-base lg:text-lg font-medium mb-1 hover:text-gray-400"
              href="/package"
            >
              Product
            </Link>
            <Link
              className="block text-xs md:text-base lg:text-lg hover:text-gray-400"
              href="/package"
            >
              Package
            </Link>
            <Link
              className="block text-xs md:text-base lg:text-lg hover:text-gray-400"
              href="/pricing"
            >
              Pricing
            </Link>
          </div>

          {/* Engage column */}
          <div className="space-y-1">
            <Link
              className="block text-xs md:text-base lg:text-lg hover:text-gray-400"
              href="/policy"
            >
              Engage
            </Link>
            <Link
              className="block text-xs md:text-base lg:text-lg hover:text-gray-400"
              href="/policy"
            >
              Policy
            </Link>
            <Link
              className="block text-xs md:text-base lg:text-lg hover:text-gray-400"
              href="/tutorials"
            >
              Tutorials
            </Link>
          </div>

          {/* Earn Money column */}
          <div className="space-y-1">
            <Link
              className="block text-xs md:text-base lg:text-lg hover:text-gray-400"
              href="/partner"
            >
              Earn Money
            </Link>
            <Link
              className="block text-xs md:text-base lg:text-lg hover:text-gray-400"
              href="/partner"
            >
              Become Partner
            </Link>
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-6 mt-6">
          <Link
            aria-label="YouTube"
            className="text-red-600"
            href="https://youtube.com"
          >
            <FaYoutube className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
          </Link>
          <Link
            aria-label="Instagram"
            className="text-pink-500"
            href="https://instagram.com"
          >
            <FaInstagram className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
          </Link>
          <Link
            aria-label="Facebook"
            className="text-blue-600"
            href="https://facebook.com"
          >
            <FaFacebook className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
