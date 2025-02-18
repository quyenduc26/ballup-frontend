"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@heroui/react";

const FormCreateField = () => {
  const [formData, setFormData] = useState({
    name: "",
    images: ["", "", "", ""], // Chứa 4 trường cho ảnh
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("image")) {
      const index = parseInt(name.split("-")[1], 10);
      const newImages = [...formData.images];
      newImages[index] = value;
      setFormData({ ...formData, images: newImages });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const filename = URL.createObjectURL(file); // Tạo URL tạm thời cho ảnh
      const newImages = [...formData.images];
      newImages[index] = filename;
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // Xử lý dữ liệu form
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4">
        <Input
          isRequired
          errorMessage="Please enter a valid name"
          label="NAME"
          labelPlacement="outside"
          placeholder="Enter your name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="p-2 w-full"
        />

        {/* Image Upload Section */}
        <div className="border p-4 rounded-lg grid grid-cols-2 gap-4">
          {/* Loop through the images array */}
          {formData.images.map((image, index) => (
            <div key={index} className="relative">
              <label className="cursor-pointer block h-32 w-full bg-gray-100 border rounded-lg overflow-hidden">
                {image ? (
                  <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    📷
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  name={`image-${index}`}
                  onChange={(e) => handleImageUpload(e, index)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>
            </div>
          ))}
        </div>

        <button type="submit" className="bg-black h-12 text-white px-4 py-2 rounded mt-4">
          CREATE
        </button>
      </form>
    </div>
  );
};

export default FormCreateField;
