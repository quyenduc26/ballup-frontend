"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Upload } from "lucide-react";
import { Input } from "@heroui/react";

import { SonnerToast } from "@/components/sonnerMesage";
import { uploadImage } from "@/utils/uploadImage";
import { PlayingCenterType } from "@/types";
import { getImageUrl } from "@/utils/getImage";
import playingApi from "@/service/playingApi";

const MAX_IMAGES = 4;

type PlayingCenterProps = {
  setActiveTab: (tab: string) => void;
};

export const PlayingCenter: React.FC<PlayingCenterProps> = ({
  setActiveTab,
}) => {
  const router = useRouter();
  const data = localStorage.getItem("data");
  const parsedData = data ? JSON.parse(data) : null;
  const userId = parseInt(parsedData?.id || "0", 10);

  const [formData, setFormData] = useState<PlayingCenterType>({
    name: "",
    address: "",
    description: "",
    images: Array(MAX_IMAGES).fill(""),
    ownerId: userId,
    centerType: "", // Added to match backend expectation
  });

  const [toastData, setToastData] = useState<
    | {
        heading?: string;
        message?: string;
        type?: "error" | "success" | "info" | "warning";
        duration?: number;
      }
    | undefined
  >(undefined);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    // Special handling for "type" to also set "centerType"
    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        centerType: value, // Set both fields
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];

    if (file) {
      const filename = await uploadImage(file);

      if (filename) {
        const imageUrl = getImageUrl(filename);

        setFormData((prev) => {
          const updatedImages = [...prev.images];

          if (imageUrl) updatedImages[index] = imageUrl;

          return { ...prev, images: updatedImages };
        });
      }
    }
  };

  const handleImageDelete = (index: number) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];

      updatedImages[index] = ""; // Sử dụng chuỗi rỗng thay vì null

      return { ...prev, images: updatedImages };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.description.trim()
    ) {
      setToastData({
        type: "error",
        heading: "Validation Error",
        message: "Vui lòng điền đầy đủ các trường bắt buộc!",
        duration: 3000,
      });

      return;
    }

    // Validate type separately with clear message
    if (!formData.centerType || formData.centerType === "") {
      setToastData({
        type: "error",
        heading: "Error ❗",
        message: "Vui lòng chọn loại sân (Type)!",
        duration: 3000,
      });

      return;
    }

    try {
      // Create payload with the centerType field that matches backend expectation
      const payload = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        description: formData.description.trim(),
        ownerId: formData.ownerId,
        centerType: formData.centerType, // Use the frontend "type" value but with the correct backend field name
        images: formData.images.filter((img) => img !== null && img !== ""),
      };

      console.log("📤 Payload Sent to API:", JSON.stringify(payload, null, 2));

      const response = await playingApi.createCreatePlayingCenter(payload);

      console.log("✅ API Response:", response);

      setToastData({
        type: "success",
        heading: "Success 🎉",
        message: "Stadium created successfully!",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.error("API Error:", error);

      setToastData({
        type: "error",
        heading: "Error ❗",
        message:
          "Error creating stadium. Please check all fields and try again!",
        duration: 3000,
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      address: "",
      description: "",
      images: Array(MAX_IMAGES).fill(null),
      ownerId: userId,
      // type: "",
      centerType: "", // Reset both fields
    });
  };

  return (
    <div className="mt-10 p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md w-full">
      {/* Display toast notification if available */}
      <SonnerToast toast={toastData} />

      <h2 className="text-center font-bold text-lg">CREATE PLAYING CENTER</h2>
      <button
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded mb-4"
        onClick={() => setActiveTab("Field")}
      >
        <ArrowLeft size={18} />
      </button>

      {/* Image Upload Section */}
      <div className="relative bg-gray-100 p-4 sm:p-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formData.images.map((image, index) => (
          <div
            key={index}
            className="relative w-full sm:w-[550px] sm:h-80 flex ml-5 items-center justify-center border border-gray-400 rounded-lg"
          >
            {image ? (
              <>
                <img
                  alt={`Uploaded ${index}`}
                  className="w-full h-full object-cover rounded-lg"
                  src={image}
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  type="button"
                  onClick={() => handleImageDelete(index)}
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                <Upload className="text-gray-500" size={24} />
                <span className="text-xs text-gray-500">Upload Image</span>
                <input
                  accept="image/*"
                  className="hidden"
                  type="file"
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {/* Form Fields */}
      <form
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          isRequired
          className="p-2 w-full"
          errorMessage="Please enter a valid stadium name"
          label="STADIUM NAME"
          labelPlacement="outside"
          name="name"
          placeholder="Enter your stadium name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <Input
          isRequired
          className="p-2 w-full"
          errorMessage="Please enter a valid address"
          label="ADDRESS"
          labelPlacement="outside"
          name="address"
          placeholder="Enter your address"
          type="text"
          value={formData.address}
          onChange={handleChange}
        />

        <div className="text-[14px]">DESCRIPTION</div>
        <textarea
          required
          className="border p-2 w-full col-span-1 sm:col-span-2"
          name="description"
          placeholder="Enter description"
          value={formData.description}
          onChange={handleChange}
        />

        {/* Select Sport - Keep the UI name as "type" but ensure we're setting centerType behind the scenes */}
        <div className="col-span-1 sm:col-span-2">
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="type"
          >
            SPORT <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              required
              className={`w-full border h-12 border-gray-300 p-2 text-md pr-10 rounded-lg appearance-none ${
                !formData.centerType ? "border-red-500" : ""
              }`}
              id="type"
              name="type" // Keep name as "type" for UI consistency
              value={formData.centerType}
              onChange={handleChange}
            >
              <option value="">Select a sport</option>
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
          {!formData.centerType && (
            <p className="text-xs text-red-500 mt-1">
              Sport selection is required
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between col-span-1 sm:col-span-2 mt-4 gap-2">
          <button
            className="bg-gray-400 h-12 text-white px-4 py-2 rounded w-full sm:w-1/2"
            type="button"
            onClick={handleCancel}
          >
            CANCEL
          </button>
          <button
            className="bg-orange-400 h-12 text-white px-4 py-2 rounded w-full sm:w-1/2"
            type="submit"
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlayingCenter;
