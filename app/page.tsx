"use client";

import IntroPage from "@/components/intro/page";
import IntroBooking from "@/components/home/IntroBooking";
import IntroTeam from "@/components/home/IntroTeam";
import IntroMatch from "@/components/home/IntroMatch";
import Banner from "@/components/Banner";
import { useEffect, useState } from "react";
import userApi from "@/service/userApi";
import { HomepageItems } from "@/types";

export default function App() {
  const [items, setItems] = useState<HomepageItems>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userApi.geHomepageItems();
        setItems(res.data); 
      } catch (error) {
        console.error("Error fetching homepage items:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="container mx-auto max-w-[1500px] p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold text-black  md:py-6 text-center md:text-left ml-4 mt-20">
        HOME
      </h1>

      <Banner />
      <IntroPage />
      {items?.centers && <IntroBooking centers={items?.centers} />}
      {items?.teams && <IntroTeam teams={items?.teams} />}
      {items?.games && <IntroMatch matches={items?.games} />}
    </div>
  );
}
