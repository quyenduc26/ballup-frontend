"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

import { CreateTeamData } from "@/types/form";
import createTeamApi from "@/service/createTeamApi";
import { uploadImage } from "@/utils/uploadImage";
import { getImageUrl } from "@/utils/getImage";

const CreateTeam = () => {
  const [formData, setFormData] = useState<CreateTeamData>({
    cover: "",
    logo: "",
    name: "",
    address: "",
    intro: "",
    sport: "",
    userId: 1, // ID user lấy từ context hoặc state
  });
  const [coverPreview, setCoverPreview] = useState<string | undefined>(
    undefined,
  );
  const [logoPreview, setLogoPreview] = useState<string | undefined>(undefined);
  const router = useRouter();

  // Xử lý thay đổi input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeSport = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      sport: event.target.value as "FOOTBALL" | "BADMINTON",
    });
  };

  // Xử lý upload ảnh
  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "cover" | "logo",
  ) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (type === "cover") {
        let coverImg = await uploadImage(file);

        if (coverImg != null) {
          setFormData({ ...formData, cover: coverImg });
          setCoverPreview(getImageUrl(coverImg));
        }
      } else {
        let logoImg = await uploadImage(file);

        if (logoImg != null) {
          setFormData({ ...formData, logo: logoImg });
          setLogoPreview(getImageUrl(logoImg));
        }
      }
    }
  };

  // Xóa ảnh đã upload
  const handleRemoveImage = (type: "cover" | "logo") => {
    if (type === "cover") {
      setFormData({ ...formData, cover: "" });
      setCoverPreview(undefined);
    } else {
      setFormData({ ...formData, logo: "" });
      setLogoPreview(undefined);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload

    // Validate form data before submission
    if (
      !formData.name ||
      !formData.address ||
      !formData.intro ||
      !formData.sport
    ) {
      alert("Please fill in all required fields!");

      return;
    }

    try {
      // Send data to API
      const response = await createTeamApi.createTeam(formData);

      if (response) {
        alert("Team created successfully!");
        router.push("/team"); // Redirect to the team list page
      }
    } catch (error) {
      console.error("Error creating team:", error);
      alert("An error occurred, please try again!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5 border border-gray-300">
      <button
        className="flex items-center px-4 py-2 mb-4 bg-black text-white rounded"
        onClick={() => router.back()}
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-center mb-4">CREATE TEAM</h2>

      {/* Upload Cover */}
      <div className="relative w-full h-60 bg-gray-300 flex justify-center items-center rounded-md overflow-hidden mb-6">
        {coverPreview ? (
          <>
            <img
              alt="Cover Preview"
              className="object-contain"
              src={coverPreview}
            />
            <button
              className="absolute top-2 right-2 text-white w-6 h-6 rounded-full flex items-center justify-center"
              onClick={() => handleRemoveImage("cover")}
            >
              ❌
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center text-gray-400 text-xl">
              <Upload className="text-gray-500 mr-2" size={24} />
              <span>Upload Cover</span>
            </div>
            <input
              accept="image/*"
              className="absolute border inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={(e) => handleImageUpload(e, "cover")}
            />
          </>
        )}
      </div>

      {/* Upload Logo */}
      <div className="absolute top-80 ml-10 w-52 h-52 bg-gray-200 flex items-center justify-center rounded-md mx-auto mb-4  overflow-hidden">
        {logoPreview ? (
          <>
            <img
              alt="Logo Preview"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-md"
              src={logoPreview}
            />
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
              <Upload className="text-gray-500 mr-2" size={24} />
              <span>Logo</span>
            </div>
            <input
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer"
              type="file"
              onChange={(e) => handleImageUpload(e, "logo")}
            />
          </>
        )}
      </div>

      {/* Form nhập thông tin */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4 mt-20">
          <div>
            <label className="text-sm font-semibold" htmlFor="anme">
              TEAM NAME
            </label>
            <input
              required
              className="w-full p-2 border rounded"
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="text-sm font-semibold" htmlFor="address">
              ADDRESS
            </label>
            <input
              required
              className="w-full p-2 border rounded"
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold" htmlFor="overview">
            TEAM OVERVIEW
          </label>
          <textarea
            required
            className="w-full p-2 border rounded"
            id="overview"
            name="intro"
            value={formData.intro}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="text-sm font-semibold" htmlFor="sport">
            {" "}
            SPORT
          </label>
          <select
            className="w-full p-2 border rounded h-10"
            id="sport"
            value={formData.sport || ""}
            onChange={handleChangeSport}
          >
            <option value="">Type Of Sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BADMINTON">Badminton</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button className="px-4 py-2 border rounded" type="button">
            DISCARD
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded"
            type="submit"
          >
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;
