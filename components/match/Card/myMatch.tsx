"use client"

export default function CardMyMatch() {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden  transition transform hover:scale-105 border border-gray-200 max-w-2xl mx-auto mt-10 mb-10">
      {/* Keep the original cover image section as requested */}
      <div className="relative">
        <img
          alt="Cover"
          className="w-full h-20 sm:h-32 object-cover border-b border-gray-300"
          src="/placeholder.svg?height=300&width=600"
        />
        <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 text-sm font-bold rounded">FOOTBALL</div>
      </div>

      {/* Teams Section */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          {/* Team 1 */}
          <div className="text-center w-1/3">
            <div className="flex justify-center">
              <img
                alt="Man Utd"
                className="w-44 h-44 border border-gray-300 rounded-full object-cover"
                src="/placeholder.svg?height=100&width=100"
              />
            </div>
            <h2 className="text-xs font-bold mt-2 truncate">MAN UNITED</h2>
          </div>

          {/* Match Info */}
          <div className="text-center w-1/3">
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-1">
              <span className="font-bold text-sm">VS</span>
            </div>
            <p className="text-xs text-gray-500">Dec 12, 2025</p>
            <p className="text-sm font-bold">19:00</p>
            <p className="text-xs mt-1 text-gray-500">WinWin Field</p>
          </div>

          {/* Team 2 */}
          <div className="text-center w-1/3">
            <div className="flex justify-center">
              <img
                alt="Man City"
                className="w-44 h-44 border border-gray-300 rounded-full object-cover"
                src="/placeholder.svg?height=100&width=100"
              />
            </div>
            <h2 className="text-xs font-bold mt-2 truncate">MAN CITY</h2>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-14 mb-5">
          <button className="border border-gray-300 w-1/3 py-3 text-xs font-medium text-gray-700 rounded hover:bg-gray-200">
            EDIT
          </button>
          <button className="bg-black text-white w-1/3 py-3 text-xs font-medium rounded  hover:bg-gray-800">MESSAGE</button>
          <button className="border border-red-400 text-black w-1/3 py-3 text-xs font-medium rounded  hover:bg-red-500">
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}

