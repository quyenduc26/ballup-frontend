import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export default function ScheduleSection() {
  return (
    <div className="relative w-full max-w-full mt-20 mx-auto flex flex-col md:flex-row items-center justify-between py-10 border border-gray-200 px-6">
      {/* Hình ảnh bên trái */}
      <div className="w-full md:w-[350px] h-[250px] md:h-[300px]">
        <Image
          src="/images/image 3.png"
          alt="Schedule Image"
          width={300}
          height={300}
          className="w-full object-cover"
        />
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 px-6 mt-6 md:mt-0 text-center md:text-left">
        <span className="text-4xl md:text-5xl font-bold text-black">CREATE</span>
        <h2 className="text-6xl md:text-9xl font-bold text-yellow-500">SCHEDULE</h2>
      </div>

      {/* Nút SEE MORE */}
      <button className="flex w-[150px] items-center gap-2 rounded-lg border mt-6 md:mt-0 mb-10 md:mb-60 border-gray-200 px-4 py-5 text-sm font-semibold">
        SEE MORE <FiExternalLink size={14} />
      </button>
    </div>
  );
}
