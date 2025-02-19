"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft, FileDown, X } from "lucide-react"; // Thêm icon X để xóa
import { uploadImage } from "@/utils/uploadImage";
import { PlayingCenterType } from "@/types";
import { Input } from "@heroui/react";
import { getImageUrl } from "@/utils/getImage";

const PlayingCenter = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PlayingCenterType>({
    name: "",
    address: "",
    description: "",
    images: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length && formData.images.length < 4; i++) {
        const filename = await uploadImage(files[i]);
        if (filename != null) {
          const imageUrl = getImageUrl(filename);
          setFormData((prev) => ({ ...prev, images: [...prev.images, imageUrl] }));
        }
      }
    }
  };

  const handleImageDelete = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/stadiums", formData);
      alert("Stadium created successfully!");
      router.push("/");
    } catch (error) {
      alert("Error creating stadium");
    }
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded mb-4"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Image Upload Section */}
      <div className="relative bg-gray-100 p-6 flex flex-col items-center justify-center rounded-lg">
        <div className="grid grid-cols-2 gap-2">
          {formData.images.map((image, index) => (
            <div key={index} className="relative w-80 h-60">
              {/* Hiển thị ảnh */}
              <img src={image} alt={`Uploaded ${index}`} className="w-72 h-60 object-cover rounded shadow" />
              {/* Nút xóa ảnh */}
              <button
                type="button"
                className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full"
                onClick={() => handleImageDelete(index)}
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>

        {formData.images.length < 4 && (
          <label className="mt-2 flex items-center gap-2 text-gray-400 cursor-pointer">
            <FileDown />
            <span>Upload up to 4 images</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
          </label>
        )}
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
          className="border p-2 w-full col-span-2"
          required
        ></textarea>

        <button type="submit" className="bg-black h-12 text-white px-4 py-2 rounded mt-4 col-span-2">
          CREATE
        </button>
      </form>
    </div>
  );
};

export default PlayingCenter;
