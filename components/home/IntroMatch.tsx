import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";

export default function MatchSection() {
  return (
    <div className="relative w-full max-w-full mx-auto flex flex-col md:flex-row items-center justify-between py-10 mt-20 border border-gray-200 rounded-lg p-6 shadow-lg">
      {/* Vùng chữ bên trái */}
      <div className="relative flex flex-col items-center md:items-start p-2 rounded-lg">
        <button className="flex items-center gap-2 mt-10 md:mt-56 border w-[150px] px-4 py-5 text-sm rounded-lg font-semibold">
          SEE MORE <FiExternalLink size={14} />
        </button>
      </div>

      {/* Nội dung chính */}
      <div className="p-4 rounded-lg text-center">
        <span className="text-4xl md:text-5xl font-bold">CREATE</span>
        <h2 className="text-6xl md:text-9xl font-bold text-yellow-500">MATCH</h2>
      </div>

      {/* Hình ảnh bên phải */}
      <div className="w-full md:w-[350px] p-2 rounded-lg">
        <Image
          src="/images/image 3.png"
          alt="Innovibe Squads"
          width={1200}
          height={200}
          className="w-full h-[250px] md:h-[300px] object-cover"
        />
      </div>
    </div>
  );
}
