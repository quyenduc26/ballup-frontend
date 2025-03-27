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
    centerType: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    address: false,
    addressLength: false,
    description: false,
    descriptionLength: false,
    centerType: false,
    images: false,
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

    if (name === "type") {
      setFormData((prev) => ({
        ...prev,
        centerType: value,
      }));
      if (value) {
        setErrors((prev) => ({ ...prev, centerType: false }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({
        ...prev,
        [name]: false,
        ...(name === "address" && { addressLength: false }),
        ...(name === "description" && { descriptionLength: false }),
      }));
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
        setErrors((prev) => ({ ...prev, images: false }));
      }
    }
  };

  const handleImageDelete = (index: number) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];

      updatedImages[index] = "";

      return { ...prev, images: updatedImages };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      name: !formData.name.trim(),
      address: !formData.address.trim(),
      addressLength: formData.address.trim()
        ? formData.address.trim().length < 8
        : false,
      description: !formData.description.trim(),
      descriptionLength: formData.description.trim()
        ? formData.description.trim().length < 20
        : false,
      centerType: !formData.centerType,
      images: !formData.images.some((img) => img.trim() !== ""),
    };

    setErrors(newErrors);

    try {
      const payload = {
        name: formData.name.trim(),
        address: formData.address.trim(),
        description: formData.description.trim(),
        ownerId: formData.ownerId,
        centerType: formData.centerType,
        images: formData.images.filter((img) => img !== null && img !== ""),
      };

      const response = await playingApi.createCreatePlayingCenter(payload);

      setToastData({
        type: "success",
        heading: "Success 🎉",
        message: "Stadium created successfully!",
        duration: 3000,
      });

      setTimeout(() => {
        router.push("/owner");
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
      images: Array(MAX_IMAGES).fill(""),
      ownerId: userId,
      centerType: "",
    });
    setErrors({
      name: false,
      address: false,
      addressLength: false,
      description: false,
      descriptionLength: false,
      centerType: false,
      images: false,
    });
  };

  return (
    <div className="mt-10 p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md w-full">
      <SonnerToast toast={toastData} />

      <h2 className="text-center font-bold text-lg">CREATE PLAYING CENTER</h2>
      <button
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded mb-4"
        onClick={() => setActiveTab("Field")}
      >
        <ArrowLeft size={18} />
      </button>

      <div className="relative bg-gray-100 p-4 sm:p-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formData.images.map((image, index) => (
          <div
            key={index}
            className={`relative w-full sm:w-[550px] sm:h-80 flex ml-5 items-center justify-center border rounded-lg ${
              errors.images ? "border-red-500" : "border-gray-400"
            }`}
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
              <label
                className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
                htmlFor={`image-upload-${index}`}
              >
                <Upload className="text-gray-500" size={24} />
                <span className="text-xs text-gray-500">Upload Image</span>
                <input
                  accept="image/*"
                  className="hidden"
                  id={`image-upload-${index}`}
                  type="file"
                  onChange={(e) => handleImageUpload(e, index)}
                />
              </label>
            )}
          </div>
        ))}
        {errors.images && (
          <p className="text-red-500 text-sm mt-1 col-span-2">
            Please upload at least one image
          </p>
        )}
      </div>

      <form
        className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="stadium-name"
          >
            STADIUM NAME <span className="text-red-500">*</span>
          </label>
          <Input
            className={`w-full border rounded-lg ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            id="stadium-name"
            labelPlacement="outside"
            name="name"
            placeholder="Enter your stadium name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a valid stadium name
            </p>
          )}
        </div>

        <div>
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="stadium-address"
          >
            ADDRESS <span className="text-red-500">*</span>
          </label>
          <Input
            className={`w-full border rounded-lg ${
              errors.address || errors.addressLength
                ? "border-red-500"
                : "border-gray-300"
            }`}
            id="stadium-address"
            labelPlacement="outside"
            name="address"
            placeholder="Enter your address"
            type="text"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">Please enter an address</p>
          )}
          {errors.addressLength && !errors.address && (
            <p className="text-red-500 text-sm mt-1">
              Address must be at least 8 characters long
            </p>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="stadium-description"
          >
            DESCRIPTION <span className="text-red-500">*</span>
          </label>
          <textarea
            className={`border p-2 w-full rounded-lg ${
              errors.description || errors.descriptionLength
                ? "border-red-500"
                : "border-gray-300"
            }`}
            id="stadium-description"
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              Please enter a description
            </p>
          )}
          {errors.descriptionLength && !errors.description && (
            <p className="text-red-500 text-sm mt-1">
              Description must be at least 20 characters long
            </p>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2">
          <label
            className="block text-left text-sm font-medium uppercase mb-2"
            htmlFor="stadium-sport"
          >
            SPORT <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className={`w-full border h-12 p-2 text-md pr-10 rounded-lg appearance-none ${
                errors.centerType ? "border-red-500" : "border-gray-300"
              }`}
              id="stadium-sport"
              name="type"
              value={formData.centerType}
              onChange={handleChange}
            >
              <option value="">Select a sport</option>
              <option value="FOOTBALL">FOOTBALL</option>
              <option value="BADMINTON">BADMINTON</option>
            </select>
            {errors.centerType && (
              <p className="text-red-500 text-sm mt-1">Please select a sport</p>
            )}
          </div>
        </div>

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
