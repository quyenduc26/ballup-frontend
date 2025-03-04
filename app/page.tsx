"use client";
import { useRouter } from "next/navigation";
import IntroPage from "@/components/intro/page";
import IntroBooking from "@/components/home/IntroBooking";
import IntroTeam from "@/components/home/IntroTeam";
import IntroSchedule from "@/components/home/IntroSchedule";
import IntroMatch from "@/components/home/IntroMatch";
import Banner from "@/components/Banner";



export default function App() {
  const router = useRouter();
  console.log(process.env.SECRET_KEY);

  return (
    <div className="items-center justify-center px-4">
      <div className="text-4xl md:text-6xl ml-8 font-extrabold text-black text-center md:text-left">
        HOME
      </div>

      <Banner />
      <IntroPage />
      <IntroBooking />
      <IntroTeam />
      {/* <IntroSchedule /> */}
      <IntroMatch />
    </div>
  );
}
