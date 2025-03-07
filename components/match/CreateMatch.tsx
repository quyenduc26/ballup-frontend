import { ArrowLeft, ChevronDown, Clock } from "lucide-react";

export default function CreateMatch() {
  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen">
      {/* Header with back button */}
      <div className="relative">
        <button className="absolute top-4 left-4 bg-black p-2 z-10">
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <div className="border-b border-gray-200 w-full mt-12"></div>
      </div>

      {/* Form title */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-center">CREATE MATCH</h1>
      </div>

      {/* Banner image */}
      <div className="relative h-52 bg-slate-50 mb-6">
        <div className="absolute right-4 bottom-4">
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full absolute top-5 right-10 opacity-30"></div>
          <div className="w-32 h-32 bg-blue-200 rounded-t-full absolute bottom-0 left-20 opacity-30"></div>
        </div>
      </div>

      {/* Form */}
      <form className="px-4 space-y-4">
        {/* Team names */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">NAME</label>
            <div className="relative">
              <input
                type="text"
                 placeholder="Enter team name 1"
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg"
              />
            
            </div>
          </div>
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">LOCATION</label>
            <div className="relative">
              <input
                type="text"
                 placeholder="Enter address"
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg"
              />
            
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-left text-md font-medium uppercase mb-4">DESCRIPTION</label>
          <input type="text" placeholder="HH/MM DD/MM/YYYY" className="w-full border border-gray-300 p-2 h-14 text-sm rounded-lg " />
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">FROM TIME</label>
            <div className="relative">
              <input
                type="time"
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg"
              />
            
            </div>
          </div>
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">TO TIME</label>
            <div className="relative">
              <input
                type="time"
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg"
              />
            
            </div>
          </div>
        </div>

        {/* Playing center */}
        <div>
          <label className="block text-left text-md font-medium uppercase mb-4">PLAYING CENTER</label>
          <input type="text" placeholder="Enter team name 1" className="w-full h-14 border border-gray-300 p-2 text-md rounded-lg" />
        </div>

        {/* Playing slot */}
        <div>
          <label className="block text-left text-md font-medium uppercase mb-4">PLAYING SLOT</label>
          <input type="text" placeholder="Enter team name 1" className="w-full h-14 border border-gray-300 p-2 text-md rounded-lg" />
        </div>

        {/* Add your team */}
        <div>
          <label className="block text-left text-md font-medium uppercase mb-4">ADD YOUR TEAM</label>
          <div className="border border-gray-300 p-6 flex justify-center rounded-lg">
            <button type="button" className="bg-black text-white px-4 py-2 text-sm font-medium">
              ADD YOUR TEAM
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-2 pt-4 pb-8">
          <button type="button" className="border border-gray-300 px-4 py-2 h-14 text-sm font-medium">
            DISCARD
          </button>
          <button type="button" className="bg-black text-white px-4 py-2 text-sm font-medium">
            CHECK AVAILABILITY
          </button>
          <button type="button" className="bg-black text-white px-4 py-2 text-sm font-medium">
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
}
