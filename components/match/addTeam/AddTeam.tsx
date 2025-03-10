"use client";

import { useRouter } from "next/navigation";
import { TeamHeaderProps, UserType } from "@/types/form";
import { getImageUrl } from "@/utils/getImage";
import { useEffect, useState } from "react";
import matchApi from "@/service/matchApi";

const AddTeam = ({ logo, name, address, sport }: TeamHeaderProps) => {
  const router = useRouter();
  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [memberIdList, setMemberIdList] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userId = 1; 
        const response = await matchApi.getAllUsers(userId, "FOOTBALL");
        if (response.data) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const toggleUserSelection = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };
  
  const handleMemberSelection = () => {
    setMemberIdList([...selectedUsers]);
    setIsDropdownOpen(false);
  };

  const handleSubmit = () => {
    console.log("Selected member IDs:", memberIdList);
    
  };

  return (
    <div className="w-full border-t border-gray-200 bg-white p-4">
      {/* Back Button */}
      <div className="flex justify-start">
        <button
          onClick={() => router.push("/match/createMatch")}
          className="mb-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600 transition"
        >
          ← 
        </button>
      </div>
      
      {/* Team Banner */}
      <div className="flex justify-center md:justify-start">
        <img
          alt="Team Banner"
          className="w-full h-64 border-2 border-white object-cover"
          src={logo ? getImageUrl(logo) : "/images/field.png"}
        />
      </div>
      
      {/* Team Info */}
      <div className="flex flex-col md:flex-row items-center p-4">
        <div className="pr-0 md:pr-4 flex justify-center md:block">
          <img
            alt="Team Logo"
            className="w-36 h-36 rounded-full border-2 border-white object-cover"
            src={logo ? getImageUrl(logo) : "/images/arsenal.png"}
          />
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-600">{address}</p>
          <p className="text-sm text-gray-500">Sport: {sport}</p>
        </div>
      </div>
      
      {/* Member Selection */}
      <div className="mt-6">
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-3">Team Members</h2>
          
          {/* Member Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full p-3 border border-gray-300 rounded-md bg-white flex justify-between items-center"
            >
              <span>
                {selectedUsers.length > 0 
                  ? `${selectedUsers.length} members selected` 
                  : "Select team members"}
              </span>
              <svg 
                className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Members Table */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center">Loading members...</div>
                ) : users.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="p-2 text-left">Select</th>
                        <th className="p-2 text-left">ID</th>
                        <th className="p-2 text-left">Name</th>
                        <th className="p-2 text-left">Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50">
                          <td className="p-2">
                            <input
                              type="checkbox"
                              checked={selectedUsers.includes(user.id)}
                              onChange={() => toggleUserSelection(user.id)}
                              className="h-4 w-4"
                            />
                          </td>
                          <td className="p-2">{user.id}</td>
                          <td className="p-2">{user.name}</td>
                          <td className="p-2">{user.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4 text-center">No members found</div>
                )}
                
                {/* Apply Selection Button */}
                <div className="p-3 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={handleMemberSelection}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Apply Selection
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Show Selected Members */}
          {selectedUsers.length > 0 && (
            <div className="mt-4">
              <h3 className="font-medium mb-2">Selected Members:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedUsers.map(userId => {
                  const user = users.find(u => u.id === userId);
                  return user ? (
                    <div key={userId} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center">
                      {user.name} (ID: {user.id})
                      <button 
                        onClick={() => toggleUserSelection(userId)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}
          
          {/* Display memberIdList */}
          {memberIdList.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">Member ID List for API:</h3>
              <div className="bg-white p-3 rounded border border-gray-300 overflow-x-auto">
                <code>[{memberIdList.join(', ')}]</code>
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          {memberIdList.length > 0 && (
            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Create Team with Selected Members
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTeam;