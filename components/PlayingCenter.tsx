"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, X, Upload } from "lucide-react";
import { uploadImage } from "@/utils/uploadImage";
import { PlayingCenterType } from "@/types";
import { Input } from "@heroui/react";
import { getImageUrl } from "@/utils/getImage";
import playingApi from "@/service/playingApi";

const MAX_IMAGES = 4;

const PlayingCenter = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PlayingCenterType>({
    name: "",
    address: "",
    description: "",
    images: Array(MAX_IMAGES).fill(null), 
    ownerId: 1
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const filename = await uploadImage(file);
      if (filename) {
        const imageUrl = getImageUrl(filename);
        setFormData((prev) => {
          const updatedImages = [...prev.images];
          updatedImages[index] = imageUrl;
          return { ...prev, images: updatedImages };
        });
      }
    }
  };

  const handleImageDelete = (index: number) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index] = ''; 
      return { ...prev, images: updatedImages };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await playingApi.createPlayingCenter({
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
      ownerId:1
    });
  };

  return (
    <div className="mt-10 max-w-2xl mx-auto p-4 sm:p-6 border border-gray-300 rounded-lg shadow-md w-full">
      <h2 className="text-center font-bold text-lg">CREATE PLAYING CENTER</h2>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded mb-4"
      >
        <ArrowLeft size={18} />
      </button>
  
      {/* Image Upload Section */}
      <div className="relative bg-gray-100 p-4 sm:p-6 rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
        {formData.images.map((image, index) => (
          <div key={index} className="relative w-full h-48 sm:w-72 sm:h-72 flex items-center justify-center border border-gray-400 rounded-lg">
            {image ? (
              <>
                <img src={image} alt={`Uploaded ${index}`} className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
                  onClick={() => handleImageDelete(index)}
                >
                  <X size={18} />
                </button>
              </>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                <Upload size={24} className="text-gray-500" />
                <span className="text-xs text-gray-500">Upload Image</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, index)} />
              </label>
            )}
          </div>
        ))}
      </div>
  
      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          isRequired
          errorMessage="Please enter a valid stadium name"
          label="STADIUM NAME"
          labelPlacement="outside"
          placeholder="Enter your stadium name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 w-full"
        />
  
        <Input
          isRequired
          errorMessage="Please enter a valid address"
          label="ADDRESS"
          labelPlacement="outside"
          placeholder="Enter your address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="p-2 w-full"
        />
  
        <div className="text-[14px]">DESCRIPTION</div>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="border p-2 w-full col-span-1 sm:col-span-2"
          required
        ></textarea>
  
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between col-span-1 sm:col-span-2 mt-4 gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 h-12 text-white px-4 py-2 rounded w-full sm:w-1/2"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="bg-orange-400 h-12 text-white px-4 py-2 rounded w-full sm:w-1/2"
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};  

export default PlayingCenter;
