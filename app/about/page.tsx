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
        <div className="flex flex-col">
          <h3 className="text-lg font-medium mb-2 mt-4">OUR IDEA</h3>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            SPORT APPLICATION
          </h2>
          <p className="text-gray-700">
            This is a sports application that helps you connect with other sports players and find sports activities in your area.
          </p>
          <p className="text-gray-700 mt-4">
            No matter what sport you play or at what level, our application will help you find teammates and join new sports activities.
          </p>
          <p className="text-gray-700 mt-4">
            No matter what sport you play or at what level, our application will help you find teammates and join new sports activities.
          </p>
          <p className="text-gray-700 mt-4">
            No matter what sport you play or at what level, our application will help you find teammates and join new sports activities.
          </p>
        </div>
        <div className="bg-sky-100 rounded-md overflow-hidden">
          <img
            alt="Person holding a sports device"
            className="w-full h-full object-cover"
            src="/images/image 3.png"
          />
        </div>
      </section>

      {/* OUR VALUES Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-sky-100 rounded-md overflow-hidden order-2 md:order-1">
          <img
            alt="Person with sports technology"
            className="w-full h-full object-cover"
            src="/images/image 3.png"
          />
        </div>
        <div className="flex flex-col order-1 md:order-2">
          <h3 className="text-lg font-medium mb-1">OUR VALUES</h3>
          <h2 className="text-4xl md:text-5xl font-black mb-4 mt-5">
            CONNECT TIME SUIT
          </h2>
          <p className="text-gray-700">
            We believe that sports can connect people and create strong communities. Our application not only helps you find sports partners but also builds friendships and new relationships.
          </p>
          <p className="text-gray-700 mt-4">
            No matter what sport you play or at what level, our application will help you find teammates and join new sports activities.
          </p>
          <p className="text-gray-700 mt-4">
            No matter what sport you play or at what level, our application will help you find teammates and join new sports activities.
          </p>
        </div>
      </section>

      {/* MEET OUR TEAM Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-8">
          MEET OUR TEAM
        </h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Our team consists of passionate sports and technology enthusiasts. We are committed to creating a high-quality application to connect the sports community together.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:ml-20 ml-2 items-center justify-center">
          {[
            "/images/soccer.png",
            "/images/soccer.png",
            "/images/soccer.png",
            "/images/soccer.png",
          ].map((image, index) => (
            <div key={index} className="flex flex-col items-center w-40">
              <div className="bg-sky-100 rounded-md overflow-hidden w-48 h-48 mb-4">
                <img
                  alt={`Team member ${index + 1}`}
                  className="w-full h-full object-cover"
                  src={image}
                />
              </div>
              <h3 className="font-bold text-lg mb-1">MR. G</h3>
              <p className="text-gray-600 text-sm mb-3">Sport Director</p>
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
