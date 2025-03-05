

export default function MatchCard() {
  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border mb-10 border-gray-300">
      <div className="relative">
        <img
          src="/cover.jpg" // Thay thế bằng đường dẫn ảnh bìa phù hợp
          alt="Cover Image"
          className="w-full h-72 object-cover border-b border-gray-300"
        />
        <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 text-sm font-bold rounded">
          FOOTBALL
        </div>
      </div>
      <div className="p-6">
        <div className=" flex justify-between items-center">
          {/* Logo & Team 1 */} 
          <div className="ml-20 text-center">
            <img src="/manutd.png" alt="Man Utd" className=" absolute top-[300px] ml-3 border w-56 h-56 border-gray-300 rounded-full" />
            <h2 className="text-xl font-bold mt-20">MANCHESTER UNITED</h2>
            <ul className="text-sm text-gray-600">
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
            </ul>
          </div>
          {/* VS */}
          <div className="text-center">
          <img src="/images/VS.png" alt="Man Utd" className=" w-40 h-40 " />
            <p className="text-sm mt-2">December 12, 2025</p>
            <p className="text-lg font-bold">19:00</p>
            <p className="text-xl mt-2 text-gray-500">WinWin Field</p>
          </div>
          {/* Logo & Team 2 */}
          <div className=" mr-20 text-center">
            <img src="/mancity.png" alt="Man City" className ="absolute top-[300px] border w-56 h-56 right-60 border-gray-300 rounded-full" />
            <h2 className="text-xl font-bold mt-20">MANCHESTER CITY</h2>
            <ul className="text-sm text-gray-600">
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between gap-4 mt-10">
          <button className="border-2 border-black w-1/2 py-2 font-bold text-black">JOIN AS TEAM</button>
          <button className="bg-black text-white w-1/2 py-2 font-bold">JOIN AS SINGLE</button>
        </div>
      </div>
    </div>
  );
}
