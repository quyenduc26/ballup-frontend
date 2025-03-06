import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";
import Banner from "@/components/Banner";
import HeroSection from "@/components/Banner";
import ContactForm from "@/components/about/about";

export default function Home() {
  return (
    <main className="">
      <section className="w-full">
        <div className="text-4xl mt-10 md:text-6xl ml-8 font-extrabold text-center md:text-left mb-5 ">
          ABOUT
        </div>
        <div className="w-full">
          <HeroSection />
        </div>
      </section>
      {/* OUR IDEA Section */}
      <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 mt-10">
        <div className="flex flex-col">
          <h3 className="text-lg font-medium mb-2 mt-4">OUR IDEA</h3>
          <h2 className="text-4xl md:text-5xl font-black mb-4">SPORT APPLICATION</h2>
          <p className="text-gray-700">
            Đây là một ứng dụng thể thao giúp bạn kết nối với những người chơi thể thao khác và tìm kiếm các hoạt động
            thể thao trong khu vực của bạn.
          </p>
          <p className="text-gray-700 mt-4">
            Bất kể bạn chơi thể thao nào hoặc ở mức độ nào, ứng dụng của chúng tôi sẽ giúp bạn tìm đồng đội và tham gia
            các hoạt động thể thao mới.
          </p>
          <p className="text-gray-700 mt-4">
            Bất kể bạn chơi thể thao nào hoặc ở mức độ nào, ứng dụng của chúng tôi sẽ giúp bạn tìm đồng đội và tham gia
            các hoạt động thể thao mới.
          </p>
          <p className="text-gray-700 mt-4">
            Bất kể bạn chơi thể thao nào hoặc ở mức độ nào, ứng dụng của chúng tôi sẽ giúp bạn tìm đồng đội và tham gia
            các hoạt động thể thao mới.
          </p>
        </div>
        <div className="bg-sky-100 rounded-md overflow-hidden">
          <img
            src="/images/image 3.png"
            alt="Person holding a sports device"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* OUR VALUES Section */}
      <section className=" max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-sky-100 rounded-md overflow-hidden order-2 md:order-1">
          <img
            src="/images/image 3.png"
            alt="Person with sports technology"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col order-1 md:order-2">
          <h3 className="text-lg font-medium mb-1">OUR VALUES</h3>
          <h2 className="text-4xl md:text-5xl font-black mb-4 mt-5">CONNECT TIME SUIT</h2>
          <p className="text-gray-700">
            Chúng tôi tin rằng thể thao có thể kết nối mọi người và tạo ra những cộng đồng mạnh mẽ. Ứng dụng của chúng
            tôi không chỉ giúp bạn tìm đối tác chơi thể thao mà còn xây dựng tình bạn và mối quan hệ mới.
          </p>
          <p className="text-gray-700 mt-4">
            Bất kể bạn chơi thể thao nào hoặc ở mức độ nào, ứng dụng của chúng tôi sẽ giúp bạn tìm đồng đội và tham gia
            các hoạt động thể thao mới.
          </p>
          <p className="text-gray-700 mt-4">
            Bất kể bạn chơi thể thao nào hoặc ở mức độ nào, ứng dụng của chúng tôi sẽ giúp bạn tìm đồng đội và tham gia
            các hoạt động thể thao mới.
          </p>
        </div>
      </section>

       {/* MEET OUR TEAM Section */}
       <section className=" max-w-7xl mx-auto px-4 py-8 mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-center mb-8">MEET OUR TEAM</h2>
        <p className="text-gray-700 text-center max-w-3xl mx-auto mb-12">
          Đội ngũ chúng tôi bao gồm những người đam mê thể thao và công nghệ. Chúng tôi cam kết tạo ra một ứng dụng chất
          lượng cao để kết nối cộng đồng thể thao với nhau.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:ml-20 ml-2 items-center justify-center">
          {["/images/soccer.png", "/images/soccer.png", "/images/soccer.png", "/images/soccer.png"].map((image, index) => (
            <div key={index} className="flex flex-col items-center w-40">
              <div className="bg-sky-100 rounded-md overflow-hidden w-48 h-48 mb-4">
                <img
                  src={image}
                  alt={`Team member ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">MR. G</h3>
              <p className="text-gray-600 text-sm mb-3">Sport Director</p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-700 hover:text-black">
                  <Youtube size={20} />
                </a>
                <a href="#" className="text-gray-700 hover:text-black">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-700 hover:text-black">
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ContactForm/>
    </main>
  );
}
