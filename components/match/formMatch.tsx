import { useState } from "react";

export default function CreateMatch() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [description, setDescription] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [playingCenter, setPlayingCenter] = useState(
    "Sân bóng Win Win - Phước Mỹ, Sơn Trà, Thành phố Đà Nẵng"
  );
  const [playingSlot, setPlayingSlot] = useState("Sân 1");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log({ team1, team2, description, fromTime, toTime, playingCenter, playingSlot });
    alert("Match Created!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <button className="text-black mb-4 text-xl">&#8592; Back</button>
        <h2 className="text-2xl font-bold text-center mb-4">CREATE MATCH</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">NAME</label>
              <input
                type="text"
                placeholder="Enter team name 1"
                className="w-full p-2 border rounded"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold">LOCATION</label>
              <input
                type="text"
                placeholder="Enter team name 2"
                className="w-full p-2 border rounded"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">DESCRIPTION</label>
            <input
              type="text"
              placeholder="HH/MM DD/MM/YYYY"
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold">FROM TIME</label>
              <input
                type="time"
                className="w-full p-2 border rounded"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-semibold">TO TIME</label>
              <input
                type="time"
                className="w-full p-2 border rounded"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">PLAYING CENTER</label>
            <select
              className="w-full p-2 border rounded"
              value={playingCenter}
              onChange={(e) => setPlayingCenter(e.target.value)}
            >
              <option>Sân bóng Win Win - Phước Mỹ, Sơn Trà, Thành phố Đà Nẵng</option>
              <option>Sân bóng ABC - Quận 1, TP. HCM</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold">PLAYING SLOT</label>
            <select
              className="w-full p-2 border rounded"
              value={playingSlot}
              onChange={(e) => setPlayingSlot(e.target.value)}
            >
              <option>Sân 1</option>
              <option>Sân 2</option>
              <option>Sân 3</option>
            </select>
          </div>

          <div className="text-center">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
              ADD YOUR TEAM
            </button>
          </div>

          <div className="flex justify-between">
            <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded">
              DISCARD
            </button>
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded">
              CHECK AVAILABILITY
            </button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
