export default function MatchCard() {
  return (
    <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10 border mb-10 border-gray-300">
      <div className="relative">
        <img
          alt="Cover"
          className="w-full h-48 sm:h-72 object-cover border-b border-gray-300"
          src="/cover.jpg"
        />
        <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 text-sm font-bold rounded">
          FOOTBALL
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center relative">
          {/* Logo & Team 1 */}
          <div className="text-center w-full sm:w-auto sm:ml-20 mb-6 sm:mb-0">
            <div className="flex justify-center mb-4">
              <img
                alt="Man Utd"
                className="w-40 h-40 sm:w-56 sm:h-56 md:w-56 md:h-56 border border-gray-300 rounded-full object-cover relative md:absolute md:bottom-52"
                src="/manutd.png"
              />
            </div>
            <h2 className="text-xl font-bold mt-4 sm:mt-20">
              MANCHESTER UNITED
            </h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
            </ul>
          </div>

          {/* VS */}
          <div className="text-center w-full sm:w-auto mb-6 sm:mb-0">
            <div className="flex justify-center">
              <img
                alt="VS"
                className="w-32 h-32 sm:w-40 sm:h-40"
                src="/images/VS.png"
              />
            </div>
            <p className="text-sm mt-2">December 12, 2025</p>
            <p className="text-lg font-bold">19:00</p>
            <p className="text-xl mt-2 text-gray-500">WinWin Field</p>
          </div>

          {/* Logo & Team 2 */}
          <div className="text-center w-full sm:w-auto sm:mr-20">
            <div className="flex justify-center mb-4">
              <img
                alt="Man City"
                className="w-40 h-40 sm:w-56 sm:h-56 md:w-56 md:h-56 border border-gray-300 rounded-full object-cover relative md:absolute md:bottom-52"
                src="/mancity.png"
              />
            </div>
            <h2 className="text-xl font-bold mt-4 sm:mt-20">MANCHESTER CITY</h2>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
              <li>👤 Nguyen Xuan Son</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-10">
          <button className="border-2 border-black w-full sm:w-1/2 py-2 font-bold text-black mb-2 sm:mb-0">
            JOIN AS TEAM
          </button>
          <button className="bg-black text-white w-full sm:w-1/2 py-2 font-bold">
            JOIN AS SINGLE
          </button>
        </div>
      </div>
    </div>
  );
}
