"use client";
import type React from "react";
import type {
  CreateMatchType,
  PlayingCenterType,
  CardFieldType,
  CenterSelection,
  PlayingSlotType,
  TeamOverviewResponse,
} from "@/types";

import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import { ArrowLeft, ChevronDown, Upload, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import matchApi from "@/service/matchApi";
import { uploadImage } from "@/utils/uploadImage";
import { getImageUrl } from "@/utils/getImage";
import { convertToTimestamp } from "@/utils/convertToTimestamp";

export default function CreateMatch() {
  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = Number.parseInt(parsedData.id);

  const router = useRouter();
  const [playingCenters, setPlayingCenters] = useState<CardFieldType[]>([]);
  const [selectedCenter, setSelectedCenter] = useState<CenterSelection | null>(null);
  const [playingSlots, setPlayingSlots] = useState<PlayingSlotType[]>([]);
  const [loading, setLoading] = useState(false);
  const [slotAvailable, setSlotAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [formData, setFormData] = useState<CreateMatchType>({
    userId: userId,
    name: "",
    fromTime: 0,
    toTime: 0,
    location: "",
    description: "",
    cover: "",
    memberIdList: [],
    type: "",
    slotId: null,
    userTeamId: 0,
    membersRequired: 0,
  });
  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    undefined,
  );
  const [numberList, setNumberList] = useState<number[]>([]);
  const [teamOverview, setTeamOverview] = useState<TeamOverviewResponse | null>(
    null,
  );
  const [showTeamButton, setShowTeamButton] = useState(true);

  // Set default date to today
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    setSelectedDate(`${year}-${month}-${day}`);
  }, []);

  // Handle input changes for text fields
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "membersRequired" && value) {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // When sport type changes, fetch related playing centers
    if (name === "type" && value) {
      fetchPlayingCenters(value);
    }

    // Reset availability status when form data changes
    setSlotAvailable(null);
  };

  // Handle date input changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    setSlotAvailable(null); // Reset availability when date changes
  };

  // Handle time input changes
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [hours, minutes] = value.split(":").map(Number);

    if (selectedDate) {
      // Convert date and time to seconds since epoch
      const dateObj = new Date(`${selectedDate}T${value}:00`);
      const timeInSeconds = Math.floor(dateObj.getTime());
      console.log(timeInSeconds)

      setFormData((prev) => ({ ...prev, [name]: timeInSeconds }));
    } else {
      // Fallback if no date is selected (old behavior)
      const timeInSeconds = hours * 3600 + minutes * 60;

      setFormData((prev) => ({ ...prev, [name]: timeInSeconds }));
    }

    // Reset availability status when time changes
    setSlotAvailable(null);
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
          toast.success("Image uploaded successfully");
        } else {
          toast.error("Image upload failed");
          console.error("Image upload failed");
        }
      } catch (error) {
        toast.error("Error uploading image");
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
    toast.info("Image removed");
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
      toast.error("Error loading playing center information");
      console.error("Error fetching playing centers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle selection of playing center
  const handleCenterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const centerId = e.target.value;
    const center = playingCenters.find((c) => c.id.toString() === centerId);

    if (center) {
      setSelectedCenter({
        id: center.id,
        address: center.address,
      });
      setFormData((prev) => ({
        ...prev,
        location: center.address,
      }));

      fetchSlots(centerId);
    }

    // Reset availability status when center changes
    setSlotAvailable(null);
  };

  const fetchSlots = async (centerId: string) => {
    try {
      setLoading(true);
      const response = await matchApi.getPlayingSlot(Number.parseInt(centerId));

      setPlayingSlots(response.data);
    } catch (error) {
      toast.error("Error loading slot information");
      console.error("Error fetching slots:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check slot availability
  const checkSlotAvailability = async () => {
    if (!formData.slotId || formData.fromTime === 0 || formData.toTime === 0) {
      toast.warning("Please select a slot, date, and time");

      return;
    }

    try {
      setIsChecking(true);
      const response = await matchApi.checkSlotAvailability(
        formData.slotId,
        formData.fromTime,
        formData.toTime,
      );

      // API returns true if slot is unavailable (already booked)
      const isUnavailable = response.data;

      if (isUnavailable) {
        toast.error(
          "This time slot is already booked. Please choose another time.",
        );
        setSlotAvailable(false);
      } else {
        toast.success("This time slot is available! You can create a match.");
        setSlotAvailable(true);
      }
    } catch (error) {
      console.error("Error checking slot availability:", error);
      toast.error("Unable to check slot availability. Please try again.");
      setSlotAvailable(false);
    } finally {
      setIsChecking(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // If slot availability hasn't been checked yet
    if (slotAvailable === null) {
      toast.warning("Please check slot availability first");

      return;
    }

    // If slot is not available
    if (slotAvailable === false) {
      toast.error(
        "This time slot is not available. Please choose another time.",
      );

      return;
    }

    try {
      setLoading(true);
      console.log(formData)
      const response = await matchApi.createMatch(formData);

      if (response.data) {
        toast.success("Match created successfully!");
      }
      router.push("/");
    } catch (error) {
      console.error("Error creating match:", error);
      toast.error("Unable to create match. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Updated fetchAllUserIds function to first get team overview
  const fetchAllUserIds = async () => {
    try {
      setLoading(true);

      // Xác định sport, đảm bảo giá trị hợp lệ
      const sport = formData.type === "BADMINTON" ? "BADMINTON" : "FOOTBALL";

      // First, get team overview
      const usersResponse = await matchApi.getAllUsers(formData.userId, sport);

      // if (usersResponse.data.length < formData.membersRequired) {
      //   toast.error("Your team member quantity is not suitable");

      //   return;
      // }
      const teamResponse = await matchApi.getOverview(formData.userId, sport);

      if (teamResponse.data) {
        setTeamOverview(teamResponse.data);

        // Hide the button after getting team data
        setShowTeamButton(false);
      }

      // Then, get all user IDs

      if (usersResponse.data) {
        setNumberList(usersResponse.data);

        // Update the form data with the member list
        setFormData((prev) => ({
          ...prev,
          userTeamId: teamResponse.data.id,
          memberIdList: usersResponse.data,
        }));

        toast.success("Team information loaded successfully");
      }
    } catch (error) {
      console.error("Error fetching team data:", error);
      toast.error("Unable to load team information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mb-10 mt-10 mx-auto border rounded-xl bg-white min-h-screen">
      {/* Add Toaster component */}
      <Toaster richColors position="top-center" />

      {/* Header with back button */}
      <div className="relative">
        <button
          className="absolute top-4 left-4 bg-black p-3 rounded-lg z-10  shadow-md"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </button>
        <div className="border-b border-gray-200 w-full mt-12" />
      </div>

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-center">CREATE MATCH</h1>
      </div>

      {/* Banner image section */}
      <div className="relative h-40 sm:h-52 bg-slate-50 mb-6 mx-4 rounded-lg overflow-hidden">
        <input
          accept="image/*"
          className="hidden"
          id="cover"
          name="cover"
          type="file"
          onChange={handleImageUpload}
        />

        {coverPreview ? (
          <>
            <label className="absolute inset-0 cursor-pointer" htmlFor="cover">
              <img
                alt="Cover preview"
                className="w-full h-full object-cover"
                src={coverPreview || "/placeholder.svg"}
              />
            </label>

            {/* Remove image button */}
            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
              type="button"
              onClick={handleRemoveImage}
            >
              ✖
            </button>
          </>
        ) : (
          <label
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer"
            htmlFor="cover"
          >
            <Upload className="text-gray-500 mb-2" size={24} />
            <span className="text-gray-500 text-sm sm:text-base">
              Upload Cover
            </span>

            {/* Background decoration elements */}
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-blue-100 rounded-full absolute top-5 right-10 opacity-30" />
            <div className="w-24 sm:w-32 h-24 sm:h-32 bg-blue-200 rounded-t-full absolute bottom-0 left-20 opacity-30" />
          </label>
        )}

        {/* Down arrow */}
        <div className="absolute right-4 bottom-4">
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </div>
      </div>

      {/* Form */}
      <form className="px-4 space-y-6" onSubmit={handleSubmit}>
        {/* Team names */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-left text-sm font-medium uppercase mb-2"
              htmlFor="team-name"
            >
              NAME
            </label>
            <div className="relative">
              <input
                required
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
                id="team-name"
                name="name"
                placeholder="Enter team name"
                type="text"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-left text-sm font-medium uppercase mb-2"
              htmlFor="team-location"
            >
              LOCATION
            </label>
            <div className="relative">
              <input
                required
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
                id="team-location"
                name="location"
                placeholder={selectedCenter?.address || "Enter address"}
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Description and Sport */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DESCRIPTION */}
          <div>
            <label
              className="block text-left text-sm font-medium uppercase mb-2"
              htmlFor="team-description"
            >
              DESCRIPTION
            </label>
            <div className="relative">
              <textarea
                className="w-full border h-24 border-gray-300 p-2 text-md pr-10 rounded-lg resize-none"
                id="team-description"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* SPORT */}
          <div>
            <label
              className="block text-left text-sm font-medium uppercase mb-2"
              htmlFor="team-sport"
            >
              SPORT
            </label>
            <div className="relative">
              <select
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg appearance-none"
                id="team-sport"
                name="type"
                value={formData.type || ""}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select a sport
                </option>
                <option value="FOOTBALL">FOOTBALL</option>
                <option value="BADMINTON">BADMINTON</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* MEMBERS REQUIRED */}
          <div>
            <label
              className="block text-left text-sm font-medium uppercase mb-2"
              htmlFor="team-members-required"
            >
              MEMBERS REQUIRED
            </label>
            <div className="relative">
              <select
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg appearance-none"
                id="team-members-required"
                name="membersRequired"
                value={formData.membersRequired || ""}
                onChange={handleChange}
              >
                <option disabled value="">
                  Select minimum players
                </option>
                {(formData.type === "FOOTBALL"
                  ? [5, 7, 11]
                  : formData.type === "BADMINTON"
                    ? [2]
                    : []
                ).map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Date input */}
        <div>
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="match-date"
          >
            DATE
          </label>
          <div className="relative">
            <input
              required
              className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
              id="match-date"
              min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
              name="matchDate"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-left text-sm font-medium uppercase mb-2"
              htmlFor="from-time"
            >
              FROM TIME
            </label>
            <div className="relative">
              <input
                required
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
                id="from-time"
                name="fromTime"
                type="time"
                onChange={handleTimeChange}
              />
            </div>
          </div>
          <div>
            <label
              className="block text-left text-sm font-medium uppercase mb-2"
              htmlFor="to-time"
            >
              TO TIME
            </label>
            <div className="relative">
              <input
                required
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
                id="to-time"
                name="toTime"
                type="time"
                onChange={handleTimeChange}
              />
            </div>
          </div>
        </div>

        {/* Playing center - now a dropdown */}
        <div>
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="playing-center"
          >
            PLAYING CENTER
          </label>
          <div className="relative">
            <select
              className="w-full h-12 border border-gray-300 p-2 text-md rounded-lg appearance-none"
              disabled={!formData.type || playingCenters.length === 0}
              id="playing-center"
              value={selectedCenter?.id || ""}
              onChange={handleCenterSelect}
            >
              <option disabled value="">
                {formData.type
                  ? playingCenters.length === 0
                    ? "No centers available"
                    : "Select a center"
                  : "Select a sport first"}
              </option>
              {playingCenters.map((center) => (
                <option key={center.id} value={center.id}>
                  {center.name} - {center.address}
                </option>
              ))}
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Playing slot - now a dropdown */}
        <div>
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="playing-slot"
          >
            PLAYING SLOT
          </label>
          <div className="relative">
            <select
              className="w-full h-12 border border-gray-300 p-2 text-md rounded-lg appearance-none"
              disabled={!selectedCenter || playingSlots.length === 0}
              id="playing-slot"
              name="slotId"
              value={formData.slotId || ""}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  slotId: Number(e.target.value),
                }));
                setSlotAvailable(null); // Reset availability when slot changes
              }}
            >
              <option disabled value="">
                {selectedCenter
                  ? playingSlots.length === 0
                    ? "No slots available"
                    : "Select a slot"
                  : "Select a center first"}
              </option>
              {playingSlots.map((slot) => (
                <option key={slot.id} value={slot.id}>
                  {slot.name || `Slot #${slot.id}`}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Add your team - Updated UI with Internal Back Button */}
        <div>
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="add-team-section"
          >
            ADD YOUR TEAM
          </label>
          <div
            className="border border-gray-300 p-4 sm:p-6 rounded-lg"
            id="add-team-section"
          >
            {/* Show button if team overview is not loaded yet */}
            {showTeamButton ? (
              <div className="flex justify-center">
                <button
                  className="bg-black text-white px-6 py-3 text-sm font-medium rounded-md flex items-center"
                  disabled={!formData.type || loading}
                  id="add-team-button"
                  type="button"
                  onClick={fetchAllUserIds}
                >
                  {loading ? (
                    "LOADING..."
                  ) : (
                    <>
                      <Users className="mr-2 h-4 w-4" /> ADD YOUR TEAM
                    </>
                  )}
                </button>
              </div>
            ) : (
              <>
                {/* Back Button */}
                <div className="flex justify-start mb-4">
                  <button
                    className="flex items-center text-sm font-medium px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-500"
                    id="back-button"
                    type="button"
                    onClick={() => setShowTeamButton(true)} // Reset to show just the ADD YOUR TEAM button
                  >
                    <svg
                      className="h-4 w-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    Back
                  </button>
                </div>

                {/* Team Overview Section */}
                {teamOverview && (
                  <div className="mb-6">
                    <div className="relative h-44 bg-gray-100 rounded-t-lg overflow-hidden mb-4">
                      {/* Team Cover */}
                      {teamOverview.cover && (
                        <img
                          alt="Team Cover"
                          className="w-full h-full object-cover"
                          src={getImageUrl(teamOverview.cover)}
                        />
                      )}

                      {/* Team Logo */}
                      <div className="absolute bottom-0 left-4 transform translate-y-1/2">
                        <div className="w-36 h-36 bg-white rounded-full border-2 border-white overflow-hidden shadow-md">
                          {teamOverview.logo ? (
                            <img
                              alt="Team Logo"
                              className="w-full h-full object-contain"
                              src={getImageUrl(teamOverview.logo)}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <Users className="text-gray-500" size={24} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Team Info */}
                    <div className="pl-4 pt-8">
                      <h3 className="font-bold text-lg">{teamOverview.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="mr-4">
                          Sport: {teamOverview.sport}
                        </span>
                        <span>{teamOverview.totalMembers} Members</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-b border-gray-200 my-4" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Availability status indicator */}
        {slotAvailable !== null && (
          <div
            className={`p-3 rounded-md text-center text-sm ${slotAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            id="availability-status"
          >
            {slotAvailable
              ? "✓ This time slot is available!"
              : "✗ This time slot is not available. Please select another time."}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 pb-8">
          <button
            className="border border-gray-300 px-4 py-2 h-12 text-sm font-medium rounded-md w-full sm:w-auto"
            id="discard-button"
            type="button"
            onClick={() => {
              window.history.back();
            }}
          >
            DISCARD
          </button>
          <button
            className="bg-gray-800 text-white px-4 py-2 h-12 text-sm font-medium rounded-md w-full sm:w-auto"
            disabled={
              isChecking ||
              !formData.slotId ||
              formData.fromTime === 0 ||
              formData.toTime === 0 ||
              !selectedDate
            }
            id="check-availability-button"
            type="button"
            onClick={checkSlotAvailability}
          >
            {isChecking ? "CHECKING..." : "CHECK AVAILABILITY"}
          </button>
          <button
            className={`${slotAvailable ? "bg-black" : "bg-gray-400"} text-white px-4 py-2 h-12 text-sm font-medium rounded-md w-full sm:w-auto`}
            disabled={loading || !slotAvailable}
            id="create-button"
            type="submit"
          >
            {loading ? "CREATING..." : "CREATE"}
          </button>
        </div>
      </form>
    </div>
  );
}
