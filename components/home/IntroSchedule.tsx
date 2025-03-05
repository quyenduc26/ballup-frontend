import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export default function ScheduleSection() {
  return (
    <div className="relative w-full max-w-full mt-20 mx-auto flex flex-col md:flex-row items-center justify-between py-10 px-6">
      {/* Hình ảnh bên trái */}
      <div className="w-full md:w-[350px] h-[250px] md:h-[300px]">
        <Image
          alt="Schedule Image"
          className="w-full object-cover"
          height={300}
          src="/images/image 3.png"
          width={300}
        />
      </div>

      {/* Nội dung chính */}
      <div className="flex-1 px-6 mt-32 text-center md:text-left">
        <span className="text-4xl md:text-5xl font-bold text-black">
          CREATE
        </span>
        <h2 className="text-6xl md:text-9xl font-bold text-yellow-500">
          SCHEDULE
        </h2>
        <hr className="w-full border-t border-gray-500 my-6" />
      </div>

      {/* Nút SEE MORE */}
      <button className="flex w-[160px] items-center gap-2 mt-6 md:mt-0 mb-10 md:mb-60  text-black border border-gray-300 px-6 py-4 rounded-lg hover:bg-gray-100">
        SEE MORE <FiExternalLink size={14} />
      </button>
    </div>
  );
}
