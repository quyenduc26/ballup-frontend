import React, { useState } from "react";
import Field from "../owner/field";
import PaymentHistory from "../owner/paymentHistory";
import Bookingfield from "../owner/booking";
import PaymentRequest from "../owner/paymentRequest";
import { Menu, X } from "lucide-react";

export default function SibavSidebar() {
  const [activeTab, setActiveTab] = useState("Field");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-gray-200 rounded-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static 
          w-64 md:w-1/5 
          bg-gray-100 
          min-h-screen 
          pl-5 pt-16 md:pt-10
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          z-40
        `}
      >
        <ul className="space-y-4">
          <li
            className={`
              cursor-pointer 
              font-bold 
              uppercase 
              p-2 
              text-sm md:text-base
              transition-colors
              hover:bg-gray-200
              ${activeTab === "Field" 
                ? "text-black bg-gray-300" 
                : "text-gray-500"
              }
            `}
            onClick={() => handleTabClick("Field")}
          >
            Field
          </li>

          <li
            className={`
              cursor-pointer 
              font-bold 
              uppercase 
              p-2
              text-sm md:text-base
              transition-colors
              hover:bg-gray-200
              ${activeTab === "PaymentHistory" 
                ? "text-black bg-gray-300" 
                : "text-gray-500"
              }
            `}
            onClick={() => handleTabClick("PaymentHistory")}
          >
            Payment History
          </li>

          <li
            className={`
              cursor-pointer 
              font-bold 
              uppercase 
              p-2
              text-sm md:text-base
              transition-colors
              hover:bg-gray-200
              ${activeTab === "BookingField" 
                ? "text-black bg-gray-300" 
                : "text-gray-500"
              }
            `}
            onClick={() => handleTabClick("BookingField")}
          >
            Booking Request
          </li>

          <li
            className={`
              cursor-pointer 
              font-bold 
              uppercase 
              p-2
              text-sm md:text-base
              transition-colors
              hover:bg-gray-200
              ${activeTab === "PaymentRequest" 
                ? "text-black bg-gray-300" 
                : "text-gray-500"
              }
            `}
            onClick={() => handleTabClick("PaymentRequest")}
          >
            Payment Request 
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 md:w-4/5 pt-16 md:pt-6">
        {activeTab === "Field" && <Field />}
        {activeTab === "PaymentHistory" && <PaymentHistory />}
        {activeTab === "BookingField" && <Bookingfield />}
        {activeTab === "PaymentRequest" && < PaymentRequest/>}
      </div>
    </div>
  );
}