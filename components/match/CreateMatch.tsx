"use client"
import { useState, useEffect } from "react"
import type React from "react"
import { toast, Toaster } from "sonner"
import { ArrowLeft, ChevronDown, Upload, Users } from "lucide-react"
import type { CreateMatchType, PlayingCenterType, CardFieldType, CenterSelection, PlayingSlotType, TeamOverviewResponse } from "@/types"
import matchApi from "@/service/matchApi"
import { uploadImage } from "@/utils/uploadImage"
import { getImageUrl } from "@/utils/getImage"

export default function CreateMatch() {
  const [playingCenters, setPlayingCenters] = useState<CardFieldType[]>([])
  const [selectedCenter, setSelectedCenter] = useState<CenterSelection | null>(null)
  const [playingSlots, setPlayingSlots] = useState<PlayingSlotType[]>([])
  const [loading, setLoading] = useState(false)
  const [slotAvailable, setSlotAvailable] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [formData, setFormData] = useState<CreateMatchType>({
    userId: 1,
    name: "",
    fromTime: 0,
    toTime: 0,
    location: "",
    description: "",
    cover: "",
    memberIdList: [],
    type: "",
    slotId: null,
  })
  const [coverPreview, setCoverPreview] = useState<string | undefined>(undefined)
  const [numberList, setNumberList] = useState<number[]>([])
  const [teamOverview, setTeamOverview] = useState<TeamOverviewResponse | null>(null)
  const [showTeamButton, setShowTeamButton] = useState(true)

  // Set default date to today
  useEffect(() => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, "0")
    const day = String(today.getDate()).padStart(2, "0")
    setSelectedDate(`${year}-${month}-${day}`)
  }, [])

  // Handle input changes for text fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // When sport type changes, fetch related playing centers
    if (name === "type" && value) {
      fetchPlayingCenters(value)
    }

    // Reset availability status when form data changes
    setSlotAvailable(null)
  }

  // Handle date input changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value)
    setSlotAvailable(null) // Reset availability when date changes
  }

  // Handle time input changes
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const [hours, minutes] = value.split(":").map(Number)

    if (selectedDate) {
      // Convert date and time to seconds since epoch
      const dateObj = new Date(`${selectedDate}T${value}:00`)
      const timeInSeconds = Math.floor(dateObj.getTime() / 1000)

      setFormData((prev) => ({ ...prev, [name]: timeInSeconds }))
    } else {
      // Fallback if no date is selected (old behavior)
      const timeInSeconds = hours * 3600 + minutes * 60
      setFormData((prev) => ({ ...prev, [name]: timeInSeconds }))
    }

    // Reset availability status when time changes
    setSlotAvailable(null)
  }

  // Fixed image upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        setLoading(true)
        const file = e.target.files[0]
        const coverImg = await uploadImage(file)
        if (coverImg) {
          setFormData((prev) => ({ ...prev, cover: coverImg }))
          setCoverPreview(getImageUrl(coverImg))
          toast.success("Image uploaded successfully")
        } else {
          toast.error("Image upload failed")
          console.error("Image upload failed")
        }
      } catch (error) {
        toast.error("Error uploading image")
        console.error("Error uploading image:", error)
      } finally {
        setLoading(false)
      }
    }
  }

  // Remove uploaded image
  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, cover: "" }))
    setCoverPreview(undefined)
    toast.info("Image removed")
  }

  // Fetch playing centers based on sport type
  const fetchPlayingCenters = async (sportType: string) => {
    try {
      setLoading(true)
      const playingCenterParams: PlayingCenterType = {
        id: 0,
        name: "",
        address: "",
        description: "",
        images: [],
        ownerId: 0,
        type: "",
      }
      const response = await matchApi.getPlayingCenter(playingCenterParams)
      if (response.data && Array.isArray(response.data)) {
        setPlayingCenters(response.data)
      }
    } catch (error) {
      toast.error("Error loading playing center information")
      console.error("Error fetching playing centers:", error)
    } finally {
      setLoading(false)
    }
  }

  // Handle selection of playing center
  const handleCenterSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const centerId = e.target.value
    const center = playingCenters.find((c) => c.id.toString() === centerId)

    if (center) {
      setSelectedCenter({
        id: center.id,
        address: center.address,
      })
      setFormData((prev) => ({
        ...prev,
        location: center.address,
      }))

      fetchSlots(centerId)
    }

    // Reset availability status when center changes
    setSlotAvailable(null)
  }

  const fetchSlots = async (centerId: string) => {
    try {
      setLoading(true)
      const response = await matchApi.getPlayingSlot(Number.parseInt(centerId))
      setPlayingSlots(response.data)
    } catch (error) {
      toast.error("Error loading slot information")
      console.error("Error fetching slots:", error)
    } finally {
      setLoading(false)
    }
  }

  // Check slot availability
  const checkSlotAvailability = async () => {
    if (!formData.slotId || formData.fromTime === 0 || formData.toTime === 0) {
      toast.warning("Please select a slot, date, and time")
      return
    }

    try {
      setIsChecking(true)
      const response = await matchApi.checkSlotAvailability(formData.slotId, formData.fromTime, formData.toTime)

      // API returns true if slot is unavailable (already booked)
      const isUnavailable = response.data

      if (isUnavailable) {
        toast.error("This time slot is already booked. Please choose another time.")
        setSlotAvailable(false)
      } else {
        toast.success("This time slot is available! You can create a match.")
        setSlotAvailable(true)
      }
    } catch (error) {
      console.error("Error checking slot availability:", error)
      toast.error("Unable to check slot availability. Please try again.")
      setSlotAvailable(false)
    } finally {
      setIsChecking(false)
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // If slot availability hasn't been checked yet
    if (slotAvailable === null) {
      toast.warning("Please check slot availability first")
      return
    }

    // If slot is not available
    if (slotAvailable === false) {
      toast.error("This time slot is not available. Please choose another time.")
      return
    }

    try {
      setLoading(true)
      const response = await matchApi.createMatch(formData)
      if (response.data) {
        toast.success("Match created successfully!")
      }
    } catch (error) {
      console.error("Error creating match:", error)
      toast.error("Unable to create match. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Updated fetchAllUserIds function to first get team overview
  const fetchAllUserIds = async () => {
    try {
      setLoading(true);

      // Xác định sport, đảm bảo giá trị hợp lệ
      const sport = formData.type === "BADMINTON" ? "BADMINTON" : "FOOTBALL";

      // First, get team overview
      const teamResponse = await matchApi.getOverview(formData.userId, sport);
      if (teamResponse.data) {
        setTeamOverview(teamResponse.data);

        // Hide the button after getting team data
        setShowTeamButton(false);
      }

      // Then, get all user IDs
      const usersResponse = await matchApi.getAllUsers(formData.userId, sport);
      if (usersResponse.data) {
        setNumberList(usersResponse.data);

        // Update the form data with the member list
        setFormData((prev) => ({
          ...prev,
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
        <div className="border-b border-gray-200 w-full mt-12"></div>
      </div>

      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-center">CREATE MATCH</h1>
      </div>

      {/* Banner image section */}
      <div className="relative h-40 sm:h-52 bg-slate-50 mb-6 mx-4 rounded-lg overflow-hidden">
        <input type="file" id="cover" name="cover" accept="image/*" onChange={handleImageUpload} className="hidden" />

        {coverPreview ? (
          <>
            <label htmlFor="cover" className="absolute inset-0 cursor-pointer">
              <img
                src={coverPreview || "/placeholder.svg"}
                alt="Cover preview"
                className="w-full h-full object-cover"
              />
            </label>

            {/* Remove image button */}
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-md"
            >
              ✖
            </button>
          </>
        ) : (
          <label htmlFor="cover" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
            <Upload className="text-gray-500 mb-2" size={24} />
            <span className="text-gray-500 text-sm sm:text-base">Upload Cover</span>

            {/* Background decoration elements */}
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-blue-100 rounded-full absolute top-5 right-10 opacity-30"></div>
            <div className="w-24 sm:w-32 h-24 sm:h-32 bg-blue-200 rounded-t-full absolute bottom-0 left-20 opacity-30"></div>
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
            <label className="block text-left text-sm font-medium uppercase mb-2">NAME</label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter team name"
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-left text-sm font-medium uppercase mb-2">LOCATION</label>
            <div className="relative">
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={selectedCenter?.address || "Enter address"}
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Description and Sport */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-left text-sm font-medium uppercase mb-2">DESCRIPTION</label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
                className="w-full border h-24 border-gray-300 p-2 text-md pr-10 rounded-lg resize-none"
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-left text-sm font-medium uppercase mb-2">SPORT</label>
            <div className="relative">
              <select
                name="type"
                value={formData.type || ""}
                onChange={handleChange}
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg appearance-none"
              >
                <option value="" disabled>
                  Select a sport
                </option>
                <option value="FOOTBALL">FOOTBALL</option>
                <option value="BADMINTON">BADMINTON</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Date input */}
        <div>
          <label className="block text-left text-sm font-medium uppercase mb-2">DATE</label>
          <div className="relative">
            <input
              type="date"
              name="matchDate"
              value={selectedDate}
              onChange={handleDateChange}
              className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
              required
              min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
            />
          </div>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-left text-sm font-medium uppercase mb-2">FROM TIME</label>
            <div className="relative">
              <input
                type="time"
                name="fromTime"
                onChange={handleTimeChange}
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-left text-sm font-medium uppercase mb-2">TO TIME</label>
            <div className="relative">
              <input
                type="time"
                name="toTime"
                onChange={handleTimeChange}
                className="w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Playing center - now a dropdown */}
        <div>
          <label className="block text-left text-sm font-medium uppercase mb-2">PLAYING CENTER</label>
          <div className="relative">
            <select
              value={selectedCenter?.id || ""}
              onChange={handleCenterSelect}
              className="w-full h-12 border border-gray-300 p-2 text-md rounded-lg appearance-none"
              disabled={!formData.type || playingCenters.length === 0}
            >
              <option value="" disabled>
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
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Playing slot - now a dropdown */}
        <div>
          <label className="block text-left text-sm font-medium uppercase mb-2">PLAYING SLOT</label>
          <div className="relative">
            <select
              name="slotId"
              value={formData.slotId || ""}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, slotId: Number(e.target.value) }))
                setSlotAvailable(null) // Reset availability when slot changes
              }}
              className="w-full h-12 border border-gray-300 p-2 text-md rounded-lg appearance-none"
              disabled={!selectedCenter || playingSlots.length === 0}
            >
              <option value="" disabled>
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
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Add your team - Updated UI with Internal Back Button */}
        <div>
          <label className="block text-left text-sm font-medium uppercase mb-2">ADD YOUR TEAM</label>
          <div className="border border-gray-300 p-4 sm:p-6 rounded-lg">
            {/* Show button if team overview is not loaded yet */}
            {showTeamButton ? (
              <div className="flex justify-center">
                <button
                  type="button"
                  className="bg-black text-white px-6 py-3 text-sm font-medium rounded-md flex items-center"
                  onClick={fetchAllUserIds}
                  disabled={!formData.type || loading}
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
                    type="button"
                    className="flex items-center text-sm font-medium px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-500"
                    onClick={() => setShowTeamButton(true)} // Reset to show just the ADD YOUR TEAM button
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
                          src={getImageUrl(teamOverview.cover)}
                          alt="Team Cover"
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Team Logo */}
                      <div className="absolute bottom-0 left-4 transform translate-y-1/2">
                        <div className="w-36 h-36 bg-white rounded-full border-2 border-white overflow-hidden shadow-md">
                          {teamOverview.logo ? (
                            <img
                              src={getImageUrl(teamOverview.logo)}
                              alt="Team Logo"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <Users size={24} className="text-gray-500" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Team Info */}
                    <div className="pl-4 pt-8">
                      <h3 className="font-bold text-lg">{teamOverview.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <span className="mr-4">Sport: {teamOverview.sport}</span>
                        <span>{teamOverview.totalMembers} Members</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="border-b border-gray-200 my-4"></div>
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
          >
            {slotAvailable
              ? "✓ This time slot is available!"
              : "✗ This time slot is not available. Please select another time."}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4 pb-8">
          <button
            type="button"
            className="border border-gray-300 px-4 py-2 h-12 text-sm font-medium rounded-md w-full sm:w-auto"
            onClick={() => {
              window.history.back()
            }}
          >
            DISCARD
          </button>
          <button
            type="button"
            className="bg-gray-800 text-white px-4 py-2 h-12 text-sm font-medium rounded-md w-full sm:w-auto"
            onClick={checkSlotAvailability}
            disabled={
              isChecking || !formData.slotId || formData.fromTime === 0 || formData.toTime === 0 || !selectedDate
            }
          >
            {isChecking ? "CHECKING..." : "CHECK AVAILABILITY"}
          </button>
          <button
            type="submit"
            className={`${slotAvailable ? "bg-black" : "bg-gray-400"} text-white px-4 py-2 h-12 text-sm font-medium rounded-md w-full sm:w-auto`}
            disabled={loading || !slotAvailable}
          >
            {loading ? "CREATING..." : "CREATE"}
          </button>
        </div>
      </form>
    </div>
  )
}