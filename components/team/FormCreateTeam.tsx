"use client";
import { useState } from "react";
import { CreateTeamData } from "@/types/form";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const router = useRouter();

  // Xử lý thay đổi input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeSport = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, sport: event.target.value as "FOOTBALL" | "BADMINTON" });
  };


  // Xử lý upload ảnh
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "cover" | "logo") => {
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
      setCoverPreview(null);
    } else {
      setFormData({ ...formData, logo: "" });
      setLogoPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
  
    // Validate form data before submission
    if (!formData.name || !formData.address || !formData.intro || !formData.sport) {
      alert("Please fill in all required fields!");
      return;
    }
  
    try {
      // Send data to API
      const response = await createTeamApi.createTeam(formData);
  
      if (response) {
        alert("Team created successfully!");
        router.push("/teams"); // Redirect to the team list page
      }
    } catch (error) {
      console.error("Error creating team:", error);
      alert("An error occurred, please try again!");
    }
  };
  




  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-5 border border-gray-300">
      <button className="flex items-center px-4 py-2 mb-4 bg-black text-white rounded" onClick={() => router.back()}>
        ← Back
      </button>

      <h2 className="text-2xl font-bold text-center mb-4">CREATE TEAM</h2>

      {/* Upload Cover */}
      <div className="relative w-full h-60 bg-gray-300 flex justify-center items-center rounded-md overflow-hidden mb-6">
        {coverPreview ? (
          <>
            <img src={coverPreview} className="object-contain" alt="Cover Preview" />
            <button className="absolute top-2 right-2 text-white w-6 h-6 rounded-full flex items-center justify-center"
              onClick={() => handleRemoveImage("cover")}>
              ❌
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center text-gray-400 text-xl">
              <Upload size={24} className="text-gray-500 mr-2" />
              <span>Upload Cover</span>
            </div>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "cover")}
              className="absolute border inset-0 opacity-0 cursor-pointer" />
          </>
        )}
      </div>

      {/* Upload Logo */}
      <div className="absolute top-80 ml-10 w-52 h-52 bg-gray-200 flex items-center justify-center rounded-md mx-auto mb-4  overflow-hidden">
        {logoPreview ? (
          <>
            <img src={logoPreview} alt="Logo Preview"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-md" />
            <button className="absolute top-1 right-1 text-white w-6 h-6 rounded-full flex items-center justify-center"
              onClick={() => handleRemoveImage("logo")}>
              ❌
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center text-gray-400 text-lg">
              <Upload size={24} className="text-gray-500 mr-2" />
              <span>Logo</span>
            </div>
            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, "logo")}
              className="absolute inset-0 opacity-0 cursor-pointer" />
          </>
        )}
      </div>


      {/* Form nhập thông tin */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4 mt-20"> 
          <div>
            <label className="text-sm font-semibold">TEAM NAME</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
          <div>
            <label className="text-sm font-semibold">ADDRESS</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-semibold">TEAM OVERVIEW</label>
          <textarea name="intro" value={formData.intro} onChange={handleChange} className="w-full p-2 border rounded" required />
        </div>

       <div>
       <label className="text-sm font-semibold">  SPORT</label>
       <select
          value={formData.sport || ""}
          onChange={handleChangeSport}
          className="w-full p-2 border rounded h-10"
        >
          <option value="">Type Of Sport</option>
          <option value="FOOTBALL">Football</option>
          <option value="BADMINTON">Badminton</option>
        </select>

       </div>

        <div className="flex justify-end gap-4 mt-4">
          <button type="button" className="px-4 py-2 border rounded">DISCARD</button>
          <button type="submit" className="px-4 py-2 bg-black text-white rounded">CREATE</button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;
