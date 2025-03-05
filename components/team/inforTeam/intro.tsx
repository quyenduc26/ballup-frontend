import { useState } from "react";

import { TeamHeaderProps } from "@/types/form";
import { getImageUrl } from "@/utils/getImage";
import TeamDetailApi from "@/service/teamDetail";

const TeamHeader: React.FC<TeamHeaderProps> = ({
  logo,
  name,
  intro,
  address,
  teamId,
}) => {
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // State để hiển thị menu

  const handleDeleteTeam = async () => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    setLoading(true);
    try {
      const data = localStorage.getItem("data");
      const parsedData = data ? JSON.parse(data) : null;
      const userId = parsedData?.id;

      if (!userId) {
        alert("User not found. Please log in again.");

        return;
      }
      await TeamDetailApi.deleteTeam(teamId, userId);
      alert("Team has been deleted successfully!");
      window.location.href = "/team";
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Failed to delete team!");
    } finally {
      setLoading(false);
      setShowOptions(false);
    }
  };

  const handleEditTeam = () => {
    alert("Edit team clicked!");
    setShowOptions(false);
  };

  return (
    <div className="w-full border-t border-gray-200 bg-white">
      <div className="flex justify-center md:justify-start">
        <img
          alt="Team Logo"
          className="w-full h-64 border-2 border-white object-cover"
          src={logo ? getImageUrl(logo) : "/images/field.png"}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center p-4">
        {/* Logo Section */}
        <div className="pr-0 md:pr-4 flex justify-center md:block">
          <img
            alt="Team Logo"
            className="w-36 h-36 rounded-full border-2 border-white object-cover"
            src={logo ? getImageUrl(logo) : "/images/arsenal.png"}
          />
        </div>

        {/* Team Info Section */}
        <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-xl md:text-2xl font-bold text-black">{name}</h1>
          <p className="text-sm text-gray-600">{intro}</p>
          <p className="text-sm text-gray-600">{address}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="bg-black text-white px-4 md:px-6 py-2 font-medium">
            CHAT
          </button>
          <button className="border border-gray-300 bg-white text-black px-4 md:px-6 py-2 font-medium">
            LIKE
          </button>

          {/* Nút "..." với menu dropdown */}
          <div className="relative">
            <button
              className="border border-gray-300 px-4 py-2 font-medium"
              disabled={loading}
              onClick={() => setShowOptions(!showOptions)}
            >
              {loading ? "Processing..." : "..."}
            </button>

            {showOptions && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md">
                <button
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={handleEditTeam}
                >
                  Edit
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  onClick={handleDeleteTeam}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader;
