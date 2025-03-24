import { Facebook, Instagram, Youtube } from "lucide-react";

import HeroSection from "@/components/Banner";
import ContactForm from "@/components/about/about";

export default function Home() {
  const teamMembers = [
    {
      src: "/images/quyen.jpg",
      name: "Mr. Quyen",
      role: "Back-end Developer",
    },
    {
      src: "/images/lananh.jpg",
      name: "Ms. Lan Anh",
      role: "Tester, Business Analyst",
    },
    {
      src: "/images/tan.jpg",
      name: "Mr. Tan",
      role: "Front-end Developer",
    },
    {
      src: "/images/bon.jpg",
      name: "Mr. Bon",
      role: "Front-end Developer",
    },
  ];

  return (
    <main className="">
      {/* ABOUT Section */}
      <section className="container mx-auto max-w-[1500px] p-4">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-black py-4 sm:py-6 text-center md:text-left ml-0 sm:ml-4 mt-12 sm:mt-20">
          ABOUT
        </h1>
        <div className="w-full">
          <HeroSection />
        </div>
      </section>

      {/* OUR IDEA Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 mt-8">
        <div className="flex flex-col mt-8 md:mt-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 mt-0 sm:mt-5">
            OUR IDEA
          </h2>
          <p className="text-gray-700 text-sm sm:text-base">
            BALLUP - SPORTS APP THAT CONNECTS PLAYERS
          </p>
          <p className="text-gray-700 mt-3 text-sm sm:text-base">
            Ballup is a platform that helps sports enthusiasts easily find and
            book courts, connect with other players, create open matches, and
            join teams.
          </p>
          <p className="text-gray-700 mt-3 text-sm sm:text-base">
            No matter what sport you play or your skill level, Ballup helps you
            find the right court, opponents, and teammates, making it easier to
            participate in sports activities.
          </p>
          <p className="text-gray-700 mt-3 text-sm sm:text-base">
            With an AI-powered smart search assistant, an online court booking
            system, and in-app messaging features, Ballup provides a seamless
            experience, allowing you to connect and enjoy your passion for
            sports anytime, anywhere.
          </p>
        </div>
        <div className="rounded-md overflow-hidden flex justify-center">
          <img
            alt="Person holding a sports device"
            className="w-full sm:w-[70%] h-auto object-cover mt-6 "
            src="/images/mockup1.png"
          />
        </div>
      </section>

      {/* OUR VALUES Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="rounded-md overflow-hidden order-2 md:order-1 flex justify-center">
          <img
            alt="Person with sports technology"
            className="w-full sm:w-[80%] h-auto mt-6 md:mt-10 object-cover"
            src="/images/ouridea.jpg"
          />
        </div>
        <div className="flex flex-col order-1 md:order-2">
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 mt-0 sm:mt-5">
            OUR VALUES
          </h3>
          <p className="text-gray-700 text-sm sm:text-base">
            At Ballup, we are committed to building a sports community that is
            connected, convenient, and inclusive. Our core values guide
            everything we do:
          </p>
          <p className="text-gray-700 mt-3 text-sm sm:text-base">
            Connectivity – We bring players together, making it easy to find
            teammates, opponents, and sports venues.
          </p>
          <p className="text-gray-700 mt-3 text-sm sm:text-base">
            Convenience – Our seamless booking system and AI-powered search help
            users quickly find and reserve courts, saving time and effort.
          </p>
          <p className="text-gray-700 mt-3 text-sm sm:text-base">
            Inclusivity – Whether you&apos;re a beginner or a pro, we provide a
            welcoming platform for everyone to enjoy sports.
          </p>
          <p className="text-gray-700 mt-3 text-sm sm:text-base">
            Innovation – By integrating AI and smart features, we continuously
            improve the user experience to enhance sports engagement. Ballup is
            more than just an app—it’s a community where sports lovers can
            connect, compete, and thrive together! 🏆
          </p>
        </div>
      </section>

      {/* MEET OUR TEAM Section */}
      <section className="max-w-8xl mx-auto px-4 py-8 mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-6">
          MEET OUR TEAM
        </h2>
        <p className="text-gray-700 text-center text-sm sm:text-base max-w-3xl mx-auto mb-8">
          Our team consists of passionate sports and technology enthusiasts. We
          are committed to creating a high-quality application to connect the
          sports community together.
        </p>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-20 md:gap-20">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="bg-sky-100 rounded-md overflow-hidden w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4">
                  <img
                    alt={`Team member ${member.name}`}
                    className="w-full h-full object-cover"
                    src={member.src || "/placeholder.svg"}
                  />
                </div>
                <h3 className="font-bold text-base sm:text-lg mb-1 text-center">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 text-center">
                  {member.role}
                </p>
                <div className="flex space-x-3">
                  <a
                    className="text-gray-700 hover:text-black"
                    href="https://youtube.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Youtube className="size-5" />
                  </a>
                  <a
                    className="text-gray-700 hover:text-black"
                    href="https://instagram.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Instagram className="size-5" />
                  </a>
                  <a
                    className="text-gray-700 hover:text-black"
                    href="https://facebook.com"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Facebook className="size-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactForm />
    </main>
  );
}
