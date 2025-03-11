"use client";

import IntroPage from "@/components/intro/page";
import IntroBooking from "@/components/home/IntroBooking";
import IntroTeam from "@/components/home/IntroTeam";
import IntroMatch from "@/components/home/IntroMatch";
import Banner from "@/components/Banner";

export default function App() {
  return (
    <div className="container mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black  md:py-6 text-center md:text-left ml-4 mt-20">
        HOME
      </h1>

      <Banner />
      <IntroPage />
      <IntroBooking />
      <IntroTeam />
      <IntroMatch />
    </div>
  );
}
