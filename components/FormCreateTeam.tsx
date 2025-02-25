"use client";
import { useState } from "react";
import { CreateTeamData } from "@/types/form";
import Image from "next/image";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation"; 



const CreateTeam = () => {
  const [formData, setFormData] = useState<CreateTeamData>({
    images: null,
    logoImage: null,
    name: "",
    location: "",
    description: "",
  });
  const router = useRouter();

  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Xử lý thay đổi dữ liệu nhập vào
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý upload ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "background" | "logo") => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (type === "background") {
        setFormData({ ...formData, images: file });
        setBackgroundPreview(URL.createObjectURL(file));
      } else {
        setFormData({ ...formData, logoImage: file });
        setLogoPreview(URL.createObjectURL(file));
      }
    }
  };

  // Xóa ảnh đã upload
  const handleRemoveImage = (type: "background" | "logo") => {
    if (type === "background") {
      setFormData({ ...formData, images     : null });
      setBackgroundPreview(null);
    } else {
      setFormData({ ...formData, logoImage: null });
      setLogoPreview(null);
    }
  };

  // Xử lý khi submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data:", formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5 border border-gray-300">
      {/* Nút Back */}
      <button className="flex items-center px-4 py-2 mb-4 bg-black text-white rounded" onClick={() => router.back()}>
        ← Back
      </button>

      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold text-center mb-4">CREATE TEAM</h2>

      {/* Khung Upload Ảnh Bìa */}
      <div className="relative w-full h-60 bg-gray-300 flex justify-center items-center rounded-md overflow-hidden mb-6">
        {backgroundPreview ? (
          <>
            <Image src={backgroundPreview} alt="Background Preview" layout="fill" objectFit="cover" />
            <button
              className="absolute top-2 right-2 text-white w-6 h-6 rounded-full flex items-center justify-center"
              onClick={() => handleRemoveImage("background")}
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center text-gray-400 text-xl">
            <Upload size={24} className="text-gray-500 mr-2" /> 
            <span >Upload Image</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "background")}
              className="absolute border inset-0 opacity-0 cursor-pointer"
            />
            <div className="absolute bottom-2 right-2 w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-lg">
              +
            </div>
          </>
        )}
      </div>

      {/* Khung Upload Logo */}
      <div className=" absolute top-72 w-40 h-40 bg-gray-200 flex items-center justify-center rounded-md mx-auto ml-5 mb-4">
        {logoPreview ? (
          <>
            <Image src={logoPreview} alt="Logo Preview" width={200} height={200} className=" rounded-md" />
            <button
              className="absolute top-1 right-1 text-white w-6 h-6 rounded-full flex items-center justify-center"
              onClick={() => handleRemoveImage("logo")}
            >
              ❌
            </button>
          </>
        ) : (
          <>
             <div className="flex items-center text-gray-400 text-lg">
            <Upload size={24} className="text-gray-500 mr-2" /> 
            <span >Logo</span>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "logo")}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </>
        )}
      </div>

      {/* Form Nhập Thông Tin */}
      <form onSubmit={handleSubmit}>
        {/* TEAM NAME & LOCATION */}
        <div className="grid grid-cols-2 gap-4 mb-4 mt-20">
          <div>
            <label className="text-sm font-semibold">TEAM NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="text-sm font-semibold">LOCATION</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>

        {/* TEAM OVERVIEW */}
        <div className="mb-4">
          <label className="text-sm font-semibold">TEAM OVERVIEW</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Nút Submit */}
        <div className="flex justify-end gap-4 mt-4">
          <button type="button" className="px-4 py-2 border rounded">
            DISCARD
          </button>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;
