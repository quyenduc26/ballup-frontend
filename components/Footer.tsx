import Link from "next/link";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-10 w-full mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-6">
        {/* Cột 1: Menu chính */}
        <div className="mb-6 md:mb-0">
          <ul className="space-y-2 text-black text-2xl font-bold ">
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/booking">Booking</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/about">About us</Link>
            </li>
          </ul>
        </div>

        {/* Cột 2: Product */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-black hover:text-[#FF8811]">Product</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-[#FF8811]">
              <Link href="/package">Package</Link>
            </li>
            <li className="hover:text-[#FF8811]">
              <Link href="/pricing">Pricing</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Engage */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-black hover:text-[#FF8811]">Engage</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-[#FF8811]">
              <Link href="/policy">Policy</Link>
            </li>
            <li className="hover:text-[#FF8811]">
              <Link href="/tutorials">Tutorials</Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Earn Money */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold text-black hover:text-[#FF8811]">Earn Money</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-[#FF8811]">
              <Link href="/partner">Become Partner</Link>
            </li>
          </ul>
        </div>

        {/* Cột 5: Social Media */}
        <div className="flex space-x-4 text-black text-2xl">
          <Link href="https://youtube.com" target="_blank">
            <FaYoutube />
          </Link>
          <Link href="https://instagram.com" target="_blank">
            <FaInstagram />
          </Link>
          <Link href="https://facebook.com" target="_blank">
            <FaFacebook />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
