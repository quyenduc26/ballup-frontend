"use client"
import { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, Upload } from "lucide-react";
import { CreateMatchType, PlayingCenterType, CardFieldType, CenterSelection, PlayingSlotType } from "@/types";
import matchApi from "@/service/matchApi";
import { uploadImage } from "@/utils/uploadImage";
import { getImageUrl } from "@/utils/getImage";
import Link from "next/link";

export default function CreateMatch() {
  const [playingCenters, setPlayingCenters] = useState<CardFieldType[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<CenterSelection | null>(null);
  const [playingSlots, setPlayingSlots] = useState<PlayingSlotType[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateMatchType>({
    userId: 1, // This should be set from your auth context
    name: "",
    fromTime: 0,
    toTime: 0,
    location: "",
    description: "",
    cover: "",
    memberIdList: [],
    type: null,
    slotId: null
  });
  const [coverPreview, setCoverPreview] = useState<string | undefined>(undefined);

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // When sport type changes, fetch related playing centers
    if (name === "type" && value) {
      fetchPlayingCenters(value);
    }
  };

  // Handle time input changes
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [hours, minutes] = value.split(':').map(Number);
    const timeInSeconds = hours * 3600 + minutes * 60;

    setFormData((prev) => ({ ...prev, [name]: timeInSeconds }));
  };

  // Fixed image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        setLoading(true);
        const file = e.target.files[0];
        const coverImg = await uploadImage(file);
        if (coverImg) {
          setFormData((prev) => ({ ...prev, cover: coverImg }));
          setCoverPreview(getImageUrl(coverImg));
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Remove uploaded image
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, cover: "" }));
    setCoverPreview(undefined);
  };

  // Fetch playing centers based on sport type
  const fetchPlayingCenters = async (sportType: string) => {
    try {
      setLoading(true);
      const playingCenterParams: PlayingCenterType = {
        id: 0,
        name: "",
        address: "",
        description: "",
        images: [],
        ownerId: 0,
        type: "",
      };
      const response = await matchApi.getPlayingCenter(playingCenterParams);
      if (response.data && Array.isArray(response.data)) {
        setPlayingCenters(response.data);
      }
    } catch (error) {
      console.error("Error fetching playing centers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle selection of playing center
  const handleCenterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const centerId = e.target.value;
    const center = playingCenters.find(c => c.id.toString() === centerId);
    
    if (center) {
      setSelectedCenter({
        id: center.id,
        address: center.address
      });
      setFormData(prev => ({
        ...prev,
        location: center.address
      }));
  
      fetchSlots(centerId);
    }
  };
  
  const fetchSlots = async (centerId: string) => {
    try {
      setLoading(true);
      const response = await matchApi.getPlayingSlot (parseInt(centerId));
      setPlayingSlots(response.data);
    } catch (error) {
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);  
    }
  };
  

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await matchApi.createTeam(formData);
      if (response.data) {
        alert("Match created successfully!");
      }
    } catch (error) {
      console.error("Error creating match:", error);
      alert("Failed to create match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen">
      <div className="relative">
        <button
          className="absolute top-4 left-4 bg-black p-2 z-10"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <div className="border-b border-gray-200 w-full mt-12"></div>
      </div>

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-center">CREATE MATCH</h1>
      </div>

      {/* Banner image section */}
      <div className="relative h-52 bg-slate-50 mb-6">
        <input
          type="file"
          id="cover"
          name="cover"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {coverPreview ? (
          <>
            <label htmlFor="cover" className="absolute inset-0 cursor-pointer">
              <img
                src={coverPreview}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </label>

            {/* Remove image button */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              ✖
            </button>
          </>
        ) : (
          <label htmlFor="cover" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
            <Upload className="text-gray-500 mb-2" size={24} />
            <span className="text-gray-500">Upload Cover</span>

            {/* Background decoration elements */}
            <div className="w-20 h-20 bg-blue-100 rounded-full absolute top-5 right-10 opacity-30"></div>
            <div className="w-32 h-32 bg-blue-200 rounded-t-full absolute bottom-0 left-20 opacity-30"></div>
          </label>
        )}

        {/* Down arrow */}
        <div className="absolute right-4 bottom-4">
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Form */}
      <form className="px-4 space-y-4" onSubmit={handleSubmit}>
        {/* Team names */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">NAME</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter team name"
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">LOCATION</label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={selectedCenter?.address || "Enter address"}
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">
              DESCRIPTION
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full border h-28 border-gray-300 p-2 text-md pr-10 rounded-lg resize-none"
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">SPORT</label>
            <div className="relative">
              <select
                name="type"
                value={formData.type || ""}
                onChange={handleChange}
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg appearance-none"
              >
                <option value="" disabled>Select a sport</option>
                <option value="FOOTBALL">FOOTBALL</option>
                <option value="BADMINTON">BADMINTON</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">FROM TIME</label>
            <div className="relative">
              <input
                type="time"
                name="fromTime"
                onChange={handleTimeChange}
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-left text-md font-medium uppercase mb-4">TO TIME</label>
            <div className="relative">
              <input
                type="time"
                name="toTime"
                onChange={handleTimeChange}
                className="w-full border h-14 border-gray-300 p-2 text-md pr-10 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Playing center - now a dropdown */}
        <div>
          <label className="block text-left text-md font-medium uppercase mb-4">PLAYING CENTER</label>
          <div className="relative">
            <select
              value={selectedCenter?.id || ""}
              onChange={handleCenterSelect}
              className="w-full h-14 border border-gray-300 p-2 text-md rounded-lg appearance-none"
              disabled={!formData.type || playingCenters.length === 0}
            >
              <option value="" disabled>
                {formData.type
                  ? (playingCenters.length === 0 ? "No centers available" : "Select a center")
                  : "Select a sport first"}
              </option>
              {playingCenters.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name} - {center.address}
                </option>
              ))}
            </select>


            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Playing slot - now a dropdown */}
        <div>
          <label className="block text-left text-md font-medium uppercase mb-4">PLAYING SLOT</label>
          <div className="relative">
            <select
              name="slotId"
              value={formData.slotId || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, slotId: Number(e.target.value) }))}
              className="w-full h-14 border border-gray-300 p-2 text-md rounded-lg appearance-none"
              disabled={!selectedCenter || playingSlots.length === 0}
            >
              <option value="" disabled>
                {selectedCenter
                  ? (playingSlots.length === 0 ? "No slots available" : "Select a slot")
                  : "Select a center first"}
              </option>
              {playingSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.name || `Slot #${slot.id}`}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Add your team */}
        <div>
          <label className="block text-left text-md font-medium uppercase mb-4">
            ADD YOUR TEAM
          </label>
          <div className="border border-gray-300 p-6 flex justify-center rounded-lg">
            <Link href="/createMatch/addTeam">
              <button
                type="button"
                className="bg-black text-white px-4 py-2 text-sm font-medium"
              >
                ADD YOUR TEAM
              </button>
            </Link>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-2 pt-4 pb-8">
          <button
            type="button"
            className="border border-gray-300 px-4 py-2 h-14 text-sm font-medium"
            onClick={() => {
              window.history.back();
            }}
          >
            DISCARD
          </button>
          <button
            type="button"
            className="bg-black text-white px-4 py-2 h-14 text-sm font-medium"
            onClick={() => {
              // Check slot availability logic
              alert("Checking slot availability...");
              // You would call an API here to check availability
            }}
          >
            CHECK AVAILABILITY
          </button>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 h-14 text-sm font-medium"
            disabled={loading}
          >
            {loading ? "CREATING..." : "CREATE"}
          </button>
        </div>
      </form>
    </div>
  );
}