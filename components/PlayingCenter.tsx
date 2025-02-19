"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft,FileDown } from "lucide-react";
import { uploadImage } from "@/utils/uploadImage";
import { PlayingCenterType } from "@/types";
import { Input } from "@heroui/react";

const PlayingCenter = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PlayingCenterType>({
    name: "",
    address: "",
    description: "",
    images:[],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const uploadedImages :string[] = [...formData.images];

      for (let i = 0; i < files.length && uploadedImages.length < 4; i++) {
        const filename = await uploadImage(files[i]);
        if(filename != null) {
          uploadedImages.push(filename);
        }
      }

      setFormData({ ...formData, images: uploadedImages });
    }
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
      <div className="relative bg-gray-100 p-6 flex items-center justify-center rounded-lg">
        <label className="cursor-pointer">
          <div className="grid grid-cols-2 gap-2 ">
            {formData.images.map((image, index) => (
              <img key={index} src={image} alt={`Uploaded ${index}`} className="w-80 h-60  object-cover rounded shadow" />
            ))}
          </div>
          {formData.images.length < 4 && (
            <div className="mt-2 flex items-center gap-2 text-gray-400">
            <FileDown />
            <span>Upload up to 4 images</span>
          </div>

          )}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
        </label>
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
          className="p-2 w-fullfull max-w-smsm"
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
