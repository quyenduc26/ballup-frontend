import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-10">
      <div className="mt-6 relative max-w-full rounded-xl overflow-hidden">
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
