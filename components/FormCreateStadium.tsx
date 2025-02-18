"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { uploadImage } from "@/utils/uploadImage";
import { CreateStadiumFormType } from "@/types";
import { Input } from "@heroui/react";



const CreateStadiumForm = () => {
  const router = useRouter();
    const [formData, setFormData] = useState<CreateStadiumFormType>({
      name: "",
      address: "",
      description: "",
      image: "",
    });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file)
    if(file) {
      const filename = await uploadImage(file);
      setFormData({ ...formData, image: filename })
    }
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData)
    try {
      await axios.post("/api/stadiums", formData);
      alert("Stadium created successfully!");
      router.push("/");
    } catch (error) {
      alert("Error creating stadium");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded mb-4"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Image Upload Section */}
      <div className="relative bg-gray-100 p-6 flex items-center justify-center rounded-lg">
        <label className="cursor-pointer">
          {formData.image ? (
            <img src={formData.image} alt="Uploaded" className="w-auto h-80 object-cover rounded shadow" />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center bg-white border rounded shadow">
              <span className="text-gray-400">📷</span>
            </div>
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
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

export default CreateStadiumForm;
