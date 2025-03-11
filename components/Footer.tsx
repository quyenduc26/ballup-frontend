import Link from "next/link";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-black py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Grid chia 4 cột trên mọi thiết bị */}
        <div className="grid grid-cols-4 gap-4 text-center">
          {/* Main navigation column */}
          <div className="space-y-1">
            <Link href="/" className="block text-xs md:text-base lg:text-2xl">
              Home
            </Link>
            <Link href="/team" className="block text-xs md:text-base lg:text-2xl">
              Team
            </Link>
            <Link href="/booking" className="block text-xs md:text-base lg:text-2xl">
              Booking
            </Link>
            <Link href="/about" className="block text-xs md:text-base lg:text-2xl">
              About us
            </Link>
          </div>

          {/* Product column */}
          <div className="space-y-1">
            <Link href="/package" className="block text-xs md:text-base lg:text-lg font-medium mb-1 ">
              Product
            </Link>
            <Link href="/package" className="block text-xs md:text-base lg:text-lg ">
              Package
            </Link>
            <Link href="/pricing" className="block text-xs md:text-base lg:text-lg ">
              Pricing
            </Link>
          </div>

          {/* Engage column */}
          <div className="space-y-1">
            <Link href="/policy" className="block text-xs md:text-base lg:text-lg ">
              Engage
            </Link>
            <Link href="/policy" className="block text-xs md:text-base lg:text-lg ">
              Policy
            </Link>
            <Link href="/tutorials" className="block text-xs md:text-base lg:text-lg ">
              Tutorials
            </Link>
          </div>

          {/* Earn Money column */}
          <div className="space-y-1">
            <Link href="/partner" className="block text-xs md:text-base lg:text-lg ">
              Earn Money
            </Link>
            <Link href="/partner" className="block text-xs md:text-base lg:text-lg ">
              Become Partner
            </Link>
          </div>
        </div>

        {/* Social media icons */}
        <div className="flex justify-center space-x-6 mt-6">
          <Link href="https://youtube.com" className="text-red-600" aria-label="YouTube">
            <FaYoutube className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
          </Link>
          <Link href="https://instagram.com" className="text-pink-500" aria-label="Instagram">
            <FaInstagram className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
          </Link>
          <Link href="https://facebook.com" className="text-blue-600" aria-label="Facebook">
            <FaFacebook className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
