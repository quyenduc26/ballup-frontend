"use client";

import IntroPage from "@/components/intro/page";
import IntroBooking from "@/components/home/IntroBooking";
import IntroTeam from "@/components/home/IntroTeam";
import IntroMatch from "@/components/home/IntroMatch";
import Banner from "@/components/Banner";

export default function App() {
  return (
    <div className="items-center justify-center px-4">
      <div className="text-4xl md:text-6xl ml-8 font-extrabold text-black text-center md:text-left">
        HOME
      </div>

      <Banner />
      <IntroPage />
      <IntroBooking />
      <IntroTeam />
      <IntroMatch />
    </div>
  );
}
