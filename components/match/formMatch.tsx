import { useState } from "react";

export default function CreateMatch() {
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [description, setDescription] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [playingCenter, setPlayingCenter] = useState(
    "Sân bóng Win Win - Phước Mỹ, Sơn Trà, Thành phố Đà Nẵng",
  );
  const [playingSlot, setPlayingSlot] = useState("Sân 1");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log({
      team1,
      team2,
      description,
      fromTime,
      toTime,
      playingCenter,
      playingSlot,
    });
    alert("Match Created!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <button className="text-black mb-4 text-xl">&#8592; Back</button>
        <h2 className="text-2xl font-bold text-center mb-4">CREATE MATCH</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="team1">
                NAME
              </label>
              <input
                required
                className="w-full p-2 border rounded"
                id="team1"
                placeholder="Enter team name 1"
                type="text"
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="team2">
                LOCATION
              </label>
              <input
                required
                className="w-full p-2 border rounded"
                id="team2"
                placeholder="Enter team name 2"
                type="text"
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold" htmlFor="description">
              DESCRIPTION
            </label>
            <input
              required
              className="w-full p-2 border rounded"
              id="description"
              placeholder="HH/MM DD/MM/YYYY"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold" htmlFor="fromTime">
                FROM TIME
              </label>
              <input
                required
                className="w-full p-2 border rounded"
                id="fromTime"
                type="time"
                value={fromTime}
                onChange={(e) => setFromTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-semibold" htmlFor="toTime">
                TO TIME
              </label>
              <input
                required
                className="w-full p-2 border rounded"
                id="toTime"
                type="time"
                value={toTime}
                onChange={(e) => setToTime(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold" htmlFor="playingCenter">
              PLAYING CENTER
            </label>
            <select
              className="w-full p-2 border rounded"
              id="playingCenter"
              value={playingCenter}
              onChange={(e) => setPlayingCenter(e.target.value)}
            >
              <option>
                Sân bóng Win Win - Phước Mỹ, Sơn Trà, Thành phố Đà Nẵng
              </option>
              <option>Sân bóng ABC - Quận 1, TP. HCM</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold" htmlFor="playingSlot">
              PLAYING SLOT
            </label>
            <select
              className="w-full p-2 border rounded"
              id="playingSlot"
              value={playingSlot}
              onChange={(e) => setPlayingSlot(e.target.value)}
            >
              <option>Sân 1</option>
              <option>Sân 2</option>
              <option>Sân 3</option>
            </select>
          </div>

          <div className="text-center">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              type="button"
            >
              ADD YOUR TEAM
            </button>
          </div>

          <div className="flex justify-between">
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              type="button"
            >
              DISCARD
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="button"
            >
              CHECK AVAILABILITY
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
