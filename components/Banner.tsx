import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-6">
      {/* Tiêu đề HOME */}
      {/* <h1 className="text-5xl font-extrabold relative inline-block">
        HOME
        <span className="absolute left-0 bottom-0 w-full h-1 bg-blue-500"></span>
      </h1> */}

      {/* Banner */}
      <div className="relative w-full rounded-xl overflow-hidden">
        <Image
          src="/images/Banner.png"
          alt="Innovibe Squads"
          width={1200}
          height={200}
          className="w-full h-[200px] sm:h-[300px] md:h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4 sm:p-6">
          <h2 className="text-white text-lg sm:text-2xl font-extrabold">INNOVIBE SQUADS</h2>
          <p className="text-white text-xs sm:text-sm mt-2 max-w-md">
            Để làm cho nút này đẹp hơn và phù hợp với phong cách của Next.js, bạn có thể sử dụng các lớp Tailwind CSS kết hợp với...
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
