import Image from "next/image";

export default function MatchCard() {
  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
      <div className="relative">
        <Image
          src="/cover.jpg" // Thay thế bằng đường dẫn ảnh bìa phù hợp
          alt="Cover Image"
          width={800}
          height={300}
          className="w-full h-64 object-cover border-b border-gray-300"
        />
        <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 text-sm font-bold rounded">
          FOOTBALL
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          {/* Logo & Team 1 */}
          <div className="text-center">
            <Image src="/manutd.png" alt="Man Utd" width={80} height={80} className="border border-gray-300 rounded-full" />
            <h2 className="text-xl font-bold">MANCHESTER UNITED</h2>
            <ul className="text-sm text-gray-600">
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
            </ul>
          </div>
          {/* VS */}
          <div className="text-center">
            <h3 className="text-2xl font-bold">VS</h3>
            <p className="text-sm mt-2">December 12, 2025</p>
            <p className="text-lg font-bold">19:00</p>
            <p className="text-sm text-gray-500">WinWin Field</p>
          </div>
          {/* Logo & Team 2 */}
          <div className="text-center">
            <Image src="/mancity.png" alt="Man City" width={80} height={80} className="border border-gray-300 rounded-full" />
            <h2 className="text-xl font-bold">MANCHESTER CITY</h2>
            <ul className="text-sm text-gray-600">
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button className="border-2 border-black w-1/2 py-2 font-bold text-black">JOIN AS TEAM</button>
          <button className="bg-black text-white w-1/2 py-2 font-bold">JOIN AS SINGLE</button>
        </div>
      </div>
    </div>
  );
}
