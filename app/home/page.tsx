import IntroPage from "@/components/intro/IntroPage";
import IntroBooking from "@/components/home/IntroBooking";
import IntroTeam from "@/components/home/IntroTeam";
import IntroSchedule from "@/components/home/IntroSchedule";
import IntroMatch from "@/components/home/IntroMatch";
import Banner from "@/components/Banner";

export default function Homepage() {
  return (
    <div className="items-center justify-center px-4">
      {/* Tiêu đề Homepage */}
      <h1 className="text-3xl md:text-5xl ml-2 md:ml-5 mt-6 md:mt-10 font-bold">HOME</h1>

      {/* Các thành phần */}
      <Banner />
      <IntroPage />
      <IntroBooking />
      <IntroTeam />
      <IntroSchedule />
      <IntroMatch />
    </div>
  );
}
