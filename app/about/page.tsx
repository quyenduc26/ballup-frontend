import { Facebook, Instagram, Youtube } from "lucide-react";

import HeroSection from "@/components/Banner";
import ContactForm from "@/components/about/about";

export default function Home() {
  return (
    <main className="">
      <section className="container mx-auto max-w-[1500px] p-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black md:py-6 text-center md:text-left ml-4 mt-20">
          ABOUT
        </h1>
        <div className="w-full">
          <HeroSection />
        </div>
      </section>

      {/* OUR IDEA Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mt-10">
        <div className="flex flex-col mt-20">
          <h2 className="text-4xl md:text-5xl font-black mb-4 mt-5">OUR IDEA</h2>
          <p className="text-gray-700">
            BALLUP - SPORTS APP THAT CONNECTS PLAYERS
          </p>
          <p className="text-gray-700 mt-4">
            Ballup is a platform that helps sports enthusiasts easily
            find and book courts, connect with other players, create open matches, and join teams.
          </p>
          <p className="text-gray-700 mt-4">
            No matter what sport you play or your skill level, Ballup helps you find the right court,
            opponents, and teammates, making it easier to participate in sports activities.
          </p>
          <p className="text-gray-700 mt-4">
            With an AI-powered smart search assistant, an online court booking system, and in-app messaging
            features, Ballup provides a seamless experience, allowing you to connect and enjoy your passion for sports anytime, anywhere.
          </p>
        </div>
        <div className=" rounded-md overflow-hidden">
          <img
            alt="Person holding a sports device"
            className="w-[70%] h-auto object-cover ml-20"
            src="/images/mockup1.png" // Updated to a unique name
          />
        </div>
      </section>

      {/* OUR VALUES Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-20 mb-16">
        <div className=" rounded-md overflow-hidden order-2 md:order-1">
          <img
            alt="Person with sports technology"
            className="w-[80%] h-full mt-10 object-cover"
            src="/images/ouridea.jpg" 
          />
        </div>
        <div className="flex flex-col order-1 md:order-2">
          <h3 className="text-4xl md:text-5xl font-black mb-4 mt-5">OUR VALUES</h3>
          <p className="text-gray-700">
            At Ballup, we are committed to building a sports community that is connected, convenient, and inclusive. Our core values guide everything we do:
          </p>
          <p className="text-gray-700 mt-4">
            Connectivity – We bring players together, making it easy to find teammates, opponents, and sports venues.
          </p>
          <p className="text-gray-700 mt-4">
            Convenience – Our seamless booking system and AI-powered search help users quickly find and reserve courts, saving time and effort.
          </p>
          <p className="text-gray-700 mt-4">
            Inclusivity – Whether you're a beginner or a pro, we provide a welcoming platform for everyone to enjoy sports.
          </p>
          <p className="text-gray-700 mt-4">
            Innovation – By integrating AI and smart features, we continuously improve the user experience to enhance sports engagement.
            Ballup is more than just an app—it’s a community where sports lovers can connect, compete, and thrive together! 🏆
          </p>
        </div>
      </section>

      {/* MEET OUR TEAM Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-8">
          MEET OUR TEAM
        </h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Our team consists of passionate sports and technology enthusiasts. We
          are committed to creating a high-quality application to connect the
          sports community together.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:ml-20 ml-2 items-center justify-center">
          {[
            { src: "/images/quyen.jpg", name: "Mr. Quyen", role: "Developer" },
            { src: "/images/lananh.jpg", name: "Ms. Lan Anh", role: "Tester" },
            { src: "/images/tan.jpg", name: "Mr. Tan", role: "Developer" },
            { src: "/images/bon.jpg", name: "Mr. Bon", role: "Developer" },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center w-40">
              <div className="bg-sky-100 rounded-md overflow-hidden w-48 h-48 mb-4">
                <img
                  alt={`Team member ${member.name}`}
                  className="w-full h-full object-cover"
                  src={member.src}
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{member.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{member.role}</p>
              <div className="flex space-x-3">
                <a
                  className="text-gray-700 hover:text-black"
                  href="youtube.com"
                >
                  <Youtube size={20} />
                </a>
                <a
                  className="text-gray-700 hover:text-black"
                  href="instagram.com"
                >
                  <Instagram size={20} />
                </a>
                <a
                  className="text-gray-700 hover:text-black"
                  href="facebook.com"
                >
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactForm />
    </main>
  );
}