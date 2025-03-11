"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Upload } from "lucide-react";
import { Input } from "@heroui/react";

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
  const userId = parseInt(parsedData.id);

  const [formData, setFormData] = useState<PlayingCenterType>({
    name: "",
    address: "",
    description: "",
    images: Array(MAX_IMAGES).fill(null),
    ownerId: userId,
    type: ""
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

      updatedImages[index] = "";

      return { ...prev, images: updatedImages };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await playingApi.createCreatePlayingCenter({
        ...formData,
        images: formData.images.filter((img) => img !== null),
      });
      alert("Stadium created successfully!");
      router.push("/");
    } catch (error) {
      alert("Error creating stadium");
      console.error("API Error:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      address: "",
      description: "",
      images: Array(MAX_IMAGES).fill(null),
      ownerId: userId,
      type: ""
    });
  };

  return (
    <div className="mt-10  p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md w-full">
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
            className="relative w-fullsm:w-72 sm:h-72 flex items-center justify-center border border-gray-400 rounded-lg"
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
